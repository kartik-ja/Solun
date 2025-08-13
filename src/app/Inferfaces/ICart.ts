import { IProduct } from "./IProduct";

export interface ICart {
  id: number,
  watches: IProduct[]
}
export interface CartPatchRequest {
  watches: number[]; // Array of product IDs
}