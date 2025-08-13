import { Component, OnInit } from '@angular/core';
import { IProduct } from '../Inferfaces/IProduct';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email: string = '';
  newProducts: IProduct[] = []; // populate this from API
  subscribed = false;
  subscribe() {
    if (!this.email) return;
    // Make your API call here
    this.subscribed = true;
    this.email = '';
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.newProducts = products.slice(0, 4); // Assuming new products are the first 4
    })
  }
  constructor(private productService: ProductService, private router: Router) { }
  viewProduct(id: number) {
    this.router.navigate(['/Product'], { queryParams: { id: id } });
  }
}
