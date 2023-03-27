import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ActivityService {
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.ActApiUrl}`);
  }

  getActivity(id: string) {
    return this.http.get(`${environment.ActApiUrl}/${id}`);
  }

  getEmployeeMonthActivity(employee: number, year: number, month: number) {
    return this.http.get(`${environment.ActApiUrl}/employeemonth/${employee}/${year}/${month}`);
  }

  putActivity(content: string) {
    return this.http.put(`${environment.ActApiUrl}`, `${content}`, httpOptions) ;
  }

  postActivity(content: string) {
    return this.http.post(`${environment.ActApiUrl}`, `${content}`, httpOptions) ;
  }

  uploadActivity(content: string) {
    return this.http.post(`${environment.ActApiUrl}/upload`, `${content}`, httpOptions) ;
  }

  patchActivity(id: string, content: string) {
    return this.http.patch(`${environment.ActApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteActivity(id: string) {
    return this.http.delete(`${environment.ActApiUrl}/${id}`) ;
  }
}