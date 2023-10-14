import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

// import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { InvoiceFormComponent } from "./invoice-form/invoice-form.component";
import { WelcomeComponent } from "./home/welcome.component";
import { RouterModule } from "@angular/router";
import { NgxDocViewerModule } from "ngx-doc-viewer";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { AzureStorageAccount } from "./storage/file/azure-storage-account";

export function azureBlobStorageFactory() {
  return window['AzureStorage'].Blob;
}

@NgModule({
  declarations: [AppComponent, InvoiceFormComponent],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDocViewerModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'posting', component: InvoiceFormComponent },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
  ],
  providers: [AzureStorageAccount],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
