export enum FREIGHT_TYPE {
  LOAD_TYPE,
  PACKING_CHARGE,
  PACKING_MATERIAL_CHARGE,
  LOADING_CHARGE,
  UNLOADING_CHARGE,
  UNPACKING_CHARGE,
}
export type TItem = {
  label: string;
  value: string;
}
export const loadOptions: string[] = ['Part Load', 'Full Load'];
export const loadOptions2: string[] = ['In Sharing', 'Separate'];
export const options: string[] = ['Included', 'Additional', 'Not Required'];
export const loadingChargeOptions: string[] = [...options, 'Loading by Party'];
export const unloadingChargeOptions: string[] = [
  ...options,
  'Unloading by Party',
];
export const discountInQuotationOptions: TItem[] = [
  {label: 'Discount @%', value: 'Percentage'},
  {label: 'Flat Discount', value: 'Flat Discount'},
  {label: 'Not Required', value: 'Not Required'},
];
export const gstInQuotationOptions: string[] = [
  'With GST',
  'Without GST',
  'Exempted',
  'Extra',
];
export const options2: string[] = ['Required', 'Not Required'];
export const particularOptions: string[] = [
  'Stationary Charge',
  'Octroi Green Tax',
  'Toll Tax Charges',
  'Miscellaneous Charges',
  'Electrical Work',
  'Cleaning Work',
];
