import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/previewer/src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable()
export class InvoiceFormService {
  constructor(
    private http: HttpClient /* , httpErrorHandler: HttpErrorHandler */
  ) {}

  getDocuments(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Invoice`);
  }

  listDocuments(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Invoice/List`);
  }

  getDocument(id: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/Invoice/${id}`);
  }
}
