import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageTypes } from './models/local-storage';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecomm-app';
  isAdmin: boolean = false;
  constructor(public router: Router, private userService: UserService, private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    setInterval(() => {
      const data = this.localStorageService.getItem(LocalStorageTypes.ADMIN);
      if (data && parseInt(data)) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false
      }
    }, 100);
  }

  public logoutUser(): void {
    this.localStorageService.clear();
    this.router.navigateByUrl("/login");
  }

}
