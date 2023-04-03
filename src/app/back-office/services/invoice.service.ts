import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.InvApiUrl}`);
  }

  getInvoice(id: string) {
    return this.http.get(`${environment.InvApiUrl}/${id}`);
  }

  putInvoice(content: string) {
    return this.http.put(`${environment.InvApiUrl}`, `${content}`, httpOptions) ;
  }

  postInvoice(content: string) {
    return this.http.post(`${environment.InvApiUrl}`, `${content}`, httpOptions) ;
  }

  patchInvoice(id: string, content: string) {
    return this.http.patch(`${environment.InvApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${environment.InvApiUrl}/${id}`) ;
  }
  getInvoices() {
    return this.http.get(`${environment.InvApiUrl}`);
  }

  preparePayment(id: string) {
    return this.http.post(`${environment.InvApiUrl}/${id}/preparepayment`, ``, httpOptions) ;
  }

  sendreport(content: string) {
    return this.http.post(`${environment.InvApiUrl}/sendreport`, `${content}`, httpOptions) ;
  }
}