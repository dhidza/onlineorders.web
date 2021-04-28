export interface IResetRequest {
    username: string;
    newPassword: string; 
    confirmNewPassword: string;
    passwordToken: string;
}