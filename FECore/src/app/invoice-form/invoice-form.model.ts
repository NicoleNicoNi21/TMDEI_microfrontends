import { FormControl } from "@angular/forms";

export interface TokyoFormLine {
  accountCode: FormControl<string>;
  costCenter: FormControl<string>;
  amount: FormControl<number>;
  vat: FormControl<string>;
  vatAmount: FormControl<number>;
  description: FormControl<string>;
}

export interface SeoulFormLine {
  accountCode: FormControl<string>;
  item: FormControl<string>;
  location: FormControl<string>;
  department: FormControl<string>;
  unitPrice: FormControl<number>;
  quantity: FormControl<number>;
  vat: FormControl<string>;
  vatAmount: FormControl<number>;
  description: FormControl<string>;
}

export interface CustomerStructure {
  iban: FormControl<string>;
  name: FormControl<string>;
  code: FormControl<string>;
}

export interface DocData {
  documentId: string;
  number: number;
  totalAmount: number;
  currency: number;
  transactionDate: number;
  dueDate: number;
  description: number;
  invoiceLines: Array<any>;
  bookingStatus: number;
  accountSystemType: string;
  customer: {
    id: string;
    iban?: string;
    name?: string;
    code?: string;
  };
  fileRelativePath: string;
}

export interface DocItem {
  id: string;
  accountingSystem: string;
}
