import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { Hotel } from '../hotel';
import { RoomService } from '../room.service';

// all the functions for a hotel room
@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  @Input() hotelId: string;
  rooms: Room[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.getRoomsByHotel();
  }

  getRoomsByHotel(): void {
    const id = this.hotelId;
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms.filter(room => room.hotel === id))
  }

}
