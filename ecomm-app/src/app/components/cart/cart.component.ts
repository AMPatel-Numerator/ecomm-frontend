import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public order: Order = {}
  constructor(private orderService: OrderService, private cartService: CartService,) { }

  ngOnInit(): void {
    this.orderService.getOrder(this.cartService.orderId)
      .subscribe(order => this.process(order))

  }

  private process(order: Order): void {
    this.order = order;
  }

  checkout() {
    console.log('asdas');
  }

  deleteItem(id:number): void {
    console.log('deleted');
  }
}
