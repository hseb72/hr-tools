import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class PubholidayService {
  
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.PhoApiUrl}`);
  }

  getRange(year: Number|null, month: Number|null, day: Number|null) {
    if ( day ) return this.http.get(`${environment.PhoApiUrl}/range/${year}/${month}/${day}`);
    if ( month ) return this.http.get(`${environment.PhoApiUrl}/range/${year}/${month}`);
    if ( year ) return this.http.get(`${environment.PhoApiUrl}/range/${year}`);
    return this.getAll();
  }

  getPubholiday(id: string) {
    return this.http.get(`${environment.PhoApiUrl}/${id}`);
  }

  getYear(year: string) {
    return this.http.get(`${environment.PhoApiUrl}?year=${year}`);
  }

  getNames(id: string) {
    return this.http.get(`${environment.PhoApiUrl}?list=name`);
  }

  putPubholiday(content: string) {
    return this.http.put(`${environment.PhoApiUrl}`, `${content}`, httpOptions) ;
  }

  postPubholiday(content: string) {
    return this.http.post(`${environment.PhoApiUrl}`, `${content}`, httpOptions) ;
  }

  patchPubholiday(id: string, content: string) {
    return this.http.patch(`${environment.PhoApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deletePubholiday(id: string) {
    return this.http.delete(`${environment.PhoApiUrl}/${id}`) ;
  }
}