import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Room } from '../room';
import { RoomService } from '../room.service';

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

  getRoom(): void {
    this.roomService.getRoom(this.id)
      .subscribe(room => this.room = room);
  }

  goBack(): void {
    this.router.navigateByUrl("")
  }

  btnClick(): void {
    this.router.navigateByUrl(`/order/${this.id}`)
  }
}
