import {EChargeStatus} from '../addQuotation/quotationReducer';

export const getStatusValue = (key: string): string => {
  if (key == '1') {
    return EChargeStatus.ADDITIONAL;
  } else if (key == '2') {
    return EChargeStatus.INCLUDED;
  }
  return EChargeStatus.NOT_REQUIRED;
};
