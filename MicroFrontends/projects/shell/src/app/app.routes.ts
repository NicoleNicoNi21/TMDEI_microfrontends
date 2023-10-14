import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'posting',
    children: [
      {
        path: '',
        outlet: 'previewer',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'previewer',
            exposedModule: './Module',
          }).then((m) => m.PreviewerModule),
      },
      {
        path: '',
        outlet: 'invoiceGeneral',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'invoiceGeneral',
            exposedModule: './Module',
          }).then((m) => m.InvoiceFormModule),
      },
      {
        path: '',
        outlet: 'seoul',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'seoul',
            exposedModule: './Module',
          }).then((m) => m.InvoiceLinesSeoulModule),
      },
      {
        path: '',
        outlet: 'tokyo',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'tokyo',
            exposedModule: './Module',
          }).then((m) => m.InvoiceLinesTokyoModule),
      },
      {
        path: '',
        outlet: 'buttons',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'buttons',
            exposedModule: './ModuleA',
          }).then((m) => m.ButtonsModule),
      },
    ],
  },
];
