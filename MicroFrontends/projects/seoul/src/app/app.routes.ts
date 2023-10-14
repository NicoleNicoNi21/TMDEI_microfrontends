import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'seoul',
    loadChildren: () =>
      import('./invoice-lines-seoul/invoice-lines-seoul.module').then(
        (m) => m.InvoiceLinesSeoulModule
      ),
  },
];
