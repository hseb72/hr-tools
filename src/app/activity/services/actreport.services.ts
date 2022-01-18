import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ActreportService {
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.AcrApiUrl}`);
  }

  getUserMonth(user: any, year: any, month: any) {
    return this.http.get(`${environment.AcrApiUrl}/user-month/${user}/${year}/${month}`) ;
  }

  getUserYear(user: any, year: any) {
    return this.http.get(`${environment.AcrApiUrl}/user-year/${user}/${year}`);
  }

  getRequired(user: any) {
    return this.http.get(`${environment.AcrApiUrl}/user-required/${user}`);
  }

  getActreport(id: string) {
    return this.http.get(`${environment.AcrApiUrl}/${id}`);
  }

  putActreport(content: string) {
    return this.http.put(`${environment.AcrApiUrl}`, `${content}`, httpOptions) ;
  }

  postActreport(content: string) {
    return this.http.post(`${environment.AcrApiUrl}`, `${content}`, httpOptions) ;
  }

  patchActreport(id: string, content: string) {
    return this.http.patch(`${environment.AcrApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteActreport(id: string) {
    return this.http.delete(`${environment.AcrApiUrl}/${id}`) ;
  }
}