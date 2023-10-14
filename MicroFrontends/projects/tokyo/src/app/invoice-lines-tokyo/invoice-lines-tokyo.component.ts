import { Component, Input } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokyoFormLine } from './invoice-lines-tokyo.model';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-invoice-lines-tokyo',
  templateUrl: './invoice-lines-tokyo.component.html',
  providers: [],
  styleUrls: ['./invoice-lines-tokyo.component.scss'],
})
export class InvoiceLinesTokyoComponent {
  private subscription: Subscription;
  receivedData: any = {};
  invoiceForm: FormGroup;

  tokyoFormLineObj: TokyoFormLine = {
    accountCode: new FormControl(''),
    costCenter: new FormControl(''),
    amount: new FormControl(0),
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
          this.sendTokyoValues();
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
            costCenter: new FormControl(elem.costCenter),
            amount: new FormControl(elem.amount.finalValue),
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
          : new FormArray([new FormGroup(this.tokyoFormLineObj)]),
    });
  }

  addNewInvoiceLine() {
    this.invoiceLines.push(
      new FormGroup({
        accountCode: new FormControl(''),
        costCenter: new FormControl(''),
        amount: new FormControl(0),
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
    let vatValue = this.invoiceLines.value[id]['amount'] * value;

    this.invoiceLines.at(id).get('vatAmount').setValue(vatValue);
  }
  setAndDispatchEvent(name, detailValue) {
    const event = new CustomEvent(name, {
      detail: detailValue,
    });
    dispatchEvent(event);
  }

  sendTokyoValues() {
    const lines = this.invoiceLines.value.map((element) => ({
      ...element,
      amount: { finalValue: element.amount },
      vat: this.vat.filter(v => v.percentage == element.vat)[0]
    }));
    this.setAndDispatchEvent('tokyoLines', lines);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
