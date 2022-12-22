import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public pokemon: any;
  public isLoading:Boolean = false;
  public apiError:Boolean = false;

  constructor(private pokeApiService: PokeApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getInfoPokemon();
  }

  public getInfoPokemon() {
    var idPokemon = this.activatedRoute.snapshot.params['id'];
    this.pokeApiService.getPokemonById(idPokemon).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.pokeApiService.getSpeciePokemonById(idPokemon).subscribe({
          next: (resEsp: any) => {
            this.pokemon.japName = resEsp.names[0].name;
            this.isLoading = true;
          },
          error: (err: Error) => err
        })
      },
      error: (err) => {
        this.apiError = true;
      }
    })
  }

}
