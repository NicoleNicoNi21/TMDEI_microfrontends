import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { AzureStorageAccount } from 'project/seoul/src/app/storage/file/azure-storage-account';
import { InvoiceLinesSeoulComponent } from './invoice-lines-seoul/invoice-lines-seoul.component';
import { InvoiceLinesSeoulModule } from './invoice-lines-seoul/invoice-lines-seoul.module';

@NgModule({
  imports: [BrowserModule, InvoiceLinesSeoulModule, HttpClientModule,
    ReactiveFormsModule,
    CommonModule, RouterModule.forRoot(APP_ROUTES)],
  declarations: [AppComponent, InvoiceLinesSeoulComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
