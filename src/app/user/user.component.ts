import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private orderServices: OrderService) { }

  ngOnInit() {
  }

}
