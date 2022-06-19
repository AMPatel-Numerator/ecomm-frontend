import { Injectable } from '@angular/core';
import { LocalStorageTypes } from '../models/local-storage';
import { LocalStorageService } from './local-storage.service';

export const LOGIN_TOKEN: string = 'loginToken';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private localStorageService: LocalStorageService) {}

  public getToken(): boolean {
    return !!this.localStorageService.getItem(LocalStorageTypes.Token);
  }

  public setToken(token: string): void {
    this.localStorageService.clear();
    this.localStorageService.addItem(LocalStorageTypes.Token, token);
  }

}
