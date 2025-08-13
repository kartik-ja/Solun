import { Component } from '@angular/core';
import { IProduct } from '../Inferfaces/IProduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: IProduct[] = [];
  filtedProducts: IProduct[] = [];
  filter : string = "";
  params : any;
  caption: string = "Explore our collection of watches";
  captionEveryday: string = "Our watches are designed for everyday clarity. Each one is crafted with clean lines, warm textures, and quiet details that speak to the subtle beauty of time passing.";
  captionClassic: string = "Whether you're starting your day or winding it down, we believe time is something to be cherished.";
  captionElements: string = " Inspired by natural elements and minimalist living, Solun blends timeless design with modern simplicity. No clutter. No noise. Just honest craftsmanship and thoughtful form.";
  filterProducts()
  {
    this.filter = this.params['filter'] ?? '';
    if (this.filter.toLowerCase() == 'everyday') {
      this.caption = this.captionEveryday;
    } else if (this.filter.toLowerCase() == 'classic') {
      this.caption = this.captionClassic;
    } else if (this.filter.toLowerCase() == 'elements') {
      this.caption = this.captionElements;
    } else {
      this.caption = "Explore our collection of watches";
    }
    this.filtedProducts = this.products.filter(product=>product.category == this.filter);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.filterProducts();
    });
    this.productService.getProducts().subscribe((products)=>{
      this.products = products;
      this.filterProducts();
    })
  }
  constructor(private router: Router, 
    private route: ActivatedRoute ,
    private productService: ProductService
  ) {  }
}
