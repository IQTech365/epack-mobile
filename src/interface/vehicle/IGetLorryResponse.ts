export interface IVehicle {
  _id: string;
  companyId: string;
  entityType: string;
  entityId: string;
  vehicleCompanyName: string;
  vehicleManufacturingYear: string;
  vehicleType: string;
  vehicleRegistrationNo: string;
  vehicleChassisNo: string;
  vehicleEngineNo: string;
  permitNo: string;
  permitRenewalDate: string;
  vehicleRCNo: string;
  pollutionCertificateNo: string;
  pollutionRenewalDate: string;
  isDeleted: boolean;
  createdAt: string;
  __v: number;
}

export interface IGetLorryResponse {
  data: IVehicle[];
  status: number;
  error: boolean;
}
