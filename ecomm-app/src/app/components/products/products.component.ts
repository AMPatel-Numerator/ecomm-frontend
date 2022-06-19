import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : any[] =  Array(10);
  cols = 5;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  private fetchAllProducts(): void {
    this.userService.getAllProducts().subscribe((data)=> {
      console.log(' ---- data --- ', data);
      this.products = data.products
    });
  }

}
