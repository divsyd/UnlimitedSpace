import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room.service';
// all the functions for a hotel room
@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  room: Room;
  id = +this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRoom();
  }
// get a specified room according id
  getRoom(): void {
    this.roomService.getRoom(this.id)
      .subscribe(room => this.room = room);
  }
// return to main page
  goBack(): void {
    this.router.navigateByUrl('');
  }
// direct to a order page
  btnClick(): void {
    this.router.navigateByUrl(`/order/${this.id}`);
  }
}
