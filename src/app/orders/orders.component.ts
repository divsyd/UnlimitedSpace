import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Order} from '../order';
import {OrderService} from '../order.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;
  errorMsg = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
   this.getOrdersByUser();
  }

  // back to the main page
  goBack(): void {
    this.router.navigateByUrl(``);
  }

  // Get orders by user id
  getOrdersByUser() {
    const userId = localStorage.getItem('userId');
    this.orders$ = this.orderService.getOrdersByUser(userId);
  }

  // cancel order
  cancelOrder(order: Order) {
    this.orderService.deleteOrder(order._id).subscribe(
      successCode => this.getOrdersByUser(),
      error => this.errorMsg = error.statusText
    );
  }

  // edit order
  editOrder(order: Order) {
    order.canEdit = true;
  }

  // update order
  updateOrder(order: Order) {
    order.canEdit = false;
    this.orderService.updateOrder(order).subscribe(
      successCode => this.getOrdersByUser(),
      error => this.errorMsg = error.statusText
    );
  }
}
