// Quotation Template Request Payload
export interface IHtmlTemplateRequest {
  templateId: string;
  quotationId: string;
  biltyCopyType?: string;
  companyId?: string;
}

// Money Receipt Template Request Payload
export interface IHtmlMoneyReceiptTemplateRequest {
  templateId: string;
  moneyReceiptId: string;
}

// Bilty Template Request Payload
export interface IHtmlBiltyTemplateRequest {
  templateId: string;
  biltyId: string;
  biltyCopyType: string;
  companyId: string;
}

// Car Condition Template Request Payload
export interface IHtmlCarConditionTemplateRequest {
  templateId: string;
  carConditionId: string;
}

// Invoice Template Request Payload
export interface IHtmlInvoiceTemplateRequest {
  templateId: string;
  invoiceId: string;
}

export interface IHtmlTemplateResponse {
  html: any;
}
