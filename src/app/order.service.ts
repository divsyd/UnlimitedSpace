import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from './order';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = environment.apiUrl + '/order';

  constructor(private http: HttpClient) { }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl).pipe(
      catchError(this.handleError<Order[]>(`getAllOrders`))
    );
  }

  //  Get orders by user id
  getOrders(usrId: string): Observable<Order[]> {
    const url = `${this.orderUrl}/${usrId}`;
    return this.http.get<Order[]>(url).pipe(
      catchError(this.handleError<Order[]>(`getOrders id=${usrId}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
