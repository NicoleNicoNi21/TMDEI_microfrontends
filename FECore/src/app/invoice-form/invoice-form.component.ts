import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { FormGroup, FormArray, Validators, FormControl } from "@angular/forms";
//import { NanonetsService } from "../nanonets/nanonets.service";
import {
  CustomerStructure,
  DocData,
  DocItem,
  SeoulFormLine,
  TokyoFormLine,
} from "./invoice-form.model";
import { InvoiceFormService } from "./services/invoice-form-service";
import { AzureStorageAccount } from "../storage/file/azure-storage-account";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { switchMap } from "rxjs";

@Component({
  selector: "app-invoice-form",
  templateUrl: "./invoice-form.component.html",
  providers: [InvoiceFormService],
  styleUrls: ["./invoice-form.component.scss"],
})
export class InvoiceFormComponent implements OnInit {
  documentsIdList: Array<DocItem>;
  filteredDocumentsIdList: Array<DocItem>;

  currentDocument: DocData;

  invoiceForm: FormGroup;
  systemForm: FormGroup = new FormGroup({
    accountingSystem: new FormControl(""),
  });
  customer = new FormControl();
  customerForm: FormGroup = new FormGroup({
    iban: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required]),
  });

  accountingSystem: string;
  documentSrc: SafeResourceUrl;

  showAddCustomer: boolean = false;

  tokyoFormLineObj: TokyoFormLine = {
    accountCode: new FormControl(""),
    costCenter: new FormControl(""),
    amount: new FormControl(0),
    vat: new FormControl(""),
    vatAmount: new FormControl(0),
    description: new FormControl(""),
  };

  seoulFormLineObj: SeoulFormLine = {
    accountCode: new FormControl(""),
    item: new FormControl(""),
    location: new FormControl(""),
    department: new FormControl(""),
    unitPrice: new FormControl(0),
    quantity: new FormControl(1),
    vat: new FormControl(""),
    vatAmount: new FormControl(0),
    description: new FormControl(""),
  };

  @Input() fileData: Uint8Array;

  constructor(
    private invoiceFormService: InvoiceFormService,
    private fileStorage: AzureStorageAccount,
    private sanitizer: DomSanitizer
  ) {}

  vat: any = [
    { name: "No VAT", percentage: 0 },
    { name: "AVAT 20%", percentage: 0.2 },
    { name: "LOW 6%", percentage: 0.06 },
  ];

  currency: any = ["", "USD", "EUR", "AUD", "JPY", "KRW"];

  customerList: Array<CustomerStructure>;

  selectedUser;

  ngOnInit(): void {
    this.invoiceFormService
      .listDocuments()
      .pipe(
        switchMap((data) => {
          this.documentsIdList = data;
          this.filteredDocumentsIdList = data.filter(
            (doc: DocItem) => doc.accountingSystem === data[0].accountingSystem
          );

          //set radio button to correct AS
          this.systemForm.controls["accountingSystem"].setValue(
            data[0].accountingSystem
          );

          return this.invoiceFormService.getDocument(data[0].id);
        })
      )
      .subscribe(async (data) => {
        this.currentDocument = data;

        this.selectedCustomer(data.customer);
        this.invoiceForm = this.formStructure(data);

        const documentContent = await this.fileStorage.getFile(
          "docs",
          data.fileRelativePath
        );

        this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(documentContent)
        );
      });

    this.onLoadCustomers();
  }

  onLoadCustomers() {
    this.invoiceFormService.getCustomers().subscribe((customers) => {
      return (this.customerList = customers);
    });
  }

  get invoiceLines(): FormArray {
    return this.invoiceForm.get("invoiceLines") as FormArray;
  }

  formStructure(aSys): FormGroup<any> {
    const localTransactionDate = new Date(aSys.transactionDate);
    const offset = localTransactionDate.getTimezoneOffset();
    localTransactionDate.setMinutes(localTransactionDate.getMinutes() - offset);

    var lines = [];

    if (aSys.invoiceLines.length != 0) {
      if (aSys.accountSystemType === "tokyo") {
        lines = aSys.invoiceLines.map(
          (elem) =>
            new FormGroup({
              accountCode: new FormControl(elem.accountCode),
              costCenter: new FormControl(elem.costCenter),
              amount: new FormControl(elem.amount.finalValue),
              vat: new FormControl(elem.vat),
              vatAmount: new FormControl(elem.vatAmount),
              description: new FormControl(elem.description),
            })
        );
      } else {
        lines = aSys.invoiceLines.map(
          (elem) =>
            new FormGroup({
              accountCode: new FormControl(elem.accountCode),
              item: new FormControl(elem.item),
              location: new FormControl(elem.location),
              department: new FormControl(elem.department),
              unitPrice: new FormControl(elem.amount.unitPrice),
              quantity: new FormControl(elem.amount.quantity),
              vat: new FormControl(elem.vat),
              vatAmount: new FormControl(elem.vatAmount),
              description: new FormControl(elem.description),
            })
        );
      }
    }

    return new FormGroup({
      invoiceNumber: aSys.number
        ? new FormControl(aSys.number)
        : new FormControl("", [Validators.required]),
      amount: aSys.totalAmount
        ? new FormControl(aSys.totalAmount)
        : new FormControl(0, [Validators.required]),
      currency: aSys.currency
        ? new FormControl(aSys.currency)
        : new FormControl(null, [Validators.required]),
      transactionDate: aSys.transactionDate
        ? new FormControl(
            new Date(localTransactionDate).toISOString().split("T")[0]
          )
        : new FormControl(null, [Validators.required]),
      invoiceDescription: aSys.description
        ? new FormControl(aSys.description)
        : new FormControl(null),
      invoiceLines: new FormArray(
        aSys.accountSystemType && aSys.invoiceLines.length != 0
          ? lines
          : [
              new FormGroup(
                aSys.accountSystemType === "tokyo"
                  ? this.tokyoFormLineObj
                  : this.seoulFormLineObj
              ),
            ]
      ),
    });
  }

  getNextDocument(currentId) {
    const currentIdx = this.filteredDocumentsIdList.findIndex(
      (doc: DocItem) => doc.id === currentId
    );
    const nextIdx = currentIdx + 1;
    if (nextIdx < this.filteredDocumentsIdList.length) {
      this.invoiceFormService
        .getDocument(this.filteredDocumentsIdList[nextIdx].id)
        .subscribe(async (data) => {
          this.currentDocument = data;
          const documentContent = await this.fileStorage.getFile(
            "docs",
            data.fileRelativePath
          );

          this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(documentContent)
          );

          this.selectedCustomer(data.customer);
          this.invoiceForm = this.formStructure(data);
        });
    }
  }

  getPreviousDocument(currentId) {
    const currentIdx = this.filteredDocumentsIdList.findIndex(
      (doc: DocItem) => doc.id === currentId
    );
    const previousIdx = currentIdx - 1;
    if (previousIdx >= 0) {
      this.invoiceFormService
        .getDocument(this.filteredDocumentsIdList[previousIdx].id)
        .subscribe(async (data) => {
          this.currentDocument = data;
          const documentContent = await this.fileStorage.getFile(
            "docs",
            data.fileRelativePath
          );

          this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(documentContent)
          );

          this.selectedCustomer(data.customer);
          this.invoiceForm = this.formStructure(data);
        });
    }
  }

  selectedCustomer(cust) {
    if (cust) this.customer.setValue(cust.id);
    else this.customer.setValue("");
  }

  addNewInvoiceLine() {
    if (this.systemForm.controls["accountingSystem"].value === "tokyo") {
      this.invoiceLines.push(
        new FormGroup({
          accountCode: new FormControl(""),
          costCenter: new FormControl(""),
          amount: new FormControl(0),
          vat: new FormControl(""),
          vatAmount: new FormControl(0),
          description: new FormControl(""),
        })
      );
    } else {
      this.invoiceLines.push(
        new FormGroup({
          accountCode: new FormControl(""),
          item: new FormControl(""),
          location: new FormControl(""),
          department: new FormControl(""),
          unitPrice: new FormControl(0),
          quantity: new FormControl(1),
          vat: new FormControl(""),
          vatAmount: new FormControl(0),
          description: new FormControl(""),
        })
      );
    }
  }

  removeCurrentInvoiceLine(id) {
    this.invoiceLines.removeAt(id);
  }

  postForm(): void {
    const doc: DocData = {
      documentId: this.currentDocument.documentId,
      number: this.invoiceForm.get("invoiceNumber").value,
      totalAmount: this.invoiceForm.get("amount").value,
      currency: this.invoiceForm.get("currency").value,
      transactionDate: this.invoiceForm.get("transactionDate").value,
      dueDate: this.currentDocument.dueDate,
      description: this.invoiceForm.get("invoiceDescription").value,
      invoiceLines:
        this.systemForm.controls["accountingSystem"].value === "tokyo"
          ? this.invoiceLines.value.map((element) => ({
              ...element,
              amount: { finalValue: element.amount },
              vat: this.vat.filter(v => v.percentage == element.vat)[0]
            }))
          : this.invoiceLines.value.map((element) => ({
              ...element,
              amount: {
                unitPrice: element.unitPrice,
                quantity: element.quantity,
              },
              vat: this.vat.filter(v => v.percentage == element.vat)[0]
            })),
      bookingStatus: 3,
      accountSystemType: this.currentDocument.accountSystemType,
      customer: {
        id: this.customer.value,
      },
      //fileRelativePath: this.currentDocument.fileRelativePath,
    } as DocData;

    this.invoiceFormService.postDocument(doc).subscribe();
  }

  saveForm(): void {
    const doc: DocData = {
      documentId: this.currentDocument.documentId,
      number: this.invoiceForm.get("invoiceNumber").value,
      totalAmount: this.invoiceForm.get("amount").value,
      currency: this.invoiceForm.get("currency").value,
      transactionDate: this.invoiceForm.get("transactionDate").value,
      dueDate: this.currentDocument.dueDate,
      description: this.invoiceForm.get("invoiceDescription").value,
      invoiceLines:
        this.systemForm.controls["accountingSystem"].value === "tokyo"
          ? this.invoiceLines.value.map((element) => ({
              ...element,
              amount: { finalValue: element.amount },
              vat: this.vat.filter(v => v.percentage == element.vat)[0]
            }))
          : this.invoiceLines.value.map((element) => ({
              ...element,
              amount: {
                unitPrice: element.unitPrice,
                quantity: element.quantity,
              },
              vat: this.vat.filter(v => v.percentage == element.vat)[0]
            })),
      bookingStatus: 3,
      accountSystemType: this.currentDocument.accountSystemType,
      customer: {
        id: this.customer.value,
      },
      //fileRelativePath: this.currentDocument.fileRelativePath,
    } as DocData;

    this.invoiceFormService.saveDocument(doc).subscribe();
  }

  rejectForm(): void {
    const wasRejected = this.invoiceFormService.rejectDocument(this.currentDocument.documentId)
      .subscribe();
    if (wasRejected) { alert('Form was successfully reject'); }
  }

  vatValueCalculation(value: any, id): void {
    let vatValue =
      this.systemForm.controls["accountingSystem"].value === "tokyo"
        ? this.invoiceLines.value[id]["amount"] * value
        : this.invoiceLines.value[id]["quantity"] *
          this.invoiceLines.value[id]["unitPrice"] *
          value;

    this.invoiceLines.at(id).get("vatAmount").setValue(vatValue);
  }

  onChange(e) {
    const newDocIdList: Array<DocItem> = this.documentsIdList.filter(
      (doc: DocItem) => doc.accountingSystem === e.target.value
    );
    this.filteredDocumentsIdList = newDocIdList;

    this.systemForm.controls["accountingSystem"].setValue(e.target.value);

    this.invoiceFormService
      .getDocument(newDocIdList[0].id)
      .subscribe(async (data) => {
        this.currentDocument = data;

        const documentContent = await this.fileStorage.getFile(
          "docs",
          data.fileRelativePath
        );
        this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(documentContent)
        );

        this.invoiceForm = this.formStructure(data);
      });

    //this.invoiceForm.reset();
  }

  changeCurrency(e: any): void {
    this.invoiceForm.controls["currency"].setValue(e.target.value);
  }

  toggleAddCustomer() {
    this.showAddCustomer = !this.showAddCustomer;
  }

  addNewCustomer(newCustomer: CustomerStructure): void {
    // The server will generate the id for this new hero
    this.invoiceFormService
      .addCustomer(newCustomer)
      .subscribe((customer) => this.customerList.push(customer));
    this.toggleAddCustomer();
  }
}
