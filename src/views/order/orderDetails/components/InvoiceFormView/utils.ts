export const billingByOptions:string[] = ['By Individual', 'By Company'];
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
