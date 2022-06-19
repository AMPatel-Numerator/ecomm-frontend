import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ErrorHandlerService } from './error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    private eh: ErrorHandlerService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}`)
      .pipe(catchError(this.eh.handleError));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
