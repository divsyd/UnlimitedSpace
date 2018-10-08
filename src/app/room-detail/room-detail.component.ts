import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoomDetail} from '../roomDetail';
import {RoomService} from '../room.service';
import {HotelService} from '../hotel.service';
import {OrderService} from '../order.service';
import {Order} from '../order';


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
    private orderService: OrderService,
    private location: Location
  ) {
  }

  daterangepickerModel: Date[];
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

  reserve(roomInstance: String) {

    /*{
      roomInstance: '5bb9b361369525697c31397c',
      user: '5bb9b35e369525697c31397a',
      numNights: 5
    }*/
    const order = new Order();
    order.roomInstance = roomInstance;
    order.user = localStorage.getItem('userId');
    order.fromDate = this.daterangepickerModel[0];
    order.toDate = this.daterangepickerModel[1];
    order.numNights = 5;

    this.orderService.createOrder(order).subscribe(successCode => {
      alert('create order successfully');
    });
  }
}

