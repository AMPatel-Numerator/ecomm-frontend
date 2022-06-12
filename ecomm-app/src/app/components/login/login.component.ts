import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
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

  constructor(private _router: Router, private loginService: UserService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.loginValid = true;

    this.loginService.login(this.username, this.password).pipe(
      take(1)
    ).subscribe({
      next: _ => {
        this.loginValid = true;
        this._router.navigateByUrl('/home');
      },
      error: _ => this.loginValid = false
    });
  }

}
