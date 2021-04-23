export interface IProductModel {    
    id: number;
    name: string;
    description : string;
    categoryId: number;
    price: number;
    isAvailable: boolean;
    displayPrice: string;
    bannerImageUrl: string;
    primaryImageUrl: string;
    extraImages: string[];
}
