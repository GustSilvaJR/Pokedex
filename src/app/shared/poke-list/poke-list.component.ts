import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

//Services
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit, OnChanges {

  @Input() public searchPokemon: string = "";

  public listFixedPokemons: Array<Pokemon> = [];
  public listPokemons: Array<Pokemon> = [];
  public apiError: Boolean = false;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {

    this.pokeApiService.getAllPokemons().subscribe({
      next: (res) => {
        res.results.forEach((pokemon: any) => {
          this.pokeApiService.getStatusPokemon(pokemon.url).subscribe({
            next: (res) => {
              res.types.forEach((e: any) => {
                e.type.name = e.type.name[0].toUpperCase() + e.type.name.substring(1);
              });
              pokemon.status = res;
              pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
              this.listPokemons.push(pokemon);
            },
            error: (err) => err
          });
        });
        this.listFixedPokemons = this.listPokemons;
      },
      error: (err) => {
        this.apiError=true;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.searchPokemon === "") {
      this.listPokemons = this.listFixedPokemons;
    } else {
      const filter = this.listFixedPokemons.filter((res: any) => {
        this.searchPokemon = this.searchPokemon.toLowerCase();
        this.searchPokemon = this.searchPokemon[0].toUpperCase() + this.searchPokemon.substring(1);
        return !res.name.indexOf(this.searchPokemon)
      });

      this.listPokemons = filter;
      console.log(filter);
      console.log(`Mudança: ${changes} | ${this.searchPokemon}`);
    }

  }

}
