import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Item } from 'src/app/models/item';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Item = { name: 'Iphone 12', imageUrl: './../../assets/images/prod_1.jpg', price: 1800, description: 'Apple Best Seller' };
  quantity: number = 0;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  addItemToCart(): void {
    console.log('added');
  }
  goBack(): void {
    this.location.back()
    console.log('go back');
  }

  setQuantity(no: number) {
    this.quantity = no;
  }
}
