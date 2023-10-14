import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerStructure, DocData } from "projects/invoiceGeneral/src/app/invoice-form/invoice-form.model";
import { environment } from "projects/invoiceGeneral/src/environments/environment";

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

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Customer`);
  }

  getCustomer(id:string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Customer/${id}`);
  }

  /** POST: add a new hero to the database */
  addCustomer(customer: CustomerStructure): Observable<CustomerStructure> {
    return this.http.post<CustomerStructure>(
      `${environment.backendUrl}/Customer`,
      customer/* ,
      httpOptions */
    );
    /* .pipe(catchError(this.handleError('addHero', hero))) */
  }

  postDocument(id: string): Observable<string> {
    return this.http.post<string>(
      `${environment.backendUrl}/Invoice/Post/${id}`, id/* ,
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
}
