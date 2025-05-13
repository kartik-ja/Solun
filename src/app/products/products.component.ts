import { Component } from '@angular/core';
import { IProduct } from '../Inferfaces/IProduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: IProduct[] = [];
  filtedProducts: IProduct[] = [];
  filter : string = "";
  params : any;
  filterProducts()
  {
    this.filter = this.params['filter'] ?? '';
    this.filtedProducts = this.products.filter(product=>product.category == this.filter);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.filterProducts();
    });
    this.productService.getProducts().subscribe((products)=>{
      this.products = products;
      console.log(this.products);
      this.filterProducts();
    })
  }
  constructor(private router: Router, 
    private route: ActivatedRoute ,
    private productService: ProductService
  ) {

    /*this.products =[
      {
        "id": 10,
        "name": "Solun Halo",
        "description": "A subtle glow, a circle of calm. Halo blends a golden bezel with a frosted dial, capturing a warm tone without the shine.",
        "price": 179,
        "image": "assets/images/Solun-2.png",
        "category": "Everyday",
        "strap": "leather",
        "dial_color": "frosted white",
        "case_material": "gold-plated",
        "case_diameter_mm": 40,
        "strap_material": "vegan leather",
        "water_resistance": "5ATM"
      },
      {
        "id": 14,
        "name": "Solun Terra",
        "description": "Inspired by stillness and soil. Terra brings earth tones to a minimalist face, finished with a hand-stitched suede strap.",
        "price": 179,
        "image": "assets/images/Solun-1.png",
        "category": "Elements",
        "strap": "suede",
        "dial_color": "beige",
        "case_material": "matte steel",
        "case_diameter_mm": 38,
        "strap_material": "suede leather",
        "water_resistance": "3ATM"
      },
      {
        "id": 12,
        "name": "Solun Lune",
        "description": "Gracefully balanced and endlessly wearable. Lune carries a lunar-inspired glow in its polished rose-gold case and moon-dial markers.",
        "price": 199,
        "image": "assets/images/Solun-4.png",
        "category": "Classic",
        "strap": "mesh",
        "dial_color": "pearl",
        "case_material": "rose-gold",
        "case_diameter_mm": 36,
        "strap_material": "rose-gold mesh",
        "water_resistance": "5ATM"
      },
      {
        "id": 9,
        "name": "Solun Drift",
        "description": "Light as air and clean as morning light. The Drift is your quiet companion — easy on the wrist, effortless with everything. Brushed steel finish with a matte ivory dial.",
        "price": 149,
        "image": "assets/images/Solun-1.png",
        "category": "Everyday",
        "strap": "leather",
        "dial_color": "ivory",
        "case_material": "brushed steel",
        "case_diameter_mm": 38,
        "strap_material": "Italian leather",
        "water_resistance": "3ATM"
      },
      {
        "id": 13,
        "name": "Solun Aeon",
        "description": "Bold yet restrained. Aeon has a weight to it—both in feel and in presence. A deep black dial, silver frame, and clean numerals give it enduring character.",
        "price": 189,
        "image": "assets/images/Solun-5.png",
        "category": "Classic",
        "strap": "leather",
        "dial_color": "black",
        "case_material": "stainless steel",
        "case_diameter_mm": 42,
        "strap_material": "cowhide leather",
        "water_resistance": "5ATM"
      },
      {
        "id": 15,
        "name": "Solun Tide",
        "description": "The cool gradient of early sea light. Tide flows from soft blue to pale silver, wrapped in a smooth marine leather strap.",
        "price": 189,
        "image": "assets/images/Solun-2.png",
        "category": "Elements",
        "strap": "leather",
        "dial_color": "blue gradient",
        "case_material": "brushed silver",
        "case_diameter_mm": 40,
        "strap_material": "marine-grade leather",
        "water_resistance": "5ATM"
      },
      {
        "id": 11,
        "name": "Solun Ember",
        "description": "A quiet burn beneath a matte copper case. Ember is for those who glow without trying. Understated, warm, and always grounded.",
        "price": 169,
        "image": "assets/images/Solun-3.png",
        "category": "Everyday",
        "strap": "leather",
        "dial_color": "tan",
        "case_material": "copper",
        "case_diameter_mm": 39,
        "strap_material": "full-grain leather",
        "water_resistance": "3ATM"
      }
    ]*/
  }
}
