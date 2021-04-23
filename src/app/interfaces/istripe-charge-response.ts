export interface IStripeChargeResponse {
    message: string;
    paymentReference: string;
    orderCode: string;
    error: string;
}
