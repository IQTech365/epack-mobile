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
  companyId: string;
  enquiryId: string;
  packingListNo: string;
  packingDate: string;
  packingItems: IPackingItem[];
  addedBy: string;
  isAuto:boolean;
  isHeadOffice:boolean;
}
export interface ICreatePackingMaterialResponse {
  data: any;
  error: boolean;
  status: number;
}

// Update Packing List
export interface IUpdatePackingListPayload {
  packingListNo: string;
  packingDate: string;
  packingItems: IPackingItem[];
}

export interface IUpdatePackingListResponse {
  data:any;
  status:number;
  error:boolean;
}
export interface IUpdatePackingListRequest {
  packingListId:string;
  payload:IUpdatePackingListPayload;
}

// Get Packing List
export interface IGetPackingListRequest {
  companyId?: string;
  enquiryId?: string;
  id?: string;
}

export interface IPackingListData {
  _id: string;
  enquiryId: string;
  packingListNo: string;
  packingDate: string;
  packingItems: [
    {
      itemName: string;
      quantity: string;
      packingType: string;
      productCode: string;
      valueOfGoods: string;
      description: string;
    },
    {
      itemName: string;
      quantity: string;
      packingType: string;
      productCode: string;
      valueOfGoods: string;
      description: string;
    },
  ];
  addedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
}
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
