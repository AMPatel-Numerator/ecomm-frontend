import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Booking, Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: Product = {};
  public picker:any;
  public booking:Booking = {};
  public food:string = 'No';
  public mode:string = 'Bus';
  quantity: number = 0;
  defaultDate:Date = new Date();
  constructor(
    private location: Location,
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private orderService:OrderService,
    private router: Router,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      const productId: number = (res && res.params && res.params['id']) ? res.params['id'] : 1;
      this.productService.getProduct(productId).subscribe((response: any) => {
        if (response && response.succeed) {
          this.product = response.result;
          this.booking.description = this.product.description;
          this.booking.numDays = this.product.numDays;
          this.booking.numNights = this.product.numNights;
          this.booking.placeCountry = this.product.country;
          this.booking.placeName = this.product.name;
          this.booking.price = this.product.price;
          this.booking.date = this.defaultDate.toISOString().split('T')[0];
        }
      })
    })
  }

  goBack(): void {
    this.location.back();
  }

  book() {
    if (this.booking.mode === "Train") {
      this.booking.price = (this.booking.price || 0) + 100;
    } else if (this.booking.mode === "Flight") {
      this.booking.price = (this.booking.price || 0) + 500;
    } else{
      this.booking.mode = 'Bus'
    }
    if (this.booking.food === "Yes") {
      this.booking.price = (this.booking.price || 0) + 300;
    } else{
      this.booking.food = 'No';
    }
    console.log(this.booking)
    this.showSuccessSnackBar();
  }
  modeChange(data:any){
    this.booking.mode = data.value;
  }
  foodChange(data:any){
    this.booking.food = data.value;
  }
  setDate(date:any) {
    const stringified = JSON.stringify(date.value);
    const dob = stringified.substring(1, 11);
    this.booking.date = dob;
  }
  private showSuccessSnackBar() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to book this tour package ?',
        price: this.booking.price, date: this.booking.date
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.createOrder(this.booking).subscribe((res: any) => {
          if (res.succeed) {
            this.snackBar.open('Tour Package successfully booked', 'Close', { duration: 5000 });
            this.router.navigateByUrl("/bookings");
          }
        })
      } else{
        this.booking.price = this.product.price
      }
    });

  }

}
