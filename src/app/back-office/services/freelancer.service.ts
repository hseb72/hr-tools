import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class FreelancerService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.FrlApiUrl}`);
  }

  getFreelance(id: string) {
    return this.http.get(`${environment.FrlApiUrl}/${id}`);
  }

  putFreelance(content: string) {
    return this.http.put(`${environment.FrlApiUrl}`, `${content}`, httpOptions) ;
  }

  postFreelance(content: string) {
    return this.http.post(`${environment.FrlApiUrl}`, `${content}`, httpOptions) ;
  }

  patchFreelance(id: string, content: string) {
    return this.http.patch(`${environment.FrlApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteFreelance(id: string) {
    return this.http.delete(`${environment.FrlApiUrl}/${id}`) ;
  }

  submitFreelance(id: string, status: string) {
    const content = '{ "status": "' + status + '" }' ;
    return this.http.patch(`${environment.FrlApiUrl}/${id}`, `${content}`, httpOptions) ;
  }
}