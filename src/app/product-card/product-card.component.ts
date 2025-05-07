import { Component, Input } from '@angular/core';
import { IProduct } from '../Inferfaces/IProduct';

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
  constructor() { 
    // this.product = {
    //   "id" : "1",
    //   "name": "Solun Drift",
    //   "description": "Light as air and clean as morning light. The Drift is your quiet companion — easy on the wrist, effortless with everything. Brushed steel finish with a matte ivory dial.",
    //   "price": 149,
    //   "image": "assets/images/Solun-3.png",
    //   "tags": ["minimal", "daily", "brushed-steel", "neutral"],
    //   "filters": {
    //     "strap": "leather",
    //     "dial_color": "ivory",
    //     "case_material": "brushed steel",
    //     "category": "Everyday"
    //   },
    //   "specs": {
    //     "case_diameter_mm": 38,
    //     "strap_material": "Italian leather",
    //     "water_resistance": "3ATM"
    //   }
    // }
  }
}
