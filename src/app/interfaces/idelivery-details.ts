export interface IDeliveryDetails {   
    countyId?: number;
    deliveryCounty?: string;
    deliveryAddress?: string;
    deliveryPhone?: string;    
    isValidDeliveryDetails: boolean;
    eirCode?:string;
    orderCode?: string;
}
