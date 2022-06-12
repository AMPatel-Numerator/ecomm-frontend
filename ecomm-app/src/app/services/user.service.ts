import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public login(username: string, password: string): Observable<any> {
    console.log(username, password);
    return of({ hello: "asds" });
  }

  public signUp(userDetails: User): Observable<any> {
    console.log(userDetails);
    return of({ hello: "asds" });
  }

  public getUser(id: number): Observable<User> {
    const user: User = { name: 'Aman', username: 'aman@xasaa', address: 'F-121, Mock Road , Mock Society' };
    return of(user);
  }

  public updateUser(userDetails: User): Observable<any> {
    console.log(userDetails);
    return of({ hello: "asds" });
  }

}
