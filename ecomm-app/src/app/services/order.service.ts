import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Item } from '../models/item';
import { Order } from '../models/order';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = 'localhost';

  constructor(
    private http: HttpClient,
    private eh: ErrorHandlerService) { }


  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getOrder(id: string): Observable<Order> {
    const items: Item[] = [
      { id: 1, quantity: 1, name: 'Iphone 12', imageUrl: './../../assets/images/prod_1.jpg', price: 1000, description: 'Apple Best Seller' },
      { id: 2, quantity: 1, name: 'Iphone 13', imageUrl: './../../assets/images/prod_1.jpg', price: 1500, description: 'Apple Second Best Seller' },
      { id: 3, quantity: 1, name: 'Iphone 14', imageUrl: './../../assets/images/prod_1.jpg', price: 2500, description: 'Apple Third Best Seller' },
    ]
    const order: Order = { id: 1, number: 3, userId: 2, items: items, totalAmount: 5000, address: ' F-802, Felicita Society' };
    return of(order);
    // return this.http.get<Order>(`${this.url}/${id}`)
    //   .pipe(catchError(this.eh.handleError));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.url}/${order.id}`,
      order
    )
      .pipe(catchError(this.eh.handleError));
  }
}
