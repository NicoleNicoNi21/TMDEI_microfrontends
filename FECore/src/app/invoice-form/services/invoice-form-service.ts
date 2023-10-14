import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Injectable } from "@angular/core";

import { Observable, catchError } from "rxjs";
import { CustomerStructure, DocData } from "../invoice-form.model";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
  }),
};

@Injectable()
export class InvoiceFormService {
  constructor(
    private http: HttpClient /* , httpErrorHandler: HttpErrorHandler */
  ) {}

  // getDocumentTest(): Observable<any> {
  //   return this.http.get<any>(this.docsUrl);
  // }

  getDocuments(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Invoice`);
  }

  listDocuments(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Invoice/List`);
  }

  getDocument(id: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Invoice/${id}`);
  }

  // getAccountingSystem(): Observable<any> {
  //   return this.http.get<any>(
  //     "https://run.mocky.io/v3/b7177eda-d1e3-45ce-8eb1-9441cdbed56a"
  //   );
  // }

  // changeAccountingSystem(accountSys: any): Observable<any> {
  //   return this.http
  //     .post<any>(this.postAccountingSystemURL, accountSys, httpOptions)
  //     // .pipe(catchError(this.handleError("changeAccountingSys", accountSys)));
  // }

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Customer`);
  }

  getCustomer(id:string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Customer/${id}`);
  }

  //{{base_url}}/api/Customer/{{customer_id}}

  /** POST: add a new hero to the database */
  addCustomer(customer: CustomerStructure): Observable<CustomerStructure> {
    return this.http.post<CustomerStructure>(
      `${environment.backendUrl}/Customer`,
      customer/* ,
      httpOptions */
    );
    /* .pipe(catchError(this.handleError('addHero', hero))) */
  }

  postDocument(docData: DocData): Observable<string> {
    return this.http.post<string>(
      `${environment.backendUrl}/Invoice/Post/${docData.documentId}`, docData/* ,
      httpOptions */
    );
    /* .pipe(catchError(this.handleError('addHero', hero))) */
  }

  saveDocument(docData: DocData): Observable<DocData> {
    return this.http.post<DocData>(
      `${environment.backendUrl}/Invoice/Save`,
      docData/* ,
      httpOptions */
    );
    /* .pipe(catchError(this.handleError('addHero', hero))) */
  }

  rejectDocument(documentId: string): Observable<boolean> {
    console.log(documentId);
    return this.http.post<boolean>(
      `${environment.backendUrl}/Invoice/Reject/${documentId}`, documentId
    );
  }
}
