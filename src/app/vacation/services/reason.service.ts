import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ReasonService {
    constructor(private http: HttpClient) { }
	getAll()  {
		return this.http.get(`${environment.ReaApiUrl}`);
	}

	getReason(id: string) {
		return this.http.get(`${environment.ReaApiUrl}/${id}`);
	}

	putReason(content: string) {
		let headers = httpOptions.headers.append('Content-Type', 'application/json');
		return this.http.put(`${environment.ReaApiUrl}`, `${content}`, httpOptions) ;
	}

	postReason(content: string) {
		let headers = httpOptions.headers.append('Content-Type', 'application/json');
		return this.http.post(`${environment.ReaApiUrl}`, `${content}`, httpOptions) ;
	}

	patchReason(id: string, content: string) {
		let headers = httpOptions.headers.append('Content-Type', 'application/json');
		return this.http.patch(`${environment.ReaApiUrl}/${id}`, `${content}`, httpOptions) ;
	}

	deleteReason(id: string) {
		return this.http.delete(`${environment.ReaApiUrl}/${id}`);
	}
}