import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public destinations: Product[] = []
  public cols = 5;
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe((response: any) => {
      if (response && response.succeed && response.result.length > 0) {
        this.destinations = response.result;
      }
    })
  }
}
