import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { Hotel } from '../Hotel';
import { HotelService } from '../Hotel.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService,
    private location: Location
  ) { }

  room: Room;
  hotel: Hotel;

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id.toString())
      .subscribe(room => this.room = room);
  }

  getHotel(): void {
    const id = this.room.hotel;
    this.hotelService.getHotel(id)
    .subscribe(hotel => this.hotel = hotel)

  }

  goBack(): void {
    this.location.back();
  }

}
