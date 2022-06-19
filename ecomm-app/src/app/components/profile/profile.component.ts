import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { LocalStorageTypes } from 'src/app/models/local-storage';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {};
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const userId: any = this.localStorageService.getItem(LocalStorageTypes.User_ID);
    if (!userId) {
      this._router.navigateByUrl('/login');
      return;
    }
    this.userService.getUser(userId).subscribe(userDetails => {
      if (userDetails && userDetails.succeed) {
        this.user = userDetails.result;
      }
    });
  }

  public onSubmit(): void {
    this.userService.updateUser(this.user).subscribe(response => {
      if (response && response.succeed) {
        this.snackBar.open(response.message, 'Close', { duration: 8000 });
      }
    });
  }

}
