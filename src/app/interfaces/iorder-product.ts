import { IProductModel } from './iproduct-model';
import { ICompanyProductModel } from './icompany-product-model';

export interface IOrderProduct {
    id: number;
    batchNumber: string;
    companyProduct: ICompanyProductModel;   
    orderId:  number; 
    orderCode?: string;
    companyProductId: number; 
    quantity: number; 
    price: number; 
    total : number;   
    displayTotal: string;   
}
