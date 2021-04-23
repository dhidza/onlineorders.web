export class CrudResponse<T> {
    success: boolean;
    message: string;
    returnValue: T;
}
