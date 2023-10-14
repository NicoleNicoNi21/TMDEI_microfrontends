import { Routes } from '@angular/router';
import { InvoiceLinesTokyoComponent } from './invoice-lines-tokyo.component';

export const TOKYO_ROUTES: Routes = [
    {
      path: '',
      component: InvoiceLinesTokyoComponent,
      //redirectTo: 'flights-search',
      pathMatch: 'full'
    },
    // {
    //   path: 'flights-search',
    //   component: BookingsSearchComponent
    // }
];
