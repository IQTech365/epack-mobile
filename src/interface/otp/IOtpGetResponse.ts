export interface IModule {
  //
}

export interface ISubModule {
  //
}

export interface ISubModuleFeature {
  //
}

export interface UserRolePermission {
  _id: string;
  companyId: string;
  authId: string;
  roleTypeId: string;
  entityType: string;
  entityId: string;
  name: string;
  email: string;
  mobile: string;
  permissions: string[];
  createdBy: string;
  isActive: boolean;
  isDeleted: boolean;
  created: string;
  submodulefeature: any[];
  submodulename: any[];
  modulename: any[];
}

export type TOtpData = {
  id: string;
  username: string;
  mobile: string;
  email: string;
  otp: string;
  created: string;
  userType: string;
  userRolePermission: UserRolePermission[];
  jwtToken: string;
};

export interface IOtpGetResponse {
  data: TOtpData;
  status: number;
  error: boolean;
}
