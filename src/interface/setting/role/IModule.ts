export interface ISubmoduleFeature {
    _id: string;
    submoduleId: string;
    feature: string;
    isActive: boolean;
    isDeleted: boolean;
    createdDate: string;
}

export interface ISubmodule {
    _id: string;
    moduleId: string;
    subModuleName: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    createdDate: string;
    submodulesfeatures: ISubmoduleFeature[];
}

export interface IModule {
    _id: string;
    moduleName: string;
    isActive: boolean;
    isDeleted: boolean;
    submodulename: ISubmodule[];
}

export interface IGetModulesResponse {
    data: IModule[];
    status: number;
    error: boolean;
}