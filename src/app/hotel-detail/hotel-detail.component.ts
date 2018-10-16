import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../room';
import { RoomDetail } from '../roomDetail';
import { RoomService } from '../room.service';
import { Hotel } from '../hotel';
import { HotelService } from '../hotel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService,
    private location: Location
  ) { }

  hotel: Hotel;
  rooms$: Observable<Room[]>;

  ngOnInit(): void {
    const hotelId = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotel(hotelId).subscribe(hotel => {
      this.hotel = hotel;
      this.rooms$ = this.roomService.getRooms(true, hotel._id);
    });

  }

  goBack(): void {
    this.location.back();
  }

}
