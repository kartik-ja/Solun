import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { IProduct } from '../Inferfaces/IProduct';
export interface ISearchItem{
  route: number;
  product: IProduct;
  productProp: string;
  productValue: string;
}

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})

export class AppBarComponent implements OnInit{
    searchTerm: string = '';
    cartItemCount: number = 0;
      searchResults: ISearchItem[] = [];
  showResults: boolean = false;
  products: IProduct[] = [];
   showSidebar = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  onOverlayClick() {
    this.showSidebar = false;
  }

  // @Input() router!: Router;
  GoToHome()
  {
    this.router.navigate(["/"]);
  }
  GoToEverydayCollection() {
    this.router.navigate(['/Products'], {
      queryParams: { filter: 'Everyday' }
    });
  }
  GoToClassicsCollection()
  {
    this.router.navigate(['/Products'], {
      queryParams: { filter: 'Classic' }
    });
  }
  GoToElementsCollection()
  {
    this.router.navigate(['/Products'], {
      queryParams: { filter: 'Elements' }
    });
  }

private matchProductsByAllProperties(products: IProduct[]): ISearchItem[] {
  const matches: ISearchItem[] = [];
  const searchTermLower = this.searchTerm.toLowerCase();

  for (let i = products.length - 1; i >= 0; i--) {
    const product = products[i];
    // Get all string properties of product
    const stringProps = Object.entries(product)
      .filter(([key, value]) => typeof value === 'string' && key !== 'id' && key !== 'image') as [keyof IProduct, string][];

    // Find first matching property
    const matchedProp = stringProps.find(([key, value]) => value.toLowerCase().includes(searchTermLower));

    if (matchedProp) {
      const [matchedKey, matchedValue] = matchedProp;
      matches.push({
        route: product.id,
        product: product,
        productProp: matchedKey as string,
        productValue: matchedValue
      });
      products.splice(i, 1);
    }
  }
  return matches;
}

onSearch() {
  // Navigate to search results or filter existing list
  if (!this.searchTerm) {
    return;
  }
  if (this.products.length === 0) {
    this.products = JSON.parse(localStorage.getItem("products") || "[]") as IProduct[]; // Assuming products are stored in localStorage
  }
  var copy = this.products.map(p => ({ ...p })); // Create a shallow copy of products
  this.searchResults = this.matchProductsByAllProperties(copy);
this.showResults = true;
}
  onResultClick(route: number) {
    this.showResults = false;
    this.searchTerm = ""
    // Do whatever you want with route, e.g. navigate
    this.router.navigate(['/Product'], { queryParams: { id: route } });
    // For example:
    // this.router.navigate(['/route-path', route]);
  }

  // Hide results on blur, with slight delay to allow click event to register
  onBlur() {
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  // Highlight matched substring in productValue
  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    const regex = new RegExp(`(${this.escapeRegExp(this.searchTerm)})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }

  escapeRegExp(text: string) {
    return text.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
  }
  GoToCart()
  {
    this.router.navigate(['/Cart']);
  }
  GoToProfile()
  {
    this.router.navigate(['/Profile']);
  }
  ngOnInit(): void {
    this.cartService.updatedCartCount.subscribe(count => {
      this.cartItemCount = count;
    });
  }
  constructor(private router: Router, private cartService: CartService)
  {
    // router.navigate(["/"]);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if click target is inside your search container
    const target = event.target as HTMLElement;
    const searchContainer = document.querySelector('.search-container');

    if (searchContainer && !searchContainer.contains(target)) {
      // Click outside the search container
      this.showResults = false;
    }
  }
}
