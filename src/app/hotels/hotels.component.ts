import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { Room } from '../room';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[];
  rooms: Room[];

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.getHotels();
    this.getRooms();
  }

  // get all hotels
  getHotels(): void {
    this.hotelService.getHotels()
      .subscribe(hotels => this.hotels = hotels);
  }

  // get all rooms
  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }

  getRoomsByHotel(id): Room[] {
    if (!this.rooms) { return []; }
    return this.rooms.filter(room => room.hotel === id);
  }

}
