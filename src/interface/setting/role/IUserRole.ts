export interface IAddUserRoleRequest {
  companyId: string;
  roleTypeId: string;
  entityType: string;
  entityId: string;
  name: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  permissions: string[];
  createdBy: string;
}

interface IUserRoleData extends IAddUserRoleRequest {
  _id: string;
  createdAt: string;
}

export interface IAddUserRoleResponse {
  data: IUserRoleData;
  status: number;
  error: boolean;
}

// Role Types
export interface IRoleTypeData {
  isActive: boolean;
  isDeleted: boolean;
  _id: string;
  roleType: string;
  createdDate: string;
}

export interface IRoleTypeResponse {
  data: IRoleTypeData[];
  status: number;
  error: boolean;
}
