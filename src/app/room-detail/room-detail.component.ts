import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoomDetail} from '../roomDetail';
import {RoomService} from '../room.service';
import {HotelService} from '../hotel.service';
import {OrderService} from '../order.service';
import {Order} from '../order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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
    private location: Location,
    private formBuilder: FormBuilder
  ) {
  }

  daterangepickerModel: Date[];
  roomDetail: RoomDetail;
  reserveForm: FormGroup;

  ngOnInit(): void {
    this.reserveForm = this.formBuilder.group({
      dataRange: ['', Validators.required]
      // dataRange: ['', Validators.required],
      // numOfNight: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    const roomId = this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(roomId).subscribe(room => {
      this.hotelService.getHotel(room.hotel).subscribe(hotel => {
        this.roomDetail = new RoomDetail(room);
        this.roomDetail.hotel = hotel;
      });
    });
  }

  get numOfNight() {
    return this.reserveForm.get('numOfNight');
  }

  get dataRange() {
    return this.reserveForm.get('dataRange');
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (localStorage.getItem('token') == null) {
      alert('Please login');
      return;
    }
    const order = new Order();
    order.room = this.roomDetail._id;
    order.user = localStorage.getItem('userId');
    order.fromDate = this.daterangepickerModel[0];
    order.toDate = this.daterangepickerModel[1];
    order.numNights = this.daterangepickerModel[1].getDate() - this.daterangepickerModel[0].getDate();
    this.orderService.createOrder(order).subscribe(successCode => {
      alert('create order successfully');
    });
  }
}

