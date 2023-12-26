// Request Payload
export interface ICustomerRequest {
    companyId:string;
    branchId?:string;
}

// Get Customers
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
export interface ICustomer {
  _id: string;
  partyName: string;
  __v: number;
  billingBy: string;
  billingDetails: ICustomerBillingInfo | string;
  branchId: string;
  companyId: string;
  createdAt: string;
  isActive: true;
  isDeleted: false;
  mobile: '';
  pickupAddress: ICustomerAddress;
}
export interface ICustomerListResponse {
  data: ICustomer[];
  status: number;
  error: boolean;
}
