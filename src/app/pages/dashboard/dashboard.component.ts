import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private routeActivated: ActivatedRoute,
    private pokemonService: PokemonService,
    private route: Router
  ) {}

  userLogged: any = {};
  numbers = { numItems: 100, perPage: 10 };

  pokemonLoaded: Boolean = true;

  nextLink: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
  previousLink: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';

  pokemon: any = {
    name: '',
    sprites: {
      back_default: '',
      back_female: '',
    },
  };

  pokemonsData: any = { pokemones: { results: [] }, count: 0 };

  ngOnInit(): void {
    this.routeActivated.queryParams.subscribe((user) => {
      this.userLogged = user;
      this.getPokemones();
    });
  }

  selectPokemon(pokemonItem: any) {
    this.route.navigate(['/pokemon'], {
      queryParams: {
        name: pokemonItem.name,
        id: pokemonItem.url.trim().split('/')[
          pokemonItem.url.trim().split('/').length - 2
        ],
      },
    });
  }

  getPokemones(offset: string = '0', limit: string = '10') {
    //offset: Number, limit: Number
    this.pokemonService.getPokemones(offset, limit).subscribe({
      next: (data) => {
        this.pokemonsData = data;
        //this.numbers.numItems = this.pokemonsData.pokemones.count;

        this.nextLink = this.pokemonsData.pokemones.next;
        this.previousLink = this.pokemonsData.pokemones.previous;

        this.pokemonLoaded = true;
      },
      error: (error) => {
        // localStorage.setItem('token', '');
        console.log({ error });
      },
    });
  }

  getParameterByName(name: string, url: string) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  selectPreviousPage() {
    console.log({ PL: this.previousLink });

    if (!this.previousLink) {
      return;
    }

    let offset = this.getParameterByName('offset', this.previousLink) || '0';
    let limit = this.getParameterByName('limit', this.previousLink) || '10';

    this.pokemonService.getPokemones(offset, limit).subscribe({
      next: (data) => {
        this.pokemonsData = data;
        this.numbers.numItems = this.pokemonsData.pokemones.count;

        this.nextLink = this.pokemonsData.pokemones.next;
        this.previousLink = this.pokemonsData.pokemones.previous;

        this.pokemonLoaded = true;
      },
      error: (error) => {
        // localStorage.setItem('token', '');
        console.log({ error });
      },
    });

    this.pokemonLoaded = false;
  }

  selectNextPage() {
    console.log({ PL: this.nextLink });

    if (!this.nextLink) {
      return;
    }

    let offset = this.getParameterByName('offset', this.nextLink) || '0';
    let limit = this.getParameterByName('limit', this.nextLink) || '10';

    this.pokemonService.getPokemones(offset, limit).subscribe({
      next: (data) => {
        this.pokemonsData = data;

        this.nextLink = this.pokemonsData.pokemones.next;
        this.previousLink = this.pokemonsData.pokemones.previous;

        this.pokemonLoaded = true;
      },
      error: (error) => {
        // localStorage.setItem('token', '');
        console.log({ error });
      },
    });

    this.pokemonLoaded = false;
  }
}
