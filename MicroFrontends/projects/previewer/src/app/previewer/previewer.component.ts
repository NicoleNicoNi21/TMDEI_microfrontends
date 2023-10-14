import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureStorageAccount } from '../storage/file/azure-storage-account';
import { InvoiceFormService } from './services/invoice-form-service';
import { DocData, DocItem } from './previewer.model';

@Component({
  selector: 'app-previewer',
  templateUrl: './previewer.component.html',
  providers: [InvoiceFormService],
  styleUrls: ['./previewer.component.scss'],
})
export class PreviewerComponent {
  systemForm: FormGroup = new FormGroup({
    accountingSystem: new FormControl(''),
  });
  documentsIdList: Array<DocItem>;
  filteredDocumentsIdList: Array<DocItem>;
  documentSrc: SafeResourceUrl;
  currentDocument: DocData;

  constructor(
    private invoiceFormService: InvoiceFormService,
    private fileStorage: AzureStorageAccount,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.invoiceFormService
      .listDocuments()
      .pipe(
        switchMap((data) => {
          this.documentsIdList = data;
          this.filteredDocumentsIdList = data.filter(
            (doc: DocItem) => doc.accountingSystem === data[0].accountingSystem
          );

          //set radio button to correct AS
          this.systemForm.controls['accountingSystem'].setValue(
            data[0].accountingSystem
          );
          this.sendAccountingSystemName();
          localStorage.setItem(
            'AccountingSystem',
            JSON.stringify(this.systemForm.controls['accountingSystem'].value)
          );

          return this.invoiceFormService.getDocument(data[0].id);
        })
      )
      .subscribe(async (data) => {
        this.currentDocument = data;
        this.sendFormValues();

        const documentContent = await this.fileStorage.getFile(
          'docs',
          data.fileRelativePath
        );

        this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(documentContent)
        );
      });
  }

  onChange(e) {
    const newDocIdList: Array<DocItem> = this.documentsIdList.filter(
      (doc: DocItem) => doc.accountingSystem === e.target.value
    );
    this.filteredDocumentsIdList = newDocIdList;

    this.systemForm.controls['accountingSystem'].setValue(e.target.value);
    localStorage.setItem('AccountingSystem', JSON.stringify(e.target.value));
    this.sendAccountingSystemName();

    this.invoiceFormService
      .getDocument(newDocIdList[0].id)
      .subscribe(async (data) => {
        this.currentDocument = data;
        this.sendFormValues();

        const documentContent = await this.fileStorage.getFile(
          'docs',
          data.fileRelativePath
        );
        this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(documentContent)
        );
      });
  }

  getNextDocument(currentId) {
    const currentIdx = this.filteredDocumentsIdList.findIndex(
      (doc: DocItem) => doc.id === currentId
    );
    const nextIdx = currentIdx + 1;
    if (nextIdx < this.filteredDocumentsIdList.length) {
      this.invoiceFormService
        .getDocument(this.filteredDocumentsIdList[nextIdx].id)
        .subscribe(async (data) => {
          this.currentDocument = data;
          this.sendFormValues();
          const documentContent = await this.fileStorage.getFile(
            'docs',
            data.fileRelativePath
          );

          this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(documentContent)
          );

        });
    }
  }

  getPreviousDocument(currentId) {

    const currentIdx = this.filteredDocumentsIdList.findIndex(
      (doc: DocItem) => doc.id === currentId
    );
    const previousIdx = currentIdx - 1;
    if (previousIdx >= 0) {
      this.invoiceFormService
        .getDocument(this.filteredDocumentsIdList[previousIdx].id)
        .subscribe(async (data) => {
          this.currentDocument = data;
          this.sendFormValues();
          const documentContent = await this.fileStorage.getFile(
            'docs',
            data.fileRelativePath
          );

          this.documentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(documentContent)
          );
        });
    }
  }

  setAndDispatchEvent(name, detailValue) {
    const event = new CustomEvent(name, {
      detail: detailValue,
    });
    dispatchEvent(event);
  }

  sendAccountingSystemName() {
    this.setAndDispatchEvent(
      'aSysName',
      this.systemForm.controls['accountingSystem'].value
    );
  }

  sendFormValues() {
    this.setAndDispatchEvent('formValues', this.currentDocument);
  }
}
