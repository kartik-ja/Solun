import { IOrder } from "./IOrder";

export interface IPurchaseOrderResponse {
  order?: IOrder;
  userFound: boolean;
  success: boolean;
  message: string;
  watchIdsNotFound: number[];
  allWatchesFound: boolean;
  allWatchesAvailable: boolean;
}
