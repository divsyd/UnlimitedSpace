import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OrderTableDataSource } from './order-table-datasource';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: OrderTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'numNights', 'reservationDate', 'pay', 'cancel'];
 constructor (private orderService: OrderService) {}

  ngOnInit() {
    this.dataSource = new OrderTableDataSource(this.paginator, this.sort, this.orderService);
  }
}
