export interface IAddLorryRequest {
    companyId: string,
    entityType: string,
    entityId: string,
    vehicleCompanyName: string,
    vehicleManufacturingYear: string,
    vehicleType: string,
    vehicleRegistrationNo: string,
    vehicleChassisNo: string,
    vehicleEngineNo: string,
    permitNo: string,
    permitRenewalDate: string,
    vehicleRCNo: string,
    pollutionCertificateNo: string,
    pollutionRenewalDate: string,
    createdBy?: string
    }