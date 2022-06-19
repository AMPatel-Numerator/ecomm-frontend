import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecomm-app';

  constructor(public router: Router, private userService: UserService, private localStorageService: LocalStorageService) {}

  public ngOnInit(): void {
  }

  public logoutUser(): void {
    this.localStorageService.clear();
    this.router.navigateByUrl("/login");
  }

}
