import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-desinations',
  templateUrl: './desinations.component.html',
  styleUrls: ['./desinations.component.scss']
})

export class DestinationsComponent {
  public destinations: Product[] = []
  constructor(public productService: ProductService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getDestinations();
  }

  public getDestinations(): void {
    this.productService.getProducts()
      .subscribe((response: any) => {
        if (response && response.succeed) {
          this.destinations = response.result;
        }
      })
  }

  public delete(data: Product) {
    if (data.destinationId) {
      this.productService.deleteProduct(data.destinationId).subscribe((res: any) => {
        if (res && res.succeed) {
          this.snackBar.open('Destination deleted Successfully', 'Close', { duration: 5000 });
          this.getDestinations();
        }
      })
    }
  }

}
