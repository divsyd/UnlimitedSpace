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

  getOrdersByUser() {
    const userId = localStorage.getItem('userId');
    this.orders$ = this.orderService.getOrdersByUser(userId);
  }

  // cancel order
  cancelOrder(order: Order) {
    this.orderService.deleteOrder(order._id).subscribe(successCode => {
      this.getOrdersByUser();
    });
  }
}
