export interface IWatchOrder {
  price: number; // The price of the watch
  watchId: number; // The ID of the watch being purchased
  discountCode?: string; // The discount code applied to the watch order
  discountPrice?: number; // The price after applying the discount
}

export interface IPurchaseOrder {
  watches?: IWatchOrder[]; 
  currency: string;
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  notes: string;
}