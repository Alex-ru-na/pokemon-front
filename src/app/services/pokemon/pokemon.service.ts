import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemon(id: string) {
    const URL = 'http://localhost:8087';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(URL + `/pokemon/${id}`, httpOptions);
  }

  getPokemones(offset: Number, limit: Number) {
    const URL = 'http://localhost:8087';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(`${URL}/pokemon/${offset}/${limit}`, httpOptions);
  }
}
