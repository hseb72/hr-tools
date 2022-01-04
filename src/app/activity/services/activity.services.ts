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

  getApprover(id: string) {
    return this.http.get(`${environment.ActApiUrl}/${id}`);
  }

  putApprover(content: string) {
    return this.http.put(`${environment.ActApiUrl}`, `${content}`, httpOptions) ;
  }

  postApprover(content: string) {
    return this.http.post(`${environment.ActApiUrl}`, `${content}`, httpOptions) ;
  }

  patchApprover(id: string, content: string) {
    return this.http.patch(`${environment.ActApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteApprover(id: string) {
    return this.http.delete(`${environment.ActApiUrl}/${id}`) ;
  }
}