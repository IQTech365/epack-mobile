export interface IUpdateFooterContent {
  moduleId: string[];
  contentType: string;
  content: string;
  isAdmin: boolean;
  title: string;
}

export interface IUpdateFooterContentPayload {
  id: string;
  payload: IUpdateFooterContent;
}

export interface IUpdateFooterContentResponse {
    data:any;
    status:number;
    error:boolean;
}
