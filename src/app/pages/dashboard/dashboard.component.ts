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

  pokemon: any = {
    name: 'bulbasaur',
    sprites: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      back_female: null,
    },
  };

  pokemons = [
    { id: 1, name: 'Dr Nice' },
    { id: 2, name: 'Narco' },
    { id: 3, name: 'Bombasto' },
    { id: 4, name: 'Celeritas' },
    { id: 5, name: 'Magneta' },
    { id: 6, name: 'RubberMan' },
    { id: 7, name: 'Dynama' },
    { id: 8, name: 'Dr IQ' },
    { id: 9, name: 'Magma' },
    { id: 10, name: 'Tornado' },
  ];

  pokemonsData: any = { pokemones: { results: [] } };

  ngOnInit(): void {
    this.routeActivated.queryParams.subscribe((user) => {
      this.userLogged = user;
      this.getPokemones();
    });
  }

  onSelect(pokemonItem: any) {
    this.route.navigate(['/pokemon'], {
      queryParams: {
        name: pokemonItem.name,
        id: pokemonItem.url.trim().split('/')[
          pokemonItem.url.trim().split('/').length - 2
        ],
      },
    });
  }

  getPokemones() {
    this.pokemonService.getPokemones().subscribe({
      next: (data) => {
        this.pokemonsData = data;
        console.log({ data });
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
