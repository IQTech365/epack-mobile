import {EChargeStatus} from '../addQuotation/quotationReducer';

export const getStatusValue = (key: string): string => {
  if (key == '1') {
    return EChargeStatus.ADDITIONAL;
  } else if (key == '2') {
    return EChargeStatus.INCLUDED;
  }
  return EChargeStatus.NOT_REQUIRED;
};

export const chargeOptions: string[] = [
  'Included',
  'Additional',
  'Not Required',
  'Loading by Party',
  'Unloading by Party',
];

export const discountTypeOptions: string[] = [
  'Discount @%',
  'Flat Discount',
  'Not Required',
];

export const GSTOptions:string[] = ['With GST', 'Without GST', 'Exempted', 'Extra'];

export const loadTypeOptions:string[] = ['Part Load', 'Full Load'];

export const yesNoOptions:string[] = ['Yes', 'No'];
