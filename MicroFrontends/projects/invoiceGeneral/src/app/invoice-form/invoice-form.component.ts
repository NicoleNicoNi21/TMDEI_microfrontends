import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceFormService } from './services/invoice-form-service';
import { CustomerStructure, DocData, DocItem } from './invoice-form.model';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  providers: [InvoiceFormService],
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent {
  private subscription: Subscription;
  receivedData: any = {};
  documentsIdList: Array<DocItem>;
  filteredDocumentsIdList: Array<DocItem>;

  currentDocument: DocData;

  invoiceForm: FormGroup;

  customer = new FormControl();
  customerForm: FormGroup = new FormGroup({
    iban: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
  });

  accountingSystem: string;

  confirmValue: boolean = true;
  showAddCustomer: boolean = false;

  @Input() fileData: Uint8Array;

  constructor(private invoiceFormService: InvoiceFormService) {}

  vat: any = [
    { name: 'No VAT', percentage: 0 },
    { name: 'AVAT 20%', percentage: 0.2 },
    { name: 'LOW 6%', percentage: 0.06 },
  ];

  currency: any = ['', 'USD', 'EUR', 'AUD', 'JPY', 'KRW'];

  customerList: Array<CustomerStructure>;

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'formValues').subscribe((event) => {
      this.receivedData = event;
      this.selectedCustomer(this.receivedData.detail.customer);
      this.invoiceForm = this.formStructure(this.receivedData.detail);

      this.invoiceForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe((changes) => {
          this.sendInvoiceGeneralValues();
        });

      this.customer.valueChanges
        .pipe(debounceTime(500))
        .subscribe((changes) => {
          this.sendCustomerValues();
        });
    });

    this.onLoadCustomers();
  }

  onLoadCustomers() {
    this.invoiceFormService.getCustomers().subscribe((customers) => {
      return (this.customerList = customers);
    });
  }

  formStructure(aSys): FormGroup<any> {
    const localTransactionDate = new Date(aSys.transactionDate);
    const offset = localTransactionDate.getTimezoneOffset();
    localTransactionDate.setMinutes(localTransactionDate.getMinutes() - offset);

    return new FormGroup({
      invoiceNumber: aSys.number
        ? new FormControl(aSys.number)
        : new FormControl('', [Validators.required]),
      amount: aSys.totalAmount
        ? new FormControl(aSys.totalAmount)
        : new FormControl(0, [Validators.required]),
      currency: aSys.currency
        ? new FormControl(aSys.currency)
        : new FormControl(null, [Validators.required]),
      transactionDate: aSys.transactionDate
        ? new FormControl(
            new Date(localTransactionDate).toISOString().split('T')[0]
          )
        : new FormControl(null, [Validators.required]),
      invoiceDescription: aSys.description
        ? new FormControl(aSys.description)
        : new FormControl(null),
    });
  }

  selectedCustomer(cust) {
    if (cust) this.customer.setValue(cust.id);
    else this.customer.setValue('');
    this.sendCustomerValues();
  }

  changeCurrency(e: any): void {
    this.invoiceForm.controls['currency'].setValue(e.target.value);
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

  setAndDispatchEvent(name, detailValue) {
    const event = new CustomEvent(name, {
      detail: detailValue,
    });
    dispatchEvent(event);
  }

  sendInvoiceGeneralValues() {
    const valuesToSend = {
      ...this.invoiceForm.value,
      documentId: this.receivedData.detail.documentId,
      accountSystemType: this.receivedData.detail.accountSystemType,
    };
    this.setAndDispatchEvent('invoiceGeneral', valuesToSend);
  }

  sendCustomerValues() {
    this.setAndDispatchEvent('customer', this.customer.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
