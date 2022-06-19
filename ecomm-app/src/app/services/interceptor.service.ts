import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_TOKEN } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private token: string | null = '';
  private ignoreInterceptorEndpoints = ['login', 'signup'];
  private isEndpointProtected: boolean = true;

  constructor(private localStorageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.ignoreInterceptorEndpoints.forEach(endpoint => {
      if (req.url.includes(endpoint)) {
        this.isEndpointProtected = false;
      }
    });

    this.token = this.localStorageService.getItem(LOGIN_TOKEN);
    if(this.token && this.isEndpointProtected) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }

}
