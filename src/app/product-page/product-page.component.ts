import { Component } from '@angular/core';
import { IProduct } from '../Inferfaces/IProduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { delay } from 'rxjs';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  product: IProduct | null = null;
  id : number = 1;
  params : any;
  addedToCart = false;
  getId()
  {
    this.id = this.params['id'] ?? 1;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.getId();
      this.productService.getProduct(this.id).pipe(delay(0)) // 1.5 second delay
      .subscribe((products) => {
        // delay
        this.product = products;
      })
    });
  }
  constructor(private router: Router, 
      private route: ActivatedRoute ,
      private productService: ProductService,
      private cartService: CartService
  ) { }
  addToCart(product: IProduct | null) {
    if (product == null) return;
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.addedToCart = true;
        setTimeout(() => {
          this.addedToCart = false;
        }, 2000); // revert after 2 seconds
      }
    });
  }
}
