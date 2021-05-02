export interface IStripeChargeResponse {
    message: string;
    paymentReference: string;
    orderCode: string;
    error: string;
    chargeState: PaymentIntentStateEnum;
}

export enum PaymentIntentStateEnum{
    Needs3DSecure,
    Success,
    Error
}
