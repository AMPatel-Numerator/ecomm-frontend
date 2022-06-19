import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public username = '';
  public password = '';

  constructor(private _router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkForUserLogin()
  }

  public onSubmit(): void {
    this.loginValid = true;

    this.userService.login(this.username, this.password).pipe(
      take(1)
    ).subscribe({
      next: _ => {
        this.authService.setToken(this.username, 'dummyToken');
        this.loginValid = true;
        this._router.navigateByUrl('/home');
      },
      error: _ => {
        this.loginValid = false
      }
    });
  }

  private checkForUserLogin(): void {
    if (this.authService.getToken()) {
      this._router.navigateByUrl('/home');
    }
  }

}
