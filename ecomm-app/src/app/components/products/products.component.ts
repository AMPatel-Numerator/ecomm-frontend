import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : any[] =  Array(10).fill({ id: 1 , name : 'Iphone 12' , imageUrl : './../../assets/images/prod_1.jpg' , price : 1800  });
  cols = 5;
  constructor() { }
  ngOnInit(): void {
  }

}
