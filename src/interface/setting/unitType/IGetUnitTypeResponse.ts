export interface IUnitType {
  _id: string;
  unitType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: 0;
}
export interface IGetUnitTypeResponse {
  data: IUnitType[];
  status: number;
  error: boolean;
}
