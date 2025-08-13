import { Component } from '@angular/core';
import { IOrder } from '../Inferfaces/IOrder';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IOrderResponse, IOrdersResponse } from '../Inferfaces/IOrderResponse';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  order: IOrder | null = null
  id: number = 0;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.http.get<IOrderResponse>(`/api/orders/${this.id}`).subscribe(
          (data) => {
            this.order = data.order;
            data.order.createdAt = new Date(data.order.createdAt + "z");
          },
          (error) => {
            console.error('Error fetching order:', error);
          }
        );
      }
    });
  }
}
