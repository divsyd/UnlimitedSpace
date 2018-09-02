import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { Hotel } from '../hotel';


// all the functions for a hotel room
@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  @Input() rooms: Room[];

  constructor() { }

  ngOnInit() {
  }

}
