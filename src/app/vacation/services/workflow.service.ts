import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class WorkflowService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.WrkApiUrl}`);
  }

  get(id: string) {
    return this.http.get(`${environment.WrkApiUrl}/${id}`);
  }

  getStatus(id: string) {
    return this.http.get(`${environment.WrkApiUrl}/${id}/status`);
  }

  getSteps(id: string) {
    return this.http.get(`${environment.WrkApiUrl}/${id}/steps`);
  }

  put(content: string) {
    let headers = httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.put(`${environment.WrkApiUrl}`, `${content}`, httpOptions) ;
  }

  post(content: string) {
    let headers = httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.WrkApiUrl}`, `${content}`, httpOptions) ;
  }

  patch(id: string, content: string) {
    let headers = httpOptions.headers.append('Content-Type', 'application/json');
    return this.http.patch(`${environment.WrkApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  delete(id: string) {
    return this.http.delete(`${environment.WrkApiUrl}/${id}`) ;
  }
}