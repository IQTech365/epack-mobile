export const billingByOptions:string[] = ['by Individual', 'by Company'];
export const approvalAuthorityOptions = [
  {
    label: 'HR Manager',
    value: '1',
  },
  {
    label: 'Concern Person',
    value: '2',
  },
  {
    label: 'C/O Corporate',
    value: '3',
  },
];

export enum FREIGHT_TYPE {
  LOAD_TYPE,
  PICKUP_CHARGES,
  DOOR_DELIVERY_CHARGE,
  PACKING_CHARGES,
  PACKING_MATERIAL_CHARGES,
  LOADING_CHARGES,
  UNLOADING_CHARGES,
  UNPACKING_CHARGES,
}

export const loadTypeOptions:string[] = ['Part Load', 'Full Load'];

const chargeOptions: string[] = [
  'Included',
  'Additional',
  'Not Required',
  'Loading By Party',
  'Unloading By Party',
];

export const pickupChargeOptions = chargeOptions.slice(0,3);
export const doorDeliveryChargeOptions = chargeOptions.slice(0,3);
export const loadingChargeOptions = chargeOptions.slice(0,4);
export const unloadingChargeOptions = chargeOptions.filter(e => e !== 'Loading By Party');

export const surchargeOptions = [
  {
    label: 'Not Applicable',
    value: '1',
  },
  {
    label: 'Applicable',
    value: '2',
  },
  {
    label: 'Extra',
    value: '3',
  },
];

export const surchargePercentOptions = [
  {
    label: '0%',
    value: '1',
  },
  {
    label: '10%',
    value: '2',
  },
  {
    label: '12%',
    value: '3',
  },
];

export const discountOptions:string[] = ['Discount @%', 'Flat Discount', 'Not Required'];

export const discountPercentOptions = [
  {
    label: '1%',
    value: '1',
  },
  {
    label: '2%',
    value: '2',
  },
  {
    label: '3%',
    value: '3',
  },
  {
    label: '4%',
    value: '4',
  },
  {
    label: '5%',
    value: '5',
  },
  {
    label: '6%',
    value: '6',
  },
  {
    label: '7%',
    value: '7',
  },
  {
    label: '8%',
    value: '8',
  },
  {
    label: '9%',
    value: '9',
  },
  {
    label: '10%',
    value: '10',
  },
  {
    label: '15%',
    value: '15',
  },
  {
    label: '20%',
    value: '20',
  },
  {
    label: '25%',
    value: '25',
  },
];

export const gstOptions:string[] = ['With GST', 'Without GST', 'Exempted', 'Reverse Charge Mechanism'];

export const gstPercentOptions = [
  {
    label: '0%',
    value: '1',
  },
  {
    label: '5%',
    value: '2',
  },
  {
    label: '12%',
    value: '3',
  },
  {
    label: '18%',
    value: '4',
  },
];

export const gstTypeOptions = [
  {
    label: 'CGST/SGST',
    value: '1',
  },
  {
    label: 'IGST',
    value: '2',
  },
];

export const gstPaidByOptions:string[] = ['Consignee', 'Consigner', 'Moving Company'];

export const transitInsuranceOptions:string[] = ['Required', 'Not Required'];

export const modeOfMovingOptions = [
  {
    label: 'By Surface',
    value: '1',
  },
  {
    label: 'By Air',
    value: '2',
  },
  {
    label: 'By Sea',
    value: '3',
  }
]
