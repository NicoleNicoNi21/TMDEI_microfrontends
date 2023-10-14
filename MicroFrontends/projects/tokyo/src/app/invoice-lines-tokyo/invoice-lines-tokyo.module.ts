import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TOKYO_ROUTES } from './invoice-lines-tokyo.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(TOKYO_ROUTES),
  ],
  declarations: [],
  providers: [],
})
export class InvoiceLinesTokyoModule {}
