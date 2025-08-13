import { Component } from '@angular/core';
import { ICart } from '../Inferfaces/ICart';
import { Router } from '@angular/router';
import { IPurchaseOrder } from '../Inferfaces/IPurchaseOrder';
import { HttpClient } from '@angular/common/http';
import { IPurchaseOrderResponse } from '../Inferfaces/IPurchaseOrderResponse';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { IAddress } from '../Inferfaces/IAddress';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
 cart: ICart | null = null;
submitted: Boolean = false;
shipping: IAddress = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  billing: IAddress = {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };
  sameAsShipping = false;

  payment: any = { method: '' };
  coupon: string = '';
  discountAmount = 0;
  totalAfterDiscount = 0;
  couponValid: boolean = false;
  discountMessage = '';
  constructor(private router: Router, private http: HttpClient, private cartService: CartService) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.cart = nav.extras.state['cart'];
    }
    else {
      this.router.navigate(['/Cart']);
    }
  }
    // In reality, you'll get the cart from a service or router state
  //   this.cart = {
  //     id: 1,
  //     watches: [
  //       { id: 1, name: 'Classic Watch', description: 'Leather strap', price: 199, image: '/assets/watch1.jpg', strap: '', dial_color: '', case_material: '', category: '', case_diameter_mm: 40, strap_material: '', water_resistance: '' }
  //     ]
  //   };
  // }

  getTotal() {
    return this.cart?.watches.reduce((total, item) => total + item.price, 0) || 0;
  }
  getTotalAfterDiscount() {
    return this.getTotal() - this.discountAmount;
  }
  copyShippingToBilling() {
    if (this.sameAsShipping) {
      this.billing = { ...this.shipping };
    }
  }

  applyCoupon() {
  const total = this.getTotal();

  if (this.coupon === 'SAVE10') {
    this.couponValid = true;
    this.discountAmount = total * 0.1;
    this.discountMessage = 'Discount applied successfully!';
  } else {
    this.couponValid = false;
    this.discountAmount = 0;
    this.discountMessage = 'Invalid coupon code';
  }
}

  finalizePurchase(form: NgForm) {
  this.submitted = true;
  if (form.invalid) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
    return; // block submit if invalid
  }
    this.copyShippingToBilling();
    const payload: IPurchaseOrder = {
      watches: this.cart?.watches.map(item => ({
        price: item.price,
        watchId: item.id,
        discountCode: this.couponValid ? this.coupon : undefined,
        discountPrice: this.couponValid ? this.discountAmount : item.price
      })),
      currency: 'USD',
      shippingAddress:  Object.values(this.shipping).join('\n'),
      billingAddress: Object.values(this.billing).join('\n'),
      paymentMethod: this.payment.method,
      notes: ''
    };
    this.http.post<IPurchaseOrderResponse>('/api/Orders/bulk', payload).subscribe({
      next: (message) => {
        this.cartService.ClearCart();
        this.router.navigate(['/Order'], { queryParams: { id: message.order?.id } });
      },
      error: err => {
        alert('Something went wrong during purchase.');
      }
    });
    // Here you'll send a POST to your backend
  }
}