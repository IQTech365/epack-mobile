import { IVehicleType, IVehicleTypesResponse } from "../../../interface/common/common";
import { IBranch, IGetBranchsResponse } from "../../../interface/myProfile/IGetBranchResponse";
import { IFranchise, IGetFranchiseResponse } from "../../../interface/myProfile/IGetFranchiseResponse";
import { TDropdownItem } from "../../../type/TDropdownItem";

export const getBranchList = (response:IGetBranchsResponse):TDropdownItem[] => {
    const {data} = response;
    let items:TDropdownItem[] = [];
    if(data && Array.isArray(data) && data.length > 0) {
        items = data.map((d:IBranch) => {
            const item:TDropdownItem = {label: d.branchName, value: d._id};
            return item;
        });
    }
    return items;
}

export const getFranchiseList = (response:IGetFranchiseResponse):TDropdownItem[] => {
    const {data} = response;
    let items:TDropdownItem[] = [];
    if(data && Array.isArray(data) && data.length > 0) {
        items = data.map((d:IFranchise) => {
            const item:TDropdownItem = {label: d.franchiseName, value: d._id};
            return item;
        });
    }
    return items;
}

export const getFirstVehicleType = (response:IVehicleTypesResponse):IVehicleType => {
    const {data} = response;
    let vehicleType:IVehicleType;
    if(data && Array.isArray(data) && data.length > 0) {
        vehicleType = data[0];
    }
    //@ts-ignore
    return vehicleType;
}