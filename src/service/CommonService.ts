import {Api} from '../http/Api';
import { GET_PACKING_TYPES } from '../http/Endpoint';
import { IPackingTypeResponse } from '../interface/common/common';

export const GetPackingTypesService = async (): Promise<IPackingTypeResponse> => {
    const api = Api.getInstance();
    return await api.get<IPackingTypeResponse>(GET_PACKING_TYPES);
}

