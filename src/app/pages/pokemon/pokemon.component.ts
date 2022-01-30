import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.sass'],
})
export class PokemonComponent implements OnInit {
  constructor(
    private routeActivated: ActivatedRoute,
    private pokemonService: PokemonService,
    private route: Router
  ) {}

  pokemon: any = {};
  pokemonData: any = { pokemon: { name: '', sprites: { back_default: '' } } };

  ngOnInit(): void {
    this.routeActivated.queryParams.subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.getPokemon(pokemon['id']);
    });
  }

  getPokemon(id: string) {
    // get data
    this.pokemonService.getPokemon(id).subscribe({
      next: (data) => {
        console.log({ data });

        this.pokemonData = data;
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
