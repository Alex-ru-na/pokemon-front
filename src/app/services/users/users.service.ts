import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    //const URL = 'http://localhost:8087';
    const URL = environment.apiUrl;

    return this.http.post<any>(
      `${URL}/auth/login/`,
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(email + ':' + password),
        }),
      }
    );
  }

  createUser(newUser: any) {
    //const URL = 'http://localhost:8087';
    const URL = environment.apiUrl;

    return this.http.post<any>(`${URL}/users/create/`, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
