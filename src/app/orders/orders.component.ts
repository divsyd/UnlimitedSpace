import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Order} from '../order';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  // get all orders
  getAllOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(orders => this.orders = orders);
  }

// back to the main page
  btnClick(): void {
    this.router.navigateByUrl(``);
  }

}
