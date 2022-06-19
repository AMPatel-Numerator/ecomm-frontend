import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl: string = `${environment.apiUrl}/register`;
  private userUrl:string = `${environment.apiUrl}/user`;
  private loginUrl: string = `${environment.apiUrl}/login`;

  constructor(
    private http: HttpClient,
    private eh: ErrorHandlerService) { }



  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username: username, password: password })
      .pipe(catchError(this.eh.handleError));
  }

  public signUp(userDetails: User): Observable<any> {
    return this.http.post<any>(this.registerUrl, userDetails)
      .pipe(catchError(this.eh.handleError));
  }

  public getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  public updateUser(userDetails: User): Observable<any> {
    return this.http.put<any>(this.registerUrl, userDetails)
      .pipe(catchError(this.eh.handleError));
  }

}
