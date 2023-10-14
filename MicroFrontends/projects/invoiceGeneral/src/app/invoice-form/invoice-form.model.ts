import { FormControl } from "@angular/forms";

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
  dueDate?: number;
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
  fileRelativePath?: string;
}

export interface DocItem {
  id: string;
  accountingSystem: string;
}
