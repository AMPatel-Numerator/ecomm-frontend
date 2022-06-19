import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public order: Order = {}
  constructor(private orderService: OrderService,
    private cartService: CartService,
    private itemsService: ItemsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getOrder();
  }

  public getOrder(): void {
    this.orderService.getOrder(this.cartService.orderId)
      .subscribe(response => {
        if (response && response.succeed) {
          this.process(response.result);
        }
      })
  }

  private process(order: Order): void {
    this.order = order;
  }

  checkout() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to place this order ?', address: this.order.address },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.order.status = 'Success';
        this.orderService.updateOrder(this.order).subscribe((res: any) => {
          if (res && res.succeed) {
            this.order.items = [];
            this.order.itemsCount = 0;
            this.cartService.clearCart();
          }
        })
      }
    });
  }

  deleteItem(id: number): void {
    this.itemsService.deleteItem(id).subscribe((response) => {
      if (response && response.succeed) {
        this.getOrder();
      }
    });
  }
}
