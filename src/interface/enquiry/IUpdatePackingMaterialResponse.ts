export interface IUpdatePackingMaterialRequest {
    id: string;
    addedBy:string;
    enquiryId: string;
    packingMaterial: string;
    vehicleLoadSize: string;
    createdAt: string;
    isActive: boolean;
    isDeleted: boolean;
    
}

export interface IUpdatePackingMaterialResponse {
    data: IUpdatePackingMaterialRequest;
    error: boolean;
    status: number;
}