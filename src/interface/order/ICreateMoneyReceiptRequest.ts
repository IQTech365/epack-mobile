export interface ICreateMoneyReceiptRequest {
  companyId: string;
  orderId: string;
  isAuto: boolean;
  isHeadOffice: boolean;
  receiptNumber: string;
  receiptDate: string;
  arivalDate: string;
  templateId: string;
  receiptAgainst: string;
  billNumber: string;
  quotationNumber: string;
  consignmentNumber: string;
  numbersOfArticles: string;
  paymentMode: string;
  paymentType: string;
  paymentAmount: string;
  referenceNumber: string;
  status: string;
  addedBy: string;
}
