import {
  IVehicleAccessory,
  IVehicleAccessoryResponse,
  IVehicleColor,
  IVehicleColorResponse,
  IVehicleCompany,
  IVehicleCompanyResponse,
  IVehicleModel,
  IVehicleModelResponse,
  IVehicleType,
  IVehicleTypesResponse,
} from '../../../../../interface/common/common';

interface IItem {
    label:string;
    value:string;
}
interface IAccessory {
  label:string;
}

export const getVehicleTypeList = (response:IVehicleTypesResponse):IItem[] => {
    const {data} = response;
    let items: IItem[] = [];
    if (data && data.length > 0) {
      items = data.map((d: IVehicleType) => {
        const item: IItem = {label: d.vehicleType, value: d._id};
        return item;
      });
    }
    return items;
}

export const getVehicleCompanyList = (vehicleTypeId:string,response:IVehicleCompanyResponse):IItem[] => {
    const {data} = response;
    let items: IItem[] = [];
    if (data && data.length > 0) {
      const filters:IVehicleCompany[] = data.filter((d:IVehicleCompany) => d.vehicletypesid == vehicleTypeId);
      if(filters.length > 0) {
        items = filters.map((d: IVehicleCompany) => {
            const item: IItem = {label: d.vehicleCompanyName, value: d._id};
            return item;
          });
      }
    }
    return items;
}

export const getVehicleColorList = (response:IVehicleColorResponse):IItem[] => {
    const {data} = response;
    let items: IItem[] = [];
    if (data && data.length > 0) {
      items = data.map((d: IVehicleColor) => {
        const item: IItem = {label: d.vehicleColorName, value: d.vehicleColorName};
        return item;
      });
    }
    return items;
}

export const getVehicleAccessoryList = (response:IVehicleAccessoryResponse):IAccessory[] => {
    const {data} = response;
    let items: IAccessory[] = [];
    if (data && data.length > 0) {
      items = data.map((d: IVehicleAccessory) => {
        const item: IAccessory = {label: d.vehicleAccessory};
        return item;
      });
    }
    return items;
}

export const getVehicleModelList = (vehicleCompanyId:string,response:IVehicleModelResponse):IItem[] => {
    const {data} = response;
    let items: IItem[] = [];
    if (data && data.length > 0) {
      const filters:IVehicleModel[] = data.filter((d:IVehicleModel) => d.vehicleCompanyName == vehicleCompanyId);
      if(filters.length > 0) {
        items = data.map((d: IVehicleModel) => {
            const item: IItem = {label: d.vehicleModel, value: d.vehicleModel};
            return item;
          });
      }
    }
    return items;
}