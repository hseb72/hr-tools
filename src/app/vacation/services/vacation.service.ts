import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class VacationService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.VacApiUrl}`);
  }

  getVacation(id: string) {
    return this.http.get(`${environment.VacApiUrl}/${id}`);
  }

  putVacation(content: string) {
    return this.http.put(`${environment.VacApiUrl}`, `${content}`, httpOptions) ;
  }

  postVacation(content: string) {
    return this.http.post(`${environment.VacApiUrl}`, `${content}`, httpOptions) ;
  }

  patchVacation(id: string, content: string) {
    return this.http.patch(`${environment.VacApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteVacation(id: string) {
    return this.http.delete(`${environment.VacApiUrl}/${id}`) ;
  }

  submitVacation(id: string, status: string) {
    const content = '{ "status": "' + status + '" }' ;
    return this.http.patch(`${environment.VacApiUrl}/${id}`, `${content}`, httpOptions) ;
  }
}
