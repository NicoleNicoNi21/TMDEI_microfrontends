import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BUTTONS_ROUTES } from '../invoice-form/invoice.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(BUTTONS_ROUTES),
  ],
  declarations: [],
  providers: [],
})
export class ButtonsModule {}
