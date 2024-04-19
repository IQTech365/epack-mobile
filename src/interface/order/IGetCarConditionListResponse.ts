export interface IAccessory {
  id: string;
  accessoryName: string;
  present: string;
}

export interface ICardConditionData {
  _id: string;
  companyId: string;
  orderId: string;
  templateId: string;
  carConditionNumber: string;
  dateOfCarCondition: string;
  vehicleType: string;
  manufacturer: string;
  model: string;
  yearOfManufacturing: string;
  color: string;
  vehicleRegistrationNumber: string;
  vehicleCoveredDistanceInKM: string;
  vehicleValue: string;
  insurancePolicyNumber: string;
  insuranceCompany: string;
  biltyNo: string;
  chasisNumber: string;
  engineNumber: string;
  batteryNumber: string;
  tyreNumber: string;
  anyOtherAccessorie: string;
  scratches: string;
  dent: string;
  visibleObservation: string;
  remarks: string;
  vehicleAccessories: IAccessory[];
  addedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface IGetCarConditionListResponse {
  data: ICardConditionData[];
  status: number;
  error: boolean;
}
