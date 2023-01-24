import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector: 'app-add-destination',
    templateUrl: './add-destination.component.html',
    styleUrls: ['./add-destination.component.scss']
})

export class AddDestinationComponent implements OnInit {
    constructor(public productService: ProductService,private _router: Router, public snackBar: MatSnackBar) {

    }
    ngOnInit(): void {
        this.destination.numDays = 1;
        this.destination.numNights = 1;
        this.destination.price = 1000;
    }
    public destination: Product = {}


    onSubmit(): void {
        this.productService.createProduct(this.destination).subscribe((response: any) => {
            if (response.succeed) {
                this.snackBar.open(
                    response.message,
                    'Close',
                    { duration: 2000 });
                this._router.navigateByUrl("/all-destionations");
            } else {
                this.snackBar.open(
                    'Signup failed. Check your user details.',
                    'Close',
                    { duration: 6000 });
            }
        }
        );
    }

    uploadFile(event: any) {

        const file = event.target.files[0];
        this.destination.imageUrl = './../../assets/images/' + file.name;
    }
}
