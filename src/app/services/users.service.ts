import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const URL = 'http://localhost:8087';

    const body = { title: 'Angular POST Request' };

    return this.http.post<any>(`${URL}/auth/login/`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(email + ':' + password),
      }),
    });
  }
}
