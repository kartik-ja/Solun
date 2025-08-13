import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICart } from '../Inferfaces/ICart';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../Inferfaces/IProduct';
import { Router } from '@angular/router';
import { IPurchaseOrderResponse } from '../Inferfaces/IPurchaseOrderResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  localAddingItem: string = "AddItemToCart";
  localRemoveItem: string = "RemoveItemFromCart";
  localcart: string = "localcart";
  private cartSubject: BehaviorSubject<ICart | null> = new BehaviorSubject<ICart | null>(null);
  private updatedCartCountSubject = new BehaviorSubject<number>(0);
  public Cart: Observable<ICart | null> = this.cartSubject.asObservable();
  public updatedCartCount = this.updatedCartCountSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    this.cartSubject.subscribe(cart => {
      this.updatedCartCountSubject.next(cart?.watches.length ?? 0);
    });
    this.http.get(`/api/users/account/status`, { withCredentials: true }).subscribe({
      next: () => {
        this.http.get<ICart>('/api/Carts/account', { withCredentials: true }).subscribe({
          next: (data) => {
            this.cartSubject.next(data);
            this.updateLocalCart(data);
          },
          error: (err) => {
            this.cartSubject.next(this.createLocalCart());
          }
        });
      },
      error: () => {
        this.cartSubject.next(this.createLocalCart());
      }
    });
  }
  private createLocalCart(): ICart {
    var localCart = this.getLocalCart();
    if (localCart == null || localCart == undefined || localCart.watches == null || localCart.watches == undefined) {
      localCart = { id: 0, watches: [] as IProduct[] };
    }
    const addedItems = JSON.parse(localStorage.getItem(this.localAddingItem) || '[]') as IProduct[] ?? [];
    localCart.watches.push(...addedItems);
    const removeItems = JSON.parse(localStorage.getItem(this.localRemoveItem) || '[]') as IProduct[] ?? [];
    const remainingWatches = [...(localCart.watches ?? [])];

    for (const removeItem of removeItems) {
      const index = remainingWatches.findIndex(item => item.id === removeItem.id);
      if (index !== -1) {
        remainingWatches.splice(index, 1); // remove exactly one occurrence
      }
    }

    localCart.watches = remainingWatches;
    return localCart;
  }

  private getLocalCart(): ICart | null {
    const localCartFromStorge = JSON.parse(localStorage.getItem(this.localcart) || JSON.stringify('{id: 0, watches: []}')) as ICart;
    return localCartFromStorge ? localCartFromStorge : null;
  }
  private updateLocalCart(cart: ICart): void {
    localStorage.setItem(this.localcart, JSON.stringify(cart));
  }
  private UpdateOnlineCart(): Observable<any> {
    return new Observable((observer) => {
      this.http.get<ICart>('/api/Carts/account', { withCredentials: true }).subscribe({
        next: (data) => {
          var localCart = data;
          localCart.watches = this.getLocalCart()?.watches ?? [];
          const addedItems = JSON.parse(localStorage.getItem(this.localAddingItem) || '[]') as IProduct[];
          localCart.watches = [...localCart.watches, ...addedItems];
          const removeItems = JSON.parse(localStorage.getItem(this.localRemoveItem) || '[]') as IProduct[];
          localCart.watches = localCart.watches.filter(item => !removeItems.some(removeItem => removeItem.id === item.id));
          const updatedPayload = {
            currentWatchIds: localCart.watches.map(p => p.id)
          };
          //console.log('Updating online cart with payload:', updatedPayload);
          // const payload: CartPatchRequest = { watches: updatedIds };
          this.http.patch(`/api/carts`, updatedPayload, { withCredentials: true }
          ).subscribe({
            next: () => {
              localStorage.setItem(this.localAddingItem, JSON.stringify([]));
              localStorage.setItem(this.localRemoveItem, JSON.stringify([]));
              if (localCart) {
                this.updateLocalCart(localCart);
              }
              observer.next("");
              observer.complete();
            }
            ,
            error: (err) => {
              observer.next("");
              observer.complete();
            }
          });
        },
        error: (err) => {
          observer.next("");
          observer.complete();
        }
      });
    });
  }

  private addToLocalStorage(id: IProduct): void {
    const localStorageAddItems = JSON.parse(localStorage.getItem(this.localAddingItem) || '[]');
    localStorageAddItems.push(id);
    localStorage.setItem(this.localAddingItem, JSON.stringify(localStorageAddItems));
  }
  public addToCart(product: IProduct): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`/api/users/account/status`, { withCredentials: true }).subscribe({
        next: () => {
          this.UpdateOnlineCart()
            .subscribe({
              complete: () => {
                this.http.post(`/api/Carts/account`, null, {
                  params: new HttpParams().set('watchId', product.id),
                  withCredentials: true
                }).subscribe({
                  next: () => {
                    (this.cartSubject.value ?? { id: 0, watches: [] }).watches.push(product);
                    this.updateLocalCart(this.cartSubject.value ?? { id: 0, watches: [] });
                    this.cartSubject.next(this.createLocalCart());
                    observer.next("");
                    observer.complete();
                  },
                  error: () => {
                    this.addToLocalStorage(product);
                    this.cartSubject.next(this.createLocalCart());
                    observer.next("");
                    observer.complete();
                  }
                });
              }
            });
        },
        error: () => {
          this.addToLocalStorage(product);
          this.cartSubject.next(this.createLocalCart());
          observer.next("");
          observer.complete();
        }
      });

    });
  }
  private loadCart(): void {
    this.http.get<ICart>('/api/Carts/account', { withCredentials: true }).subscribe({
      next: (data) => {
        this.cartSubject.next(data);
      },
      error: (err) => {
        // this.errorMessage = 'Failed to load cart';
      }
    });
  }
  private RemoveToLocalStorage(product: IProduct): void {
    const localStorageRemoveItems = JSON.parse(localStorage.getItem(this.localRemoveItem) || '[]');
    localStorageRemoveItems.push(product);
    localStorage.setItem(this.localRemoveItem, JSON.stringify(localStorageRemoveItems));
  }
  public removeItem(product: IProduct): void {
    if (!this.cartSubject.value) return;
    this.http.get(`/api/users/account/status`, { withCredentials: true }).subscribe({
      next: () => {
        this.UpdateOnlineCart().subscribe({
          complete: () => {
            //console.log('Removing item:', product);
            //console.log('Current cart:', this.cartSubject.value);
            if (this.cartSubject.value == null) return;
            const cartIds = [...this.cartSubject.value.watches.map(p => p.id)]; // copy array
            const index = cartIds.findIndex(id => id === product.id);
            if (index != -1)
            {
              cartIds.splice(index, 1);
            }
            const updatedPayload = {
              currentWatchIds: cartIds
            };
            //console.log('Removing item with payload:', updatedPayload);

            this.http.patch(`/api/carts`, updatedPayload, { withCredentials: true }
            ).subscribe({
              next: () => this.loadCart(),
              error: (err) => {
                this.RemoveToLocalStorage(product);
                this.cartSubject.next(this.createLocalCart());
              }
            });
          }
        });
      },
      error: () => {
        this.RemoveToLocalStorage(product);
        this.cartSubject.next(this.createLocalCart());
      }
    });
  }
  public ClearCart() {
    const clearCartPayload = { currentWatchIds: [] };

    this.http.patch(`/api/carts`, clearCartPayload).subscribe({
      next: () => {
        // Reload the cart from the server
        this.loadCart();
      },
      error: err => {
      }
    });
  }
  public purchase(cart: ICart | null) {
    if (cart == null) {
      return;
    }
    this.router.navigate(['/checkout'], {
      state: { cart: cart }
    });
  }
}
