import { IOrder } from './iorder';
import { IOrderProduct } from './iorder-product';

export interface CartDialogData {
    order: IOrder;
    orderProduct: IOrderProduct;
    success: boolean;
}
