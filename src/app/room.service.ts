import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Room } from './room';
import { Hotel } from './hotel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private roomUrl = 'api/room';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }


  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomUrl)
      .pipe(
        catchError(this.handleError('getRooms', []))
      );
  }

  //  Get room by id
   getRoom(id: string): Observable<Room> {
    const url = `${this.roomUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      catchError(this.handleError<Room>(`getRoom id=${id}`))
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


}

