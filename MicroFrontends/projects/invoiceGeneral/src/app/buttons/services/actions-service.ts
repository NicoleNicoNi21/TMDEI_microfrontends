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
export class ActionsService {
  constructor(
    private http: HttpClient /* , httpErrorHandler: HttpErrorHandler */
  ) {}

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
