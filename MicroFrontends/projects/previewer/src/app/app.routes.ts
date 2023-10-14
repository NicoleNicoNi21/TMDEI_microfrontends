import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'previewer',
    loadChildren: () =>
      import('./previewer/previewer.module').then(
        (m) => m.PreviewerModule
      ),
  },
];
