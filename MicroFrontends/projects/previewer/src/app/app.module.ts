import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PreviewerModule } from './previewer/previewer.module';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AzureStorageAccount } from 'projects/previewer/src/app/storage/file/azure-storage-account';
import { PreviewerComponent } from './previewer/previewer.component';

@NgModule({
  imports: [
    BrowserModule,
    PreviewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  declarations: [AppComponent, PreviewerComponent],
  providers: [AzureStorageAccount],
  bootstrap: [AppComponent],
})
export class AppModule {}
