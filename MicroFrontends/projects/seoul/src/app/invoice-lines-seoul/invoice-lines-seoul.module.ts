import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceLinesSeoulComponent } from './invoice-lines-seoul.component';
import { RouterModule } from '@angular/router';
import { SEOUL_ROUTES } from './invoice-lines-seoul.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(SEOUL_ROUTES),
  ],
  declarations: []
})
export class InvoiceLinesSeoulModule {}
