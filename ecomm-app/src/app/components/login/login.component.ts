import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LocalStorageTypes } from 'src/app/models/local-storage';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public username = '';
  public password = '';

  constructor(private _router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.checkForUserLogin()
  }

  public onSubmit(): void {
    this.loginValid = true;

    this.userService.login(this.username, this.password).pipe(
      take(1)
    ).subscribe((response: any) => {
      if (response.succeed) {
        this.authService.setToken(response.token);
        this.localStorageService.addItem(LocalStorageTypes.User_ID, response.userId);
        this.snackBar.open(
          'You logged in successfully!',
          'Close',
          { duration: 2000 });
        this._router.navigateByUrl('/home');
      } else {
        this.loginValid = false
      }
    });

  }

  private checkForUserLogin(): void {
    if (this.localStorageService.getItem(LocalStorageTypes.Token) || this.localStorageService.getItem(LocalStorageTypes.User_ID)) {
      this._router.navigateByUrl('/home');
    }
  }

}
