import { Routes } from '@angular/router';
import { InvoiceLinesSeoulComponent } from './invoice-lines-seoul.component';

export const SEOUL_ROUTES: Routes = [
    {
      path: '',
      component: InvoiceLinesSeoulComponent,
      //redirectTo: 'flights-search',
      pathMatch: 'full'
    },
    // {
    //   path: 'flights-search',
    //   component: BookingsSearchComponent
    // }
];
