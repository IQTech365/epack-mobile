export interface IGetNocListRequest {
    _id: string;
    companyId: string;
    enquiryId: string;
}

export interface INocPayload {
  companyId: string;
}

export interface IGetNocList {
            _id: string;
            companyId: string;
            enquiryId: string;
            nocType: string;
            nocDate:  string;
            biltyNo: string;
            biltyDate:  string;
            addedBy:  string;
            isActive: true,
            isDeleted: false,
            createdDate: string;
            updatedDate: string
    };
  
  export interface IGetNocListResponse {
    data: IGetNocList[];
    status: number;
    error: boolean;
  }
  