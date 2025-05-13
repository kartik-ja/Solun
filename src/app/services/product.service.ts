import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IProduct } from '../Inferfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private client: HttpClient) 
  { }
  getProducts() : Observable<IProduct[]>
  {
    return this.client.get<IProduct[]>("/api/watches");
  }
}
