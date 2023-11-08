import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import { ADD_DRIVER, ADD_LORRY, GET_DRIVER, GET_LORRY} from '../http/Endpoint';
import { IAddLorryRequest } from '../interface/vehicle/IAddLorryRequest';
import { IAddLorryResponse } from '../interface/vehicle/IAddLorryResponse';
import { IAddDriverRequest } from '../interface/vehicle/IAddDriverRequest';
import { IAddDriverResponse } from '../interface/vehicle/IAddDriverResponse';
import { IGetLorryResponse } from '../interface/vehicle/IGetLorryResponse';
import { IGetDriverResponse } from '../interface/vehicle/IGetDriverReuest';

export const AddLorryService = async (payload: IAddLorryRequest): Promise<IAddLorryResponse> => {
    console.log('AddLorryService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddLorryRequest, AxiosResponse<IAddLorryResponse>>(payload, ADD_LORRY);
}

export const GetLorryService = async (payload: string): Promise<IGetLorryResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetLorryResponse>(GET_LORRY(payload));
}

export const addDriverService = async (payload: IAddDriverRequest): Promise<IAddDriverResponse> => {
    console.log('addDriverService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddDriverRequest, AxiosResponse<IAddDriverResponse>>(payload, ADD_DRIVER);
}

export const GetDriverService = async (payload: string): Promise<IGetDriverResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetDriverResponse>(GET_DRIVER(payload));
}
