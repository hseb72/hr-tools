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

  getOne(user: any, year: any, month: any) {
    return this.http.get(`${environment.AcrApiUrl}/fromkey/${user}/${year}/${month}`) ;
  }

  getApprover(id: string) {
    return this.http.get(`${environment.AcrApiUrl}/${id}`);
  }

  putApprover(content: string) {
    return this.http.put(`${environment.AcrApiUrl}`, `${content}`, httpOptions) ;
  }

  postApprover(content: string) {
    return this.http.post(`${environment.AcrApiUrl}`, `${content}`, httpOptions) ;
  }

  patchApprover(id: string, content: string) {
    return this.http.patch(`${environment.AcrApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteApprover(id: string) {
    return this.http.delete(`${environment.AcrApiUrl}/${id}`) ;
  }
}