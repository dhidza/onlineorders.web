import { IOrderProduct } from './iorder-product';
import { ICountyModel } from './icounty-model';
import { IUserProfile } from './iuser-profile';

export interface IOrder {
    id: number;
    createdDisplay: string;   
    statusId: number;
    orderCode: string;
    orderCompanyProducts: IOrderProduct[];   
    deliveryAddress: string;
    deliveryPhone: string;
    totalProductDisplay: string;
    deliveryCountyId : number;
    deliveryCounty: ICountyModel;
    orderDeliveryFeeCents: number;
    orderDeliveryFeeDisplay: string;
    totalOrderDisplay: string;
    totalOrderCents: number;
    totalQuantity: number;
    userProfile: IUserProfile;
    isValidDeliveryDetails: boolean;
    eirCode: string;
}
