interface IAddQuotationData {
  _id: string
  //
}

export interface IAddQuotationResponse {
  data: IAddQuotationData;
  status: number;
  error: boolean;
}
