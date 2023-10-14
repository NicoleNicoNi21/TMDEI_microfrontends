import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SeoulFormLine } from './invoice-lines-seoul.model';
import { debounceTime } from 'rxjs/operators';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-invoice-lines-seoul',
  templateUrl: './invoice-lines-seoul.component.html',
  providers: [],
  styleUrls: ['./invoice-lines-seoul.component.scss'],
})
export class InvoiceLinesSeoulComponent {
  private subscription: Subscription;
  receivedData: any = {};
  invoiceForm: FormGroup;

  seoulFormLineObj: SeoulFormLine = {
    accountCode: new FormControl(''),
    item: new FormControl(''),
    location: new FormControl(''),
    department: new FormControl(''),
    unitPrice: new FormControl(0),
    quantity: new FormControl(1),
    vat: new FormControl(''),
    vatAmount: new FormControl(0),
    description: new FormControl(''),
  };

  constructor() {}

  vat: any = [
    { name: 'No VAT', percentage: 0 },
    { name: 'AVAT 20%', percentage: 0.2 },
    { name: 'LOW 6%', percentage: 0.06 },
  ];

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'formValues').subscribe((event) => {
      this.receivedData = event;
      this.invoiceForm = this.formStructure(
        this.receivedData.detail.invoiceLines
      );

      this.invoiceForm.valueChanges
        .pipe(debounceTime(500))
        .subscribe((changes) => {
          this.sendSeoulValues();
        });
    });
  }

  get invoiceLines(): FormArray {
    return this.invoiceForm.get('invoiceLines') as FormArray;
  }

  formStructure(data): FormGroup<any> {
    if (data.length != 0) {
      var lines = data.map(
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

    return new FormGroup({
      invoiceLines:
        data.length != 0
          ? new FormArray(lines)
          : new FormArray([new FormGroup(this.seoulFormLineObj)]),
    });
  }

  addNewInvoiceLine() {
    this.invoiceLines.push(
      new FormGroup({
        accountCode: new FormControl(''),
        item: new FormControl(''),
        location: new FormControl(''),
        department: new FormControl(''),
        unitPrice: new FormControl(0),
        quantity: new FormControl(1),
        vat: new FormControl(''),
        vatAmount: new FormControl(0),
        description: new FormControl(''),
      })
    );
  }

  removeCurrentInvoiceLine(id) {
    this.invoiceLines.removeAt(id);
  }

  vatValueCalculation(value: any, id): void {
    let vatValue =
      this.invoiceLines.value[id]['quantity'] *
      this.invoiceLines.value[id]['unitPrice'] *
      value;

    this.invoiceLines.at(id).get('vatAmount').setValue(vatValue);
  }
  setAndDispatchEvent(name, detailValue) {
    const event = new CustomEvent(name, {
      detail: detailValue,
    });
    dispatchEvent(event);
  }

  sendSeoulValues() {
    const lines = this.invoiceLines.value.map((element) => ({
      ...element,
      amount: { unitPrice: element.unitPrice, quantity: element.quantity },
      vat: this.vat.filter(v => v.percentage == element.vat)[0]
    }));
    this.setAndDispatchEvent('seoulLines', lines);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
