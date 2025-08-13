import { Component } from '@angular/core';
import { IUser } from '../Inferfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../Inferfaces/IOrder';
import { IOrdersResponse } from '../Inferfaces/IOrderResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: IUser | null = null;
  orders: IOrder[] = [];
  //  user = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   phone: '123-456-7890'
  // };

  editMode = false;
  editablePhone: number | null = this.user?.number ?? null;
  ngOnInit() {
    this.getUser();
    this.getUserOrders();
  }

  getUser(): void {
    this.http.get<IUser>('/api/users/account', { withCredentials: true }).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        // this.errorMessage = 'Unable to fetch user profile';
        console.error('Error fetching user:', err);
      }
    });
  }
  getUserOrders(): void {
    this.http.get<IOrdersResponse>('/api/orders/account', { withCredentials: true }).subscribe({
      next: (data) => {this.orders = data.orders.slice().reverse();},
      error: (err) => {
        // this.errorMessage = 'Unable to fetch user orders';
        console.error(err);
      }
    });
  }
  toggleEdit() {
    this.editablePhone = this.user?.number ?? null;
    this.editMode = true;
  }
  savePhone() {
    if (this.user != null && this.editablePhone != null) {
      this.user.number = this.editablePhone ?? null;
    }
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
    this.editablePhone = this.user?.number ?? null;
  }
  goToOrderDetail(orderId: number | undefined) {
    if (orderId !== undefined && orderId !== null) {
      this.router.navigate(['/Order'], { queryParams: { id: orderId } });
    } else {
      console.warn('Order ID is missing');
    }
  }
  logout() {
    this.http.post('/api/users/account/logout', {}).subscribe({
      next: (res) => {
        // console.log('Logged out successfully', res);
        // Redirect to login or home page after logout
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Logout failed. Please try again.');
      }
    });
  }
  constructor(private http: HttpClient, private router: Router) { }

}