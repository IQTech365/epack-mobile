// Create Packing List
export interface IPackingItem {
  itemName: string;
  quantity: string;
  packingType: string;
  productCode: string;
  valueOfGoods: string;
  description: string;
}
export interface ICreatePackingMaterialRequest {
  enquiryId: string;
  packingListNo: string;
  packingDate: string;
  packingItems: IPackingItem[];
  addedBy: string;
}
export interface ICreatePackingMaterialResponse {
  data: any;
  error: boolean;
  status: number;
}

// Get Packing List
export interface IGetPackingListRequest {
  companyId?: string;
  enquiryId?: string;
  id?: string;
}
export interface IPackingListData {}
export interface IPackingListResponse {
  data: IPackingListData[];
  error: boolean;
  status: number;
}

// Delete Packing Item
export interface IDeletePackingListItemResponse {
  data: any;
  error: boolean;
  status: number;
}
