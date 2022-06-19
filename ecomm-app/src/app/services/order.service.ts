import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Order } from '../models/order';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = `${environment.apiUrl}/order`;

  constructor(
    private http: HttpClient,
    private eh: ErrorHandlerService) { }


  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.url}/${order.orderId}`,
      order
    )
      .pipe(catchError(this.eh.handleError));
  }
}
