import { ICreateBiltyRequest } from "./ICreateBiltyRequest";

export interface IVehicle {
  invoiceNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  shiftingFrom: string;
  shiftingTo: string;
  sealNumber: string;
  inDate: string;
  outDate: string;
  transitDays: string;
  expectedDateOfDelivery: string;
}

export interface IDriver {
  name: string;
  mobile: string;
  licenceNo: string;
  aadharNo: string;
  aadharFront: string;
  aadharBack: string;
  driverLicence: string;
  driverName: string;
  driverPhoto: string;
  currentAddress: IDriverCurrentAdd;
  permanentAddress:IDriverParmanentAdd
}

export interface IDriverCurrentAdd {
  city: string;
  address: string;
}

export interface IDriverParmanentAdd {
  city: string;
  address: string;
}

export interface IEWayBill {
  number: string;
  generationDate: string;
  expiryDate: string;
}

export interface IMaterial {
  name: string;
  noOfArticles: string;
  packingType: string;
  HSNCode: string;
  billNumber: string;
  actualWeight: string;
  applicableWeight: string;
  unit: string;
  valueOfGoods: string;
}

export interface IInsurance {
  companyName: string;
  policyNumber: string;
  date: string;
  amount: string;
}

export interface IDemurrage {
  charge: string;
  rate: string;
  chargeAfterApplicable: string;
}

export interface IFreightDetail {
  freightCharges: string;
  billingStatus: string;
  totalAmount: string;
  advanceAmount: string;
  balanceAmount: string;
}

export interface ICharge {
  status: string;
  charge: string;
}

export interface IBiltyFreight {
  _id: string;
  biltyId: string;
  freightDetails: IFreightDetail;
  pickupCharges: ICharge;
  doorDeliveryCharges: ICharge;
  unLoadingCharges: ICharge;
  packingMaterialCharges: string;
  loadingCharges: ICharge;
  packingCharges: string;
  unPackingCharges: string;
  updatedAt: string;
  createdAt: string;
}

export interface IClient {
  name: string;
  mobile: string;
  gstin: string;
  street: string;
  state: string;
  landmark: string;
  city: string;
  district: string;
  postOffice: string;
  postalCode: string;
  country: string;
}

export interface IAddress {
  address: string;
  state: string;
  landmark: string;
  city: string;
  district: string;
  postOffice: string;
  postalCode: string;
  country: string;
}

export interface IBiltyConsigners {
  name: string;
  mobile: string;
  gstin: string;
  street: string;
  state: string;
  landmark: string;
  city: string;
  district: string;
  postOffice: string;
  postalCode: string;
  country: string;
}

export interface IBilty {
  _id: string;
  companyId: string;
  enquiryId: string;
  biltyNumber: string;
  biltyDate: string;
  vehicle: IVehicle;
  loadingAddress: IAddress;
  unloadingAddress: IAddress;
  driver: IDriver;
  eWayBill: IEWayBill;
  addMaterialsStatus: string;
  materialsType: string;
  materials: IMaterial[];
  riskType: string;
  liabilityOfTax: string;
  insuranceStatus: string;
  insurance: IInsurance;
  demurrage: IDemurrage;
  remarks: string;
  remarksAtPOD: string;
  addedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
  freightDetails: IFreightDetail;
  pickupCharges: ICharge;
  doorDeliveryCharges:ICharge;
  packingCharges: ICharge;
  packingMaterialCharges: ICharge;
  unPackingCharges: ICharge;
  loadingCharges: ICharge;
  unLoadingCharges: ICharge;
  consigner: IBiltyConsigners;
  consignee: IBiltyConsigners;
}

export interface IUpdateBiltyPayload {
  id: string;
  payload: ICreateBiltyRequest;
}

export interface IGetBiltyListResponse {
  data: IBilty[];
  status: number;
  error: boolean;
}
