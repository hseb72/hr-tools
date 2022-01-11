import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { EmployeeService } from './employee.service';

const EMPTY_USER = { id: 0, email: '', firstName: '', lastName: '' };

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private employeeService: EmployeeService
    ) {
        var user = localStorage.getItem('user') ;
        if ( ! user ) { user = JSON.stringify(EMPTY_USER) ; }
        this.userSubject = new BehaviorSubject<User>(JSON.parse(user));
        this.user = this.userSubject.asObservable();    
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: any, password: any) {
        /* fake login */
        const USER = { id: 1, email: username, firstName: 'Fake', lastName: 'User' }
        localStorage.setItem('user', JSON.stringify(USER));
        this.userSubject.next(USER);
        //return USER;
        /* End of fake user - restore return string below to enable true login */

//        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
        return this.employeeService.authenticate(username, password)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
            /**/
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(EMPTY_USER);
        this.router.navigate(['/']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/employee/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: number, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}