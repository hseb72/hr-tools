import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.EmpApiUrl}`);
  }

  getEmployee(id: string) {
    return this.http.get(`${environment.EmpApiUrl}/${id}`);
  }

  putEmployee(content: string) {
    return this.http.put(`${environment.EmpApiUrl}`, `${content}`, httpOptions) ;
  }

  postEmployee(content: string) {
    return this.http.post(`${environment.EmpApiUrl}`, `${content}`, httpOptions) ;
  }

  patchEmployee(id: string, content: string) {
    return this.http.patch(`${environment.EmpApiUrl}/${id}`, `${content}`, httpOptions) ;
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${environment.EmpApiUrl}/${id}`) ;
  }
  getEmployees() {
    return this.http.get(`${environment.EmpApiUrl}`);
  }

  authenticate(email: string, password: string) {
    return this.http.post<any>(`${environment.EmpApiUrl}/authenticate`, {email, password});
  }

  isLoggedIn<User>(id: string) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/loggedin`);
  }

  getVacation(id: any) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/vacation`);
  }

  getApprovers(id: any) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/approver`);
  }

  getApprovals(id: any) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/approval`);
  }

  getStaff(id: any) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/staff`);
  }

  patchEmployeeSecrets(id: string, content: string) {
    return this.http.patch(`${environment.EmpApiUrl}/${id}/secret`, `${content}`, httpOptions) ;
  }

  getYearActivity(id: any, year: string) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/yearact/${year}`);
  }

  getMonthActivity(id: any, year: string, month: string) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/monthact/${year}/${month}`);
  }

  getWeekActivity(id: string, year: string, week: string) {
    return this.http.get(`${environment.EmpApiUrl}/${id}/weekact/${year}/${week}`);
  }

}
