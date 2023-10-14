import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceLinesTokyoComponent } from './invoice-lines-tokyo/invoice-lines-tokyo.component';
import { InvoiceLinesTokyoModule } from './invoice-lines-tokyo/invoice-lines-tokyo.module';

@NgModule({
  imports: [BrowserModule, InvoiceLinesTokyoModule, HttpClientModule,
    ReactiveFormsModule,
    CommonModule, RouterModule.forRoot(APP_ROUTES)],
  declarations: [AppComponent, InvoiceLinesTokyoComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
