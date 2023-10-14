import { Routes } from '@angular/router';
import { InvoiceFormComponent } from './invoice-form.component';
import { ButtonsComponent } from '../buttons/buttons.component';

export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    component: InvoiceFormComponent,
    //redirectTo: 'flights-search',
    pathMatch: 'full',
  },
];

export const BUTTONS_ROUTES: Routes = [
  {
    path: '',
    component: ButtonsComponent,
    pathMatch: 'full',
  },
];
