export interface IAddPackingMaterialRequest {
    enquiryId: string;
    vehicleLoadSize: string;
    packingMaterial: object[];
    addedBy: string;
}