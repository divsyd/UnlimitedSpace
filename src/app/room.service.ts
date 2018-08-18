import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Room } from './room';
import { ROOMS } from './mock-rooms';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  constructor() { }

  getRooms(): Observable<Room[]> {
    return of(ROOMS);
  }

  getRoom(id: number): Observable<Room> {
    // TODO: send the message _after_ fetching the hero
    return of(ROOMS.find(room => room.id === id));
  }
}

