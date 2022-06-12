import { Component, OnInit } from '@angular/core';
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
  public address = '';

  constructor(private userService: UserService) {
    // no comments
  }

  ngOnInit(): void {
    console.log('asd');
  }

  public onSubmit(): void {
    const userInfo: User = { name: this.name, address: this.address, username: this.username, password: this.password };
    this.userService.signUp(userInfo);
  }

}
