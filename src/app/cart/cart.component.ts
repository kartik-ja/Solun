import { Component, OnInit } from '@angular/core';
import { ICart,CartPatchRequest  } from '../Inferfaces/ICart';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { IProduct } from '../Inferfaces/IProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: ICart | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.Cart.subscribe(cart => {
      this.cart = cart;
    });
  }

  removeItem(product: IProduct): void {
    this.cartService.removeItem(product);
  }

  total(): number {
    return this.cart?.watches.reduce((sum, product) => sum + product.price, 0) ?? 0;
  }
  purchase() {
    this.cartService.purchase(this.cart);
  }
}
