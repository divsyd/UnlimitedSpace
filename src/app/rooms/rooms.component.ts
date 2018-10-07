import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { RoomDetail } from '../roomDetail';
import { RoomService } from '../room.service';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  @Input() rooms$: Observable<Room[]>;
  @Input() hotel$: Observable<Hotel>;

  constructor(
    private roomService: RoomService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
