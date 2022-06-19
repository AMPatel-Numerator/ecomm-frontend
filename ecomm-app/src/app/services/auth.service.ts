import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export const LOGIN_TOKEN: string = 'loginToken';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private localStorageService: LocalStorageService) {}

  public getToken(): boolean {
    return !!this.localStorageService.getItem(LOGIN_TOKEN);
  }

  public setToken(userId: string, token: string): void {
    this.localStorageService.clear();
    this.localStorageService.addItem(LOGIN_TOKEN, token);
  }

}
