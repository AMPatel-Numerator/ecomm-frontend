import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  prefix_path = './../../assets/images/';
  images = [this.prefix_path + "bg_1.jpg", this.prefix_path + "bg_2.jpg", this.prefix_path + "bg_3.jpg", this.prefix_path + "bg_4.jpg"];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

}
