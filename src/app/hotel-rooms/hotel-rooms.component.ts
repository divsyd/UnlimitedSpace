import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  room: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  goBack(): void {
    this.location.back();
  }
}
