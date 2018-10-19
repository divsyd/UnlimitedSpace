import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Room } from './room';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private roomUrl = environment.apiUrl + '/room';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }


  // Get rooms getter but also allows options to filter by hotel, number of items returned and sort by hotel id and then room price
  getRooms(sort?: boolean, hotelId?: string, limitResults?: number): Observable<Room[]> {

    let options = ""
    if (sort) {
      options = options + "&sort=" + sort;
    }
    if (hotelId) {
      options = options + "&hotel=" + hotelId;
    }
    if (limitResults) {
      options = options + "&limit=" + limitResults;
    }
 
    let url = this.roomUrl + "?" + options;

    return this.http.get<Room[]>(url)
      .pipe(
        catchError(this.handleError('getRooms', [])),
      );
  }

  
  //  Get room by id
  getRoom(id: string): Observable<Room> {
    const url = `${this.roomUrl}/${id}`;
    return this.http.get<Room>(url)
      .pipe(
        catchError(this.handleError<Room>(`getRoom id=${id}`)),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  searchRooms(term: string): Observable<Room[]> {
    if (!term.trim()) {
      // if not search term, return empty room array.
      return of([]);
    }

    const url = `${this.roomUrl}/name/${term}`;

    return this.http.get<Room[]>(url).pipe(
      tap(_ => console.log(`found rooms matching "${term}"`)),
      catchError(this.handleError<Room[]>('searchRooms', []))
    );
  }
}

