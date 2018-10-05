import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hotel } from './hotel';
import { environment } from './../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelUrl = environment.apiUrl + '/hotel';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET hotels from the config */
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelUrl)
      .pipe(
        catchError(this.handleError('getHotels', [])),
        // tap(x => console.log('getHotels', x))
      );
  }

  //  Get room by id
  getHotel(id: string): Observable<Hotel> {
    const url = `${this.hotelUrl}/${id}`;
    return this.http.get<Hotel>(url).pipe(
      catchError(this.handleError<Hotel>(`getHotel id=${id}`)),
      // tap(x => console.log('getHotel', x))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
