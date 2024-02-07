import modeOfPaymentOptions from '../../../../../data/modeOfPaymentOptions.json';
import receiptAgainstOptions from '../../../../../data/receiptAgainstOptions.json';
import paymentTypeOptions from '../../../../../data/paymentTypeOptions.json';
import moment from 'moment';
//** ALL ACTIONS*/

export enum MONEYRECEIPT_FORM_ACTION {
  RECEIPT_NO = 'RECEIPT_NO',
  RECEIPT_DATE = 'RECEIPT_DATE',
  MONEY_RECEIPT_DESIGNS = 'MONEY_RECEIPT_DESIGNS',
  PAYMENT_TYPE = 'PAYMENT_TYPE',
  RECEIPT_AGAINST = 'RECEIPT_AGAINST ',
  BILL_QUOTATION_NO = 'BILL_QUOTATION_NO ',
  MODE_OF_PAYMENTS = 'MODE_OF_PAYMENTS',
  REF_NO = 'REF_NO',
  ENTER_AMOUNT = 'ENTER_AMOUNT',
  CN_BILTY_LR_NO = 'CN_BILTY_LR_NO',
  NO_OF_ARTICLES = 'NO_OF_ARTICLES',
  DATE_OF_ARRIVAL = 'DATE_OF_ARRIVAL',
}

/** MONEY RECEIPT FORM STATE */

interface IMoneyReceiptFormState {
  receiptNumber: string;
  receiptDate: string;
  moneyReceiptDesigns: string;
  paymentType: string;
  receiptAgainst: string;
  billQuotationNo: string;
  paymentMode: string;
  referenceNumber: string;
  paymentAmount: string;
  cnBiltyLrNo: string;
  numbersOfArticles: string;
  arivalDate: string;
}

/** ACTION INTERFACE */

interface IMoneyReceiptFormAction {
  type: MONEYRECEIPT_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */

export const initialState: IMoneyReceiptFormState = {
  receiptNumber: '',
  receiptDate: moment().toISOString(),
  moneyReceiptDesigns: '',
  paymentType: paymentTypeOptions[0].label,
  receiptAgainst: receiptAgainstOptions[0].label,
  billQuotationNo: '',
  paymentMode: modeOfPaymentOptions[0].label,
  referenceNumber: '',
  paymentAmount: '',
  cnBiltyLrNo: '',
  numbersOfArticles: '',
  arivalDate: moment().toISOString(),
};

/** AddOrder Reducer */

export const moneyReceiptReducer = (
  state: IMoneyReceiptFormState,
  action: IMoneyReceiptFormAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case MONEYRECEIPT_FORM_ACTION.RECEIPT_NO:
      return {...state, receiptNumber: payload};
    case MONEYRECEIPT_FORM_ACTION.RECEIPT_DATE:
      return {...state, receiptDate: payload};
    case MONEYRECEIPT_FORM_ACTION.MONEY_RECEIPT_DESIGNS:
      return {...state, moneyReceiptDesigns: payload};
    case MONEYRECEIPT_FORM_ACTION.PAYMENT_TYPE:
      return {...state, paymentType: payload};
    case MONEYRECEIPT_FORM_ACTION.RECEIPT_AGAINST:
      return {...state, receiptAgainst: payload};
    case MONEYRECEIPT_FORM_ACTION.BILL_QUOTATION_NO:
      return {...state, billQuotationNo: payload};
    case MONEYRECEIPT_FORM_ACTION.MODE_OF_PAYMENTS:
      return {...state, paymentMode: payload};
    case MONEYRECEIPT_FORM_ACTION.REF_NO:
      return {...state, referenceNumber: payload};
    case MONEYRECEIPT_FORM_ACTION.ENTER_AMOUNT:
      return {...state, paymentAmount: payload};
    case MONEYRECEIPT_FORM_ACTION.CN_BILTY_LR_NO:
      return {...state, cnBiltyLrNo: payload};
    case MONEYRECEIPT_FORM_ACTION.NO_OF_ARTICLES:
      return {...state, numbersOfArticles: payload};
    case MONEYRECEIPT_FORM_ACTION.DATE_OF_ARRIVAL:
      return {...state, arivalDate: payload};
    default:
      return state;
  }
};
