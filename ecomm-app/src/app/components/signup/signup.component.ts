import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public User: any = ['Admin', 'Customer'];

  constructor() {
    // no comments
  }

  ngOnInit(): void {
    console.log('asd');
  }

}
