import { Component, Input } from '@angular/core';
import { IProduct } from '../Inferfaces/IProduct';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  /**
   *
   */
    addedToCart = false; 
  constructor(private http: HttpClient, private cartService: CartService) { 
  }
  addToCart(): void {
    this.cartService.addToCart(this.product).subscribe({
      next: () => {
        this.addedToCart = true;
        setTimeout(() => {
          this.addedToCart = false;
        }, 2000); // revert after 3 seconds
      }
    });
  }
}
