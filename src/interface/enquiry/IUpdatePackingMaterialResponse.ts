import { IPackingItem } from "../../views/enquiry/enquiryDetails/components/PackingMaterialsView/utils";
import { IMaterial } from "./IPackingMaterialsResponse";

export interface IUpdatePackingMaterialRequest {
  enquiryId: string;
  vehicleLoadSize: string;
  packingMaterial: IPackingItem[];
}

export interface IUpdatePackingMaterialPayload {
  id: string;
  data: IUpdatePackingMaterialRequest;
}

export interface IUpdatePackingMaterialResponse {
  data: any;
  error: boolean;
  status: number;
}
