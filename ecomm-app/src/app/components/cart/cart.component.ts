import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public bookings: Booking[] = []
  constructor(private orderService: OrderService,
    private snackBar: MatSnackBar,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  public getOrder(): void {
    this.orderService.getOrder()
      .subscribe(response => {
        if (response && response.succeed) {
          this.process(response.result);
        }
      })
  }

  private process(bookings: Booking[]): void {
    this.bookings = bookings;
  }

  public cancel(data: Booking) {
    if (data.bookingId) {
      this.orderService.updateOrder(data.bookingId).subscribe((res: any) => {
        if (res && res.succeed) {
          this.snackBar.open('Tour Package successfully Canceled', 'Close', { duration: 5000 });
          this.getOrder();
        }
      })
    }
  }

}
