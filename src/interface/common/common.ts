export interface IPackingType {
  _id: string;
  packingType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: 0;
}
export interface IPackingTypeResponse {
  data: IPackingType[];
  status: number;
  error: boolean;
}

export interface IVehicleSize {}
export interface IVehicleSizeResponse {
  data: IVehicleSize[];
  status: number;
  error: boolean;
}

export interface IUnit {}
export interface IUnitResponse {
  data: IUnit[];
  status: number;
  error: boolean;
}

// Vehicle Company
export interface IVehicleCompany {
  _id: string;
  vehicleCompanyName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  vehicletypes: string;
  vehicletypesid: string;
}
export interface IVehicleCompanyResponse {
  data: IVehicleCompany[];
  status: number;
  error: boolean;
}

// Vehicle Color
export interface IVehicleColor {
  _id: string;
  vehicleColorName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleColorResponse {
  data: IVehicleColor[];
  status: number;
  error: boolean;
}

// Vehicle Accessories
export interface IVehicleAccessory {
  _id: string;
  vehicleType: string;
  vehicleAccessory: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleAccessoryResponse {
  data: IVehicleAccessory[];
  status: number;
  error: boolean;
}

// Vehicle Model
export interface IVehicleModel {
  _id: string;
  vehicleType: string;
  vehicleCompanyName: string;
  vehicleModel: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleModelResponse {
  data: IVehicleModel[];
  status: number;
  error: boolean;
}

// Vehicle Type
export interface IVehicleType {
  _id: string;
  vehicleType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleTypesResponse {
  data: IVehicleType[];
  status: number;
  error: boolean;
}

// Sub Module
export interface ISubmodule {
  _id: string;
  moduleId: string;
  subModuleName: string;
  availableOnDocument: boolean;
  isActive: boolean;
  isDeleted: boolean;
  moduleName: string;
}

export interface ISubmoduleResponse {
  data: ISubmodule[];
  status: number;
  error: boolean;
}

// App Settings
export interface ISerialNo {
  _id: string;
  moduleId: string;
  subModuleName: string;
  availableOnDocument: boolean;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: 0;
}

export interface ISubmodule2 {
  _id: string;
  moduleId: string;
  subModuleName: string;
  availableOnDocument: boolean;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: 0;
}

export interface IAppSetting {
  _id: string;
  companyId: string;
  companyEntity: string;
  entityId: string;
  subModuleId: string;
  moduleName: string;
  prefix: string;
  initialValue: string;
  isActive: boolean;
  isDeleted: boolean;
  __v: number;
  submodules: ISubmodule2[];
}

export interface IAppSettingResponse {
  data: IAppSetting[];
  status: number;
  error: boolean;
}

export interface ICustomersRequest {
  companyId: string;
  searchKey: string;
}

export interface ICustomerAddress {
  shiftingFrom: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  locality: string;
  landmark: string;
  floor: string;
  isLiftAvailable: string;
}

export interface ICustomerBillingInfo {
  companyName: string;
  approvalAuthority: string;
  authorityPersonName: string;
  authorityPersonMobile: string;
  companyAddress: string;
  companyGST: string;
  employeeName: string;
  employeeDesignation: string;
  employeeMobile: string;
  companyPincode: string;
  companyState: string;
  companyCity: string;
}

export interface ICustomer {
  _id: string;
  partyName: string;
  __v: number;
  billingBy: string;
  billingDetails: string | ICustomerBillingInfo;
  branchId: string;
  companyId: string;
  createdAt: string;
  isActive: boolean;
  isDeleted: boolean;
  mobile: string;
  pickupAddress: ICustomerAddress;
}

export interface ICustomersResponse {
  data: ICustomer[];
  status: number;
  error: boolean;
}

export interface IBanner {
  _id: string;
  title: string;
  bannerImage: string;
  fromDate: string;
  toDate: string;
  createdBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}

export interface IBannerListResponse {
  data: IBanner[];
  status: number;
  error: boolean;
}

// Dashboard content
export interface IDashboardData {
  newEnquiry: number;
  newOrder: number;
  deliveredOrder: number;
  totalCustomer: number;
  todaySurvey: number;
  todayFollowup: number;
}

// Dashbaord Payload
export interface IDashboardPaylod {
  companyId: string;
}

export interface IDashboardDataResponse {
  data: IDashboardData;
  status: number;
  error: boolean;
}

// Insurance Percentage
export interface IInsurancePercentage {
  _id: string;
  insurancePercentage: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}

export interface IInsurancePercentageResponse {
  data: IInsurancePercentage[];
  status: number;
  error: boolean;
}

// Floors
export interface IFloor {
  _id: string;
  floor: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}

export interface IFloorResponse {
  data: IFloor[];
  status: number;
  error: boolean;
}

export interface IPendingPurchase {
  _id: string;
  subscriptionId: string;
  authId: string;
  purchaseOrderId: string;
  subscriptionPlan: string;
  expiryDate: string;
  amountPaid: string;
  discountAmount: string;
  couponCode: string;
  status: string;
  createdDate: string;
  __v: number;
}

// Pending Registration
export interface IPendingRegistration {
  _id: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  otp: string;
  verifyOtpStatus: boolean;
  userType: string;
  createdAt: string;
  __v: number;
  purchase: IPendingPurchase;
}

export interface IPendingRegistrationResponse {
  data:IPendingRegistration;
  status:number;
  error: boolean;
}
