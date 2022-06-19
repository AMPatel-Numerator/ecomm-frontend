import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private url: string = `${environment.apiUrl}/items`;

  constructor(
    private http: HttpClient,
    private eh: ErrorHandlerService) { }

  createItem(Item: Item): Observable<any> {
    return this.http.post<any>(this.url, Item)
      .pipe(catchError(this.eh.handleError));
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
