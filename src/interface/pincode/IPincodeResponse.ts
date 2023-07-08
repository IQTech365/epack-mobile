interface IAddress {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}
export interface IPincodeResponse {
    Message: string;
    Status: string;
    PostOffice: Array<IAddress>;
}
