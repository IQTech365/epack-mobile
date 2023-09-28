import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_QUOTATION} from '../http/Endpoint';
import {IAddQuotationRequest} from '../interface/quotation/IAddQuotationRequest';
import {IAddQuotationResponse} from '../interface/quotation/IAddQuotationResponse';

export const AddQuotationService = async (
  payload: IAddQuotationRequest,
): Promise<IAddQuotationResponse> => {
  const api = Api.getInstance();
  return await api.post<
    IAddQuotationRequest,
    AxiosResponse<IAddQuotationResponse>
  >(payload, ADD_QUOTATION);
};
