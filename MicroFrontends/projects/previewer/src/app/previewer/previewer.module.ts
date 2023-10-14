import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './previewer.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AzureStorageAccount } from 'projects/previewer/src/app/storage/file/azure-storage-account';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
  ],
  declarations: [],
  providers: [AzureStorageAccount],
})
export class PreviewerModule {}
