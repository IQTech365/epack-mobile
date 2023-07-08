import {Api} from '../http/Api';
import { IPincodeResponse } from '../interface/pincode/IPincodeResponse';

export const PincodeService = async (uri: string) => {
    const api = Api.getInstance();
    return api.getPostalAddress<IPincodeResponse>(uri);
}