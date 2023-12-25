export interface Address {
    state: string,
    city: string,
    pincode: string,
    address: string,
    locality: string
}

export interface IAddDriverRequest {
    companyId: string,
    entityType: string,
    entityId: string,
    driverName: string,
    driverPhoto: string,
    mobile:string,
    licenceNo: string,
    driverLicence: string,
    aadharNo: string,
    aadharFront: string,
    aadharBack: string,
    permanentAddress : Address|{},
    currentAddress: Address |{},
    addedBy?: string
}