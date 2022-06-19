import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    console.log(username, password);

    const url: string = `/api/v1/defaultAccount/`;
		// return this.http.get(url, {});
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

  public getAllProducts(): Observable<any> {

    const url: string = `/api/v1/fetchAllProducts/`;
		return this.http.get("../../assets/productData.json");

  }

  public getProductDetails(productId: string | null): Observable<any> {

    const url: string = `/api/v1/fetchAllProducts/${productId}`;
    console.log('url', url);
		return this.http.get("../../assets/productData.json");

  }

}
