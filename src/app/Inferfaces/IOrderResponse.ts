import { IOrder } from "./IOrder";
import { IProduct } from "./IProduct";

export interface IOrdersResponse {
  orders: IOrder[];
  userFound: boolean;
}
export interface IOrderResponse {
  order: IOrder;
  userFound: boolean;
}