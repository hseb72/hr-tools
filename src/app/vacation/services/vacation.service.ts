import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const VacApiUrl = `${environment.apiUrl}/vacation` ;

@Injectable({ providedIn: 'root' })

export class VacationService {

  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(VacApiUrl);
  }

  getVacation(id: string) {
    return this.http.get(`${VacApiUrl}/${id}`);
  }

  putVacation(content: string) {
    return this.http.put(`${VacApiUrl}`, `${content}`, httpOptions) ;
  }

  postVacation(content: string) {
    return this.http.post(`${VacApiUrl}`, `${content}`, httpOptions) ;
  }

  patchVacation(id: string, content: string) {
    return this.http.patch(`${VacApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteVacation(id: string) {
    return this.http.delete(`${VacApiUrl}/${id}`) ;
  }

  submitVacation(id: string, status: string) {
    const content = '{ "status": "' + status + '" }' ;
    return this.http.patch(`${VacApiUrl}/${id}`, `${content}`, httpOptions) ;
  }
}
