
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Observable
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = "https://pokeapi.co/api/v2/pokemon"

  constructor(private httpClient:HttpClient) { }


  public getAllPokemons():Observable<any>{
    return this.httpClient.get(`${this.url}/?limit=100`).pipe(
      res => {
        console.log(res);
        return res;
      },
      error => error
    );
  };

  public getPokemonById(id:string):Observable<any>{
    return this.httpClient.get<any>(`${this.url}/${id}`).pipe(
      res => res,
      error => error
    );
  };

  public getSpeciePokemonById(id:string):Observable<any>{
    return this.httpClient.get<any>(`${this.url}-species/${id}`).pipe(
      res => res,
      err => err
    )
  }

  public getStatusPokemon(url:string):Observable<any>{
    return this.httpClient.get(url).pipe(
      res => {
        return res;
      },
      error => error
    );
  };


  // get getAllPokemons():Observable<any>{
  //   return this.httpClient.get<any>(this.url).pipe(
  //     tap(
  //       res => res
  //     ),
  //     tap( res => {
  //       console.log(res)
  //     })
  //   )
  // }

}
