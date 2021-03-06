import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {};
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(1).subscribe(userDetails => {
      this.user = userDetails;
    });
  }

  public onSubmit(): void {
    this.userService.updateUser(this.user);
  }

}
