import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Item } from 'src/app/models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Item = { name: 'Iphone 12', imageUrl: './../../assets/images/prod_1.jpg', price: 1800, description: 'Apple Best Seller' };
  quantity: number = 0;
  private productId: string | null = '';
  constructor(private location: Location, private activateRouter: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.getProductDetails();
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

  private getProductDetails(): void {
    this.productId = this.activateRouter.snapshot.paramMap.get('id');

    // api call
    this.userService.getProductDetails(this.productId).subscribe((data)=> {
      console.log(' ---- data --- ', data);

    });
  }
}
