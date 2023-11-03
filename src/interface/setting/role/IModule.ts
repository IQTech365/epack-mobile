export interface ISubmodule {
    _id: string;
    moduleId: string;
    subModuleName: string;
}

export interface ISubmoduleFeature {
    _id: string;
    submoduleId: string;
    feature: string;
}

export interface IModule {
    _id: string;
    moduleName: string;
    isActive: boolean;
    submodulename: ISubmodule[];
    submodulefeature: ISubmoduleFeature[];
}

export interface IGetModulesResponse {
    data: IModule[];
    status: number;
    error: boolean;
}