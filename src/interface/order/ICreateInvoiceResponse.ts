interface IInvoice {
  //
}

export interface ICreateInvoiceResponse {
  data: IInvoice;
  status: number;
  error: boolean;
}
