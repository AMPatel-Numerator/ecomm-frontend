import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ItemsService } from 'src/app/services/items.service';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: Product = {};
  quantity: number = 0;
  constructor(
    private location: Location,
    private productService: ProductService,
    private route: ActivatedRoute,
    private orders: OrderService,
    private itemsService: ItemsService,
    private cartService: CartService,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      const productId: number = (res && res.params && res.params['id']) ? res.params['id'] : 5;
      this.productService.getProduct(productId).subscribe((response: any) => {
        if (response && response.succeed) {
          this.product = response.result;
        }
      })
    })
  }

  addItemToCart(): void {
    if (this.quantity > 0) {
      if (this.cartService.orderId == 0) {
        this.orders.createOrder().subscribe(
          (response: any) => {
            if (response && response.succeed) {
              this.cartService.orderId = response.order.orderId || 0;
              this.itemsService.createItem({
                orderId: response.order.orderId,
                productId: this.product.productId,
                name: this.product.name,
                quantity: this.quantity,
                price: this.product.price,
                imageUrl: this.product.imageUrl,
                itemAmount: this.product.price ? (this.product.price * this.quantity) : 0,
              }).subscribe((response: any) => {
                if (response && response.succeed) {
                  this.cartService.incrementItemCount(this.quantity);
                  this.showSuccessSnackBar();
                }
              })
            }
          })
      }
      else {
        this.itemsService.createItem({
          orderId: this.cartService.orderId,
          productId: this.product.productId,
          name: this.product.name,
          quantity: this.quantity,
          price: this.product.price,
          imageUrl: this.product.imageUrl,
          itemAmount: this.product.price ? (this.product.price * this.quantity) : 0,
        }).subscribe((resp: any) => {
          if (resp && resp.succeed) {
            this.cartService.incrementItemCount(this.quantity);
            this.showSuccessSnackBar();
          }
        })
      }
    }
    else {
      this.snackBar.open('Select a quantity greater than 0.', 'Close', { duration: 8000 });
    }
  }
  goBack(): void {
    this.location.back();
  }

  setQuantity(no: number) {
    this.quantity = no;
  }

  private showSuccessSnackBar() {
    this.snackBar.open('Item successfully added to cart.', 'Close', { duration: 5000 });
  }

}
