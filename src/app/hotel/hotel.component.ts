import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  @Input() hotel: Hotel;
  rooms$: Observable<Room[]>;
  room: Room;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getRoomByHotel(this.hotel._id).pipe(
      tap(x => console.log("before sort", x)),
      map(rooms => rooms.sort(
        (a, b) => a.price - b.price
      )),
      take(1),
      tap(x => console.log("sorted room", x))
    )
  }


}
