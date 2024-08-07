import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of,map,delay } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  private getCountriesRequest ( url: string ): Observable<(Country[])> {

    return this.http.get<Country[]>( url )
      .pipe(
        catchError ( () => of([])),
      )
  }

  searchContryByAplhaCode ( code : string): Observable<Country | null> {
    return this.http.get<Country[]>(` ${ this.apiUrl }/alpha/${ code }`)
    .pipe (
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( () => of(null))
    );
  }

  searchCapital ( term: string): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ term }`;
    console.log({ url });

    return this.getCountriesRequest(url);
  }

  searchCountry ( term: string): Observable<Country[]>{

    const url = ` ${ this.apiUrl }/name/${ term }`
    return this.getCountriesRequest(url);
  }

  searchRegion ( region: string): Observable<Country[]>{

    const url = ` ${ this.apiUrl }/region/${ region }`
    return this.getCountriesRequest(url);
  }

}
