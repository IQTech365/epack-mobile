import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import { ADD_DRIVER, ADD_LORRY} from '../http/Endpoint';
import { IAddLorryRequest } from '../interface/vehicle/IAddLorryRequest';
import { IAddLorryResponse } from '../interface/vehicle/IAddLorryResponse';
import { IAddDriverRequest } from '../interface/vehicle/IAddDriverRequest';
import { IAddDriverResponse } from '../interface/vehicle/IAddDriverResponse';

export const AddLorryService = async (payload: IAddLorryRequest): Promise<IAddLorryResponse> => {
    console.log('AddLorryService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddLorryRequest, AxiosResponse<IAddLorryResponse>>(payload, ADD_LORRY);
}

// export const GetBranchService = async (payload: string): Promise<IGetBranchsResponse> => {
//     const api = Api.getInstance();
//     return await api.get<IGetBranchsResponse>(GET_BRANCHS(payload));
// }

export const addDriverService = async (payload: IAddDriverRequest): Promise<IAddDriverResponse> => {
    console.log('addDriverService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddDriverRequest, AxiosResponse<IAddDriverResponse>>(payload, ADD_DRIVER);
}

// export const GetFranchiseService = async (payload: string): Promise<IGetFranchiseResponse> => {
//     const api = Api.getInstance();
//     return await api.get<IGetFranchiseResponse>(GET_FRANCHISE(payload));
// }
