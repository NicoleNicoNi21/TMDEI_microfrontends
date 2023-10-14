import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionsService } from './services/actions-service';
import {
  CustomerStructure,
  DocData,
  DocItem,
} from '../invoice-form/invoice-form.model';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  providers: [ActionsService],
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription;

  private subscription5: Subscription;

  initialData: any = {};
  receivedData: any = {};
  receivedData2: any = {};
  receivedData3: any = {};
  receivedData4: any = {};

  //documentsIdList: Array<DocItem>;
  filteredDocumentsIdList: Array<DocItem>;

  currentDocument: DocData;

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

  constructor(private actionsService: ActionsService) {}

  ngOnInit(): void {
    this.subscription5 = fromEvent(window, 'formValues').subscribe((event) => {
      this.initialData = event;
    });

    this.subscription = fromEvent(window, 'invoiceGeneral').subscribe(
      (event) => {
        this.receivedData = event;
      }
    );
    this.subscription4 = fromEvent(window, 'customer').subscribe((event) => {
      this.receivedData4 = event;
    });

    this.subscription2 = fromEvent(window, 'tokyoLines').subscribe((event) => {
      this.receivedData2 = event;
    });
    this.subscription3 = fromEvent(window, 'seoulLines').subscribe((event) => {
      this.receivedData3 = event;
    });
  }

  postForm(): void {
    const doc: DocData = {
      documentId:
        this.receivedData.detail?.documentId ||
        this.initialData.detail.documentId,
      number:
        this.receivedData.detail?.invoiceNumber ||
        this.initialData.detail.number,
      totalAmount:
        this.receivedData.detail?.amount || this.initialData.detail.totalAmount,
      currency:
        this.receivedData.detail?.currency || this.initialData.detail.currency,
      transactionDate:
        this.receivedData.detail?.transactionDate ||
        this.initialData.detail.transactionDate,
      description:
        this.receivedData.detail?.invoiceDescription ||
        this.initialData.detail.description,
      invoiceLines:
        this.receivedData2.detail ||
        this.receivedData3.detail ||
        this.initialData.detail.invoiceLines,
      bookingStatus: 3, // Validated
      accountSystemType:
        this.receivedData.detail?.accountSystemType ||
        this.initialData.detail.accountSystemType,
      customer: {
        id: this.receivedData4.detail || this.initialData.detail,
      },
      //fileRelativePath: this.receivedData.detail.accountSystemType + "/" + this.receivedData.detail.documentId + ".pdf",
    } as DocData;

    this.actionsService.postDocument(doc).subscribe(postedDoc => console.log(postedDoc));
  }

  saveForm(): void {
    const doc: DocData = {
      documentId:
        this.receivedData.detail?.documentId ||
        this.initialData.detail.documentId,
      number:
        this.receivedData.detail?.invoiceNumber ||
        this.initialData.detail.number,
      totalAmount:
        this.receivedData.detail?.amount || this.initialData.detail.totalAmount,
      currency:
        this.receivedData.detail?.currency || this.initialData.detail.currency,
      transactionDate:
        this.receivedData.detail?.transactionDate ||
        this.initialData.detail.transactionDate,
      description:
        this.receivedData.detail?.invoiceDescription ||
        this.initialData.detail.description,
      invoiceLines:
        this.receivedData2.detail ||
        this.receivedData3.detail ||
        this.initialData.detail.invoiceLines,
      bookingStatus: 3, // Validated
      accountSystemType:
        this.receivedData.detail?.accountSystemType ||
        this.initialData.detail.accountSystemType,
      customer: {
        id: this.receivedData4.detail || this.initialData.detail,
      },
      //fileRelativePath: this.receivedData.detail.accountSystemType + "/" + this.receivedData.detail.documentId + ".pdf",
    } as DocData;

    this.actionsService.saveDocument(doc).subscribe();

    //alert('Form was successfully saved');
  }

  rejectForm(): void {
    const wasRejected = this.actionsService.rejectDocument(this.receivedData.detail?.documentId || this.initialData.detail.documentId)
      .subscribe();
    if (wasRejected) { alert('Form was successfully reject'); }
    //TODO request changing status to REJECTED
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    this.subscription5.unsubscribe();
  }
}
