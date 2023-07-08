import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {SIGNIN} from '../http/Endpoint';
import { ISigninRequest } from '../interface/signin/ISigninRequest';
import { ISigninResponse } from '../interface/signin/ISigninResponse';

export const SigninService = (payload: ISigninRequest) => {
    const api = Api.getInstance();
    return api.post<ISigninRequest, AxiosResponse<ISigninResponse>>(payload, SIGNIN);
}