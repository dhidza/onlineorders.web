export interface IRegisterModel {
    emailAddress: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    phone: string;
    countryId: number;
    countyId?:number;
    membershipId?: string;
    fullname?:string;
    dateOfBirth?: string;
}
