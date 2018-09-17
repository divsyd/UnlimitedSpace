import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../room';
import { RoomDetail } from '../roomDetail';
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

  roomDetail: RoomDetail;

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(roomId).subscribe(room => {
      this.hotelService.getHotel(room.hotel).subscribe(hotel => {
        this.roomDetail = new RoomDetail(room);
        this.roomDetail.hotel = hotel;
      });
    });

  }

  goBack(): void {
    this.location.back();
  }

}

