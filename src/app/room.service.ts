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

  private roomsUrl = 'api/rooms';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }


  // // to retrive a specified room according to id
  // getRoom(id: number): Observable<Room> {
  //   // TODO: send the message _after_ fetching the hero
  //   return of(ROOMS.find(room => room.id === id));
  // }

  // GET rooms from the server
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        catchError(this.handleError('getRooms', []))
      );
  }

  // // GET rooms from the server for a specific hotel
  // getRoomsByHotelId(id: string): Observable<Room[]> {
  //   return this.http.get<Room[]>(this.roomsUrl)
  //     .pipe(
  //       tap(x => console.log("Before filter")),
  //       tap(room => console.log(room)),
  //       catchError(this.handleError('getRoomsByHotelId', [])),
  //     )
  //   // .pipe(
  //   //   tap(x => console.log("About to filter")),
  //   //   tap(x => console.log(id)),
  //   //   tap((room: Room) => console.log(room.hotel)),
  //   //   filter((room: Room) => room.hotel == id),
  //   //   tap(x => console.log("After filter")),
  //   //   tap(room => console.log(room))
  //   // )

  // }

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

