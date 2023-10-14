import { Routes } from '@angular/router';
import { PreviewerComponent } from './previewer.component';

export const HOME_ROUTES: Routes = [
    {
      path: '',
      component: PreviewerComponent,
      //redirectTo: 'flights-search',
      pathMatch: 'full'
    },
    // {
    //   path: 'flights-search',
    //   component: BookingsSearchComponent
    // }
];
