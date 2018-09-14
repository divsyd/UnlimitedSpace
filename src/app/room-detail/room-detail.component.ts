import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

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
    const roomId = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(roomId)
      .subscribe(
        room => {
          this.room = room;
          this.getHotel(room.hotel);
        }
      );
  }

  getHotel(id: string): void {
    this.hotelService.getHotel(id)
      .subscribe(hotel => this.hotel = hotel);
  }

  goBack(): void {
    this.location.back();
  }

}

