import { IProductModel } from './iproduct-model';

export interface ICompanyProductModel {
    id: number;
    batchNumber: string;
    price: number;
    product: IProductModel;
    companyId: number;
}
