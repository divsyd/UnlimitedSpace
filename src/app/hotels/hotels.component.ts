import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  private searchTerms = new Subject<string>();
  rooms: Room[];

  constructor(private roomService: RoomService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
}
