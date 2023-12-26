import { AxiosResponse } from 'axios';
import {Api} from '../http/Api';
import { GET_CUSTOMERS } from '../http/Endpoint';
import { ICustomerListResponse, ICustomerRequest } from '../interface/customer/customer';

// Image Upload
export const GetCustomerListService = async (payload: ICustomerRequest): Promise<any> => {
    const api = Api.getInstance();
    return await api.post<ICustomerRequest, AxiosResponse<ICustomerListResponse>>(payload, GET_CUSTOMERS);
}