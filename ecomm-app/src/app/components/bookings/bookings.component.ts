import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Booking } from "src/app/models/product";
import { OrderService } from "src/app/services/order.service";
import { UserService } from "src/app/services/user.service";
import { Contact } from "../contact/contact.component";

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss']
})

export class BookingsComponent {
    public bookings: Booking[] = []
    constructor(public orderService: OrderService) {

    }

    ngOnInit(): void {
        this.getBookings();
    }

    public getBookings(): void {
        this.orderService.getBookings()
            .subscribe((response: any) => {
                if (response && response.succeed) {
                    this.bookings = response.result;
                }
            })
    }
}
