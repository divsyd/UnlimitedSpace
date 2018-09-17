import { Component, OnInit } from '@angular/core';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels$: Observable<Hotel[]>;

  constructor(
    private hotelService: HotelService,
  ) { }

  ngOnInit() {
    this.hotels$ = this.hotelService.getHotels();

  }


}
