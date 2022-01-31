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

  pokemonLoaded: Boolean = false;

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

  getPokemones(offset: Number = 0, limit: Number = 10) {
    //offset: Number, limit: Number
    this.pokemonService.getPokemones(offset, limit).subscribe({
      next: (data) => {
        this.pokemonsData = data;
        this.numbers.numItems = this.pokemonsData.pokemones.count;
        this.pokemonLoaded = true;
      },
      error: (error) => {
        // localStorage.setItem('token', '');
        console.log({ error });
      },
    });
  }

  selectPage(item: any) {
    this.getPokemones(item.perPage * item.i, item.perPage);

    console.log({ item });
  }
}
