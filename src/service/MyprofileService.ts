import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_BRANCH, ADD_FRANCHISE, GET_BRANCHS, GET_FRANCHISE} from '../http/Endpoint';
import { IAddBranchRequest } from '../interface/myProfile/IAddBranchRequest';
import { IAddBranchResponse } from '../interface/myProfile/IAddbranchResponse';
import { IGetBranchsResponse } from '../interface/myProfile/IGetBranchResponse';
import { IGetFranchiseResponse } from '../interface/myProfile/IGetFranchiseResponse';
import { IAddFranchiseRequest } from '../interface/myProfile/IAddFranchiseRequest';
import { IAddFranchiseResponse } from '../interface/myProfile/IAddFranchiseResponse';

export const AddBranchService = async (payload: IAddBranchRequest): Promise<IAddBranchResponse> => {
    console.log('AddBranchService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddBranchRequest, AxiosResponse<IAddBranchResponse>>(payload, ADD_BRANCH);
}

export const GetBranchService = async (payload: string): Promise<IGetBranchsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetBranchsResponse>(GET_BRANCHS(payload));
}

export const AddFranchiseService = async (payload: IAddFranchiseRequest): Promise<IAddFranchiseResponse> => {
    console.log('AddFranchiseService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddFranchiseRequest, AxiosResponse<IAddFranchiseResponse>>(payload, ADD_FRANCHISE);
}

export const GetFranchiseService = async (payload: string): Promise<IGetFranchiseResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetFranchiseResponse>(GET_FRANCHISE(payload));
}
