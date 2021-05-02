export interface ILoginResponse {
    token: string;
    isVerified: boolean;
    success: boolean;
    message: string;
    statusCode: number;
    userKey: string;
}
