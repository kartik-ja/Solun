import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map, Observable, tap } from 'rxjs';
import { IProduct } from '../Inferfaces/IProduct';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  loaded = false;
  constructor(private client: HttpClient) 
  { }
  getProducts() : Observable<IProduct[]>
  {
    if (this.loaded) {
      return new Observable<IProduct[]>(observer => {
        const products = localStorage.getItem("products");
        if (products) {
          observer.next(JSON.parse(products));
        }
        this.loaded = true;
        observer.complete();
      });
    }
    return this.client.get<IProduct[]>("/api/watches", {withCredentials: true})
    .pipe(
      map(products => products.map(product => {
        product.description = product.description.replaceAll('—',', ');
        return product;
      })),
      tap(products => {
        localStorage.setItem("products", JSON.stringify(products));
      })
    );

  }
   getProduct(id:number) : Observable<IProduct>
  {
    return this.client.get<IProduct>(`/api/watches/${id}`, {withCredentials: true}).pipe(
      map(product=>{
        product.description = product.description.replaceAll('—',', ');
        return product;
      }),
    );
  }
}
