import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemon(id: string) {
    //const URL = 'http://localhost:8087';
    const URL = environment.apiUrl;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(URL + `/pokemon/${id}`, httpOptions);
  }

  getPokemones(offset: string, limit: string) {
    //const URL = 'http://localhost:8087';
    const URL = environment.apiUrl;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(`${URL}/pokemon/${offset}/${limit}`, httpOptions);
  }
}
