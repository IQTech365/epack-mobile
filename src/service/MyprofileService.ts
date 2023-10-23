import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_BRANCH, GET_BRANCHS} from '../http/Endpoint';
import { IAddBranchRequest } from '../interface/myProfile/IAddBranchRequest';
import { IAddBranchResponse } from '../interface/myProfile/IAddbranchResponse';
import { IGetBranchsResponse } from '../interface/myProfile/IGetBranchResponse';

export const AddBranchchService = async (payload: IAddBranchRequest): Promise<IAddBranchResponse> => {
    console.log('AddBrnachService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddBranchRequest, AxiosResponse<IAddBranchResponse>>(payload, ADD_BRANCH);
}

export const GetBranchService = async (payload: string): Promise<IGetBranchsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetBranchsResponse>(GET_BRANCHS(payload));
}
