import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public username = '';
  public password = '';
  public name = '';
  public contact = '';

  constructor(private userService: UserService, private _router: Router, private snackBar: MatSnackBar) {
    // no comments
  }

  ngOnInit(): void {
    console.log('asd');
  }

  public onSubmit(): void {
    const userInfo: User = { name: this.name, contact: this.contact, username: this.username, password: this.password };
    this.userService.signUp(userInfo).subscribe((response: any) => {
      if (response.succeed) {
        this.snackBar.open(
          response.message,
          'Close',
          { duration: 2000 });
        this._router.navigateByUrl('/login');
      } else {
        this.snackBar.open(
          'Signup failed. Check your user details.',
          'Close',
          { duration: 6000 });
      }
    }
    );
  }

}
