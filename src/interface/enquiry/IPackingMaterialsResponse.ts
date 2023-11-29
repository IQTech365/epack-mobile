export interface IGetPackingMaterialsRequest {
    enquiryId?:string;
    id?:string;
}

export interface IMaterial {
    name:string;
    quantity: string;
    type:string;
}

export interface IPackingMaterial {
    _id: string;
    enquiryId: string;
    vehicleLoadSize: string;
    packingMaterial: IMaterial[];
}

export interface IPackingMaterialsResponse {
    data:IPackingMaterial[];
    status: number;
    error: boolean;
}