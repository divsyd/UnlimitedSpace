import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { Observable } from 'rxjs';
import { RoomService } from '../room.service';



// all the functions for a hotel room
@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  @Input() hotelId: string
  rooms$: Observable<Room[]>

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getRoomByHotel(this.hotelId)
  }

}
