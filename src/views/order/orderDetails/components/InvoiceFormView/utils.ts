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
