export interface IAccessory {
  accessoryName: string;
  present: boolean;
}

export interface ICreateCarConditionRequest {
  companyId?: string;
  orderId?: string;
  isAuto: boolean;
  isHeadOffice: boolean;
  carConditionNumber: string;
  dateOfCarCondition: string;
  biltyNo: string;
  vehicleType: string;
  manufacturer: string;
  model: string;
  yearOfManufacturing: string;
  color: string;
  vehicleAccessories: IAccessory[];
  vehicleRegistrationNumber: string;
  vehicleCoveredDistanceInKM: string;
  vehicleValue: string;
  insurancePolicyNumber: string;
  insuranceCompany: string;
  chasisNumber: string;
  engineNumber: string;
  batteryNumber: string;
  tyreNumber: string;
  anyOtherAccessorie: string;
  scratches: string;
  dent: string;
  visibleObservation: string;
  remarks: string;
  addedBy?: string;
}
