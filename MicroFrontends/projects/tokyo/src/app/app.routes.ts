import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'seoul',
    loadChildren: () =>
      import('./invoice-lines-tokyo/invoice-lines-tokyo.module').then(
        (m) => m.InvoiceLinesTokyoModule
      ),
  },
];
