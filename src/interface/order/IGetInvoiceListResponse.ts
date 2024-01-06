export interface IInvoice {}

export interface IGetInvoiceListResponse {
    data: IInvoice[];
    status: number;
    error: boolean;
}