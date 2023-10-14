import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; /* 
import { HomeComponent } from './home/home.component'; */
import { InvoiceFormModule } from './invoice-form/invoice-form.module';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { ButtonsModule } from './buttons/buttons.module';

@NgModule({
  imports: [
    BrowserModule,
    InvoiceFormModule,
    ButtonsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  declarations: [AppComponent, InvoiceFormComponent, ButtonsComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
