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

interface IUserRoleData extends IAddUserRoleRequest{
    _id: string;
    createdAt: string;
}

export interface IAddUserRoleResponse {
    data: IUserRoleData;
    status: number;
    error: boolean;
}
