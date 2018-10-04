import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels$: Observable<Hotel[]>;
  rooms$: Observable<Room[]>;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.hotels$ = this.hotelService.getHotels().pipe(
      tap(hotels => hotels.forEach(
        hotel => this.rooms$ = this.roomService.getRoomByHotel(hotel._id)
      ))
    );
  }

  getCheapestRoom(roomid: string): void {
    this.rooms$ = this.roomService.getRoomByHotel(roomid).pipe(
      tap(x => console.log("before sort", x)),
      map(rooms => rooms.sort(
        (a, b) => a.price - b.price
      )),
      // take(1),
      tap(x => console.log("sorted room", x))
    )
  }


}
