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
    mobile:string,
    licenceNo: string,
    aadharNo: string,
    permanentAddress : Address|{},
    currentAddress: Address |{},
    addedBy: string
}