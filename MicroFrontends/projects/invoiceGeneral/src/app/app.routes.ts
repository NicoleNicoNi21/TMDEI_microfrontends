import { Routes } from '@angular/router';/* 
import { HomeComponent } from './home/home.component'; */

export const APP_ROUTES: Routes = [
/*     { 
        path: '', 
        component: HomeComponent, 
        pathMatch: 'full'
    }, */
    { 
        path: 'posting', 
        loadChildren: () => import('./invoice-form/invoice-form.module')
            .then(m => m.InvoiceFormModule)
    },
    { 
        path: 'buttons', 
        loadChildren: () => import('./buttons/buttons.module')
            .then(m => m.ButtonsModule)
    }

];
