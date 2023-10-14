import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form.component';
import { RouterModule } from '@angular/router';
import { INVOICE_ROUTES } from './invoice.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(INVOICE_ROUTES),
  ],
  declarations: [],
  providers: [],
})
export class InvoiceFormModule {}
