import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';
import { catchError } from 'rxjs/operators';
import { Contact } from '../components/contact/contact.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl: string = `${environment.apiUrl}/register`;
  private contactUrl: string = `${environment.apiUrl}/contact`;
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

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.userUrl}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  public contact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.contactUrl, contact)
      .pipe(catchError(this.eh.handleError));
  }

  public getQueries(): Observable<Contact[]> {
    return this.http.get<any>(this.contactUrl)
      .pipe(catchError(this.eh.handleError));
  }

  public geAlltUser(): Observable<User[]> {
    return this.http.get<any>(this.userUrl)
      .pipe(catchError(this.eh.handleError));
  }

}
