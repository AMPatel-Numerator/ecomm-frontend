import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Order } from '../models/order';
import { Booking } from '../models/product';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = `${environment.apiUrl}/booking`;
  private url1: string = `${environment.apiUrl}/bookings`;


  constructor(
    private http: HttpClient,
    private eh: ErrorHandlerService) { }


  createOrder(booking: Booking): Observable<any> {
    return this.http.post<Order>(this.url, booking)
      .pipe(catchError(this.eh.handleError));
  }

  getOrder(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(catchError(this.eh.handleError));
  }

  getBookings(): Observable<any> {
    return this.http.get<any>(this.url1)
      .pipe(catchError(this.eh.handleError));
  }

  updateOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(
      `${this.url}/${id}`
    )
      .pipe(catchError(this.eh.handleError));
  }
}
