import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {
  ADD_CONTACT_DETAIL,
  ADD_DOCUMENT,
  ADD_FOOTER_CONTENT,
  ADD_PAYMENT_METHOD,
  ADD_USER_ROLE,
  CHECK_USERNAME_AVAILABLITY,
  DELETE_CONTACT_DETAIL,
  DELETE_FOOTER_CONTENT,
  DELETE_PAYMENT_METHOD,
  GET_BANKS,
  GET_BILTY_SERIAL_NO,
  GET_CAR_CONDITION_SERIAL_NO,
  GET_CONTACTS,
  GET_DOCUMENTS,
  GET_FOOTER_CONTENTS,
  GET_INVOICE_SERIAL_NO,
  GET_MONEY_RECEIPT_SERIAL_NO,
  GET_OTP,
  GET_PACKING_LIST_SERIAL_NO,
  GET_PAYMENT_METHODS,
  GET_QUOTATION_SERIAL_NO,
  GET_ROLE_TYPES,
  GET_SAVED_DOCUMENT_TEMPLATE_ID_LIST,
  GET_SERIAL_NO,
  GET_SUBMODULES,
  GET_SURVEY_ITEM_SERIAL_NO,
  GET_TEPLATE_LIST,
  GET_UNIT_TYPES,
  MODULES,
  SAVE_DOCUMENT_TEMPLATE_ID,
  SERIAL_NO,
  UPDATE_CONTACT_DETAIL,
  UPDATE_DOCUMENT,
  UPDATE_FOOTER_CONTENT,
  UPDATE_PAYMENT_METHOD,
  VERIFY_OTP,
} from '../http/Endpoint';
import {IAddContactDetailRequest} from '../interface/setting/packerProfile/contactDetail/IAddContactDetailRequest';
import {IAddContactDetailResponse} from '../interface/setting/packerProfile/contactDetail/IAddContactDetailResponse';
import {IGetContactDetailsResponse} from '../interface/setting/packerProfile/contactDetail/IGetContactDetailsResponse';
import {IAddDocumentRequest, IUpdateDocumentRequest} from '../interface/setting/packerProfile/document/IAddDocumentRequest';
import {IAddDocumentResponse} from '../interface/setting/packerProfile/document/IAddDocumentResponse';
import {IGetDocumentsResponse} from '../interface/setting/packerProfile/document/IGetDocumentsResponse';
import {IAddFooterContentRequest} from '../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import {IAddFooterContentResponse} from '../interface/setting/packerProfile/footerContent/IAddFooterContentResponse';
import {IGetFooterContentsResponse} from '../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import {IBankResponse} from '../interface/setting/packerProfile/IBank';
import {ISubmoduleResponse} from '../interface/setting/packerProfile/ISubmodule';
import {IAddPaymentMethodRequest} from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import {IAddPaymentMethodResponse} from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';
import {
  ICheckUsernameAvailablilityRequest,
  ICheckUsernameAvailablilityResponse,
} from '../interface/setting/role/ICheckUsername';
import {IGetModulesResponse} from '../interface/setting/role/IModule';
import {
  IAddUserRoleRequest,
  IAddUserRoleResponse,
  IRoleTypeResponse,
} from '../interface/setting/role/IUserRole';
import {IGetPaymentMethodsResponse} from '../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import {
  ISaveDocumentTemplateIdPayload,
  ISaveDocumentTemplateIdRequestPayload,
  ISaveDocumentTemplateIdResponse,
  ISavedDocumentTemplateIdResponse,
  ITemplateListResponse,
} from '../interface/setting/template/template';
//@ts-ignore
import {IGetUnitTypeResponse} from '../interface/setting/unitType/IGetunitTypeResponse';
import {
  DOCUMENT_TYPE,
  ICreateSerialNoRequest,
  ICreateSerialNoResponse,
  IGetSerialNoPayload,
  IGetSerialNoRequest,
  IGetSerialNoResponse,
} from '../interface/setting/serialNo/serialNo';
import { IDeleteAccountResponse, IDeleteContactResponse, IDeleteFooterContentResponse } from '../interface/setting/packerProfile/contact';
import { IUpdatePaymentMethodPayload, IUpdatePaymentMethodResponse } from '../interface/setting/packerProfile/paymentMethod/IUpdatePaymentMethod';
import { IUpdateContactDetailPayload } from '../interface/setting/packerProfile/contactDetail/IUpdateContactDetail';
import { IUpdateContactDetailResponse } from '../interface/order/IUpdateContactDetails';
import { IUpdateDocumentPayload, IUpdateDocumentResponse } from '../interface/setting/packerProfile/document/IUpdateDocument';
import { IUpdateFooterContent, IUpdateFooterContentPayload, IUpdateFooterContentResponse } from '../interface/setting/packerProfile/footerContent/IUpdateFooterContent';

// PAYMENT
export const AddPaymentMethodService = async (
  payload: IAddPaymentMethodRequest,
): Promise<IAddPaymentMethodResponse> => {
  const api = Api.getInstance();
  return await api.post<
    IAddPaymentMethodRequest,
    AxiosResponse<IAddPaymentMethodResponse>
  >(payload, ADD_PAYMENT_METHOD);
};

export const GetPaymentMethodService = async (
  payload: IAddPaymentMethodRequest,
): Promise<IAddPaymentMethodResponse> => {
  const api = Api.getInstance();
  return await api.get<IAddPaymentMethodResponse>(GET_PAYMENT_METHODS(payload));
};

export const UpdatePaymentMethodService = async (payload: IUpdatePaymentMethodPayload): Promise<IUpdatePaymentMethodResponse> => {
  const api = Api.getInstance();
  return await api.update<IAddPaymentMethodRequest,AxiosResponse<IUpdatePaymentMethodResponse>>(payload.payload, UPDATE_PAYMENT_METHOD(payload.id));
};

export const DeletePaymentMethodService = async (
  payload: string,
): Promise<IDeleteAccountResponse> => {
  const api = Api.getInstance();
  return await api.delete<any,AxiosResponse<IDeleteAccountResponse>>(null, DELETE_PAYMENT_METHOD(payload));
};

// FOOTER CONTENT
export const AddFooterContentService = async (
  payload: IAddFooterContentRequest,
): Promise<IAddFooterContentResponse> => {
  const api = Api.getInstance();
  return await api.post<
    IAddFooterContentRequest,
    AxiosResponse<IAddFooterContentResponse>
  >(payload, ADD_FOOTER_CONTENT);
};

export const UpdateFooterContentService = async (payload: IUpdateFooterContentPayload): Promise<IUpdateFooterContentResponse> => {
  const api = Api.getInstance();
  return await api.update<IUpdateFooterContent,AxiosResponse<IUpdateFooterContentResponse>>(payload.payload, UPDATE_FOOTER_CONTENT(payload.id));
};

export const GetFooterContentsService = async (
  payload: string,
): Promise<IGetFooterContentsResponse> => {
  const api = Api.getInstance();
  return await api.get<IGetFooterContentsResponse>(
    GET_FOOTER_CONTENTS(payload),
  );
};

export const DeleteFooterContentService = async (
  payload: string,
): Promise<IDeleteFooterContentResponse> => {
  const api = Api.getInstance();
  return await api.delete<any,AxiosResponse<IDeleteFooterContentResponse>>(null, DELETE_FOOTER_CONTENT(payload));
};

// CONTACT DETAILS
export const AddContactDetailService = async (
  payload: IAddContactDetailRequest,
): Promise<IAddContactDetailResponse> => {
  const api = Api.getInstance();
  return await api.post<
    IAddContactDetailRequest,
    AxiosResponse<IAddContactDetailResponse>
  >(payload, ADD_CONTACT_DETAIL);
};

export const UpdateContactDetailService = async (
  payload: IUpdateContactDetailPayload,
): Promise<IUpdateContactDetailResponse> => {
  const api = Api.getInstance();
  return await api.update<
    IAddContactDetailRequest,
    AxiosResponse<IUpdateContactDetailResponse>
  >(payload.payload, UPDATE_CONTACT_DETAIL(payload.id));
};

export const GetContactDetailsService = async (
  payload: string,
): Promise<IGetContactDetailsResponse> => {
  const api = Api.getInstance();
  return await api.get<IGetContactDetailsResponse>(GET_CONTACTS(payload));
};

export const DeleteContactDetailService = async (
  payload: string,
): Promise<IDeleteContactResponse> => {
  const api = Api.getInstance();
  return await api.delete<any, AxiosResponse<IDeleteContactResponse>>(null, DELETE_CONTACT_DETAIL(payload));
};

// COMPANY DOCUMENT
export const AddCompanyDocumentService = async (
  payload: IAddDocumentRequest,
): Promise<IAddDocumentResponse> => {
  const api = Api.getInstance();
  return await api.post<
    IAddDocumentRequest,
    AxiosResponse<IAddDocumentResponse>
  >(payload, ADD_DOCUMENT);
};

export const UpdateCompanyDocumentService = async (
  payload: IUpdateDocumentPayload,
): Promise<IUpdateDocumentResponse> => {
  const api = Api.getInstance();
  return await api.update<
  IUpdateDocumentRequest,
    AxiosResponse<IUpdateDocumentResponse>
  >(payload.payload, UPDATE_DOCUMENT(payload.id));
};

export const GetCompanyDocumentsService = async (
  payload: string,
): Promise<IGetDocumentsResponse> => {
  const api = Api.getInstance();
  return await api.get<IGetDocumentsResponse>(GET_DOCUMENTS(payload));
};

// USER ROLE
export const AddUserRoleService = async (
  payload: IAddUserRoleRequest,
): Promise<IAddUserRoleResponse> => {
  const api = Api.getInstance();
  return await api.post<
    IAddUserRoleRequest,
    AxiosResponse<IAddUserRoleResponse>
  >(payload, ADD_USER_ROLE);
};

// CHECK USERNAME AVAILABILITY
export const CheckUsernameAvailabilityService = async (
  payload: ICheckUsernameAvailablilityRequest,
): Promise<ICheckUsernameAvailablilityResponse> => {
  const api = Api.getInstance();
  return await api.post<
    ICheckUsernameAvailablilityRequest,
    AxiosResponse<ICheckUsernameAvailablilityResponse>
  >(payload, CHECK_USERNAME_AVAILABLITY);
};

// ROLE TYPES
export const GetRoleTypesService = async (): Promise<IRoleTypeResponse> => {
  const api = Api.getInstance();
  return await api.get<IRoleTypeResponse>(GET_ROLE_TYPES);
};

// SUB MODULES
export const GetSubmodulesService = async (): Promise<ISubmoduleResponse> => {
  const api = Api.getInstance();
  return await api.get<ISubmoduleResponse>(GET_SUBMODULES);
};

//  Banks
export const GetBanksService = async (): Promise<IBankResponse> => {
  const api = Api.getInstance();
  return await api.get<IBankResponse>(GET_BANKS);
};

// SERIAL NO'S
export const CreateSerialNoService = async (
  payload: ICreateSerialNoRequest,
): Promise<ICreateSerialNoResponse> => {
  const api = Api.getInstance();
  return await api.post<
    ICreateSerialNoRequest,
    AxiosResponse<ICreateSerialNoResponse>
  >(payload, SERIAL_NO);
};

export const GetSerialNoService = async (
  req: IGetSerialNoRequest,
): Promise<IGetSerialNoResponse> => {
  const {document, payload} = req;
  let uri: string = '';
  switch (document) {
    case DOCUMENT_TYPE.QUOTATION:
      uri = GET_QUOTATION_SERIAL_NO;
      break;
    case DOCUMENT_TYPE.BILTY:
      uri = GET_BILTY_SERIAL_NO;
      break;
    case DOCUMENT_TYPE.CAR_CONDITION:
      uri = GET_CAR_CONDITION_SERIAL_NO;
      break;
    case DOCUMENT_TYPE.MONEY_RECEIPT:
      uri = GET_MONEY_RECEIPT_SERIAL_NO;
      break;
    case DOCUMENT_TYPE.INVOICE:
      uri = GET_INVOICE_SERIAL_NO;
      break;
    case DOCUMENT_TYPE.SURVEY_ITEM:
      uri = GET_SURVEY_ITEM_SERIAL_NO;
      break;
    case DOCUMENT_TYPE.PACKING_LIST:
        uri = GET_PACKING_LIST_SERIAL_NO;
        break;
    default:
      break;
  }
  const api = Api.getInstance();
  // return await api.getWithBody<IGetSerialNoResponse, IGetSerialNoPayload>(uri, payload);
  return await api.post<IGetSerialNoPayload, AxiosResponse<IGetSerialNoResponse>>(payload, uri);
};

// MODULES
export const GetModulesService = async (): Promise<IGetModulesResponse> => {
  const api = Api.getInstance();
  return await api.get<IGetModulesResponse>(MODULES);
};

// UNIT TYPE
export const GetUnitTypeService = async (): Promise<IGetUnitTypeResponse> => {
  const api = Api.getInstance();
  return await api.get<IGetUnitTypeResponse>(GET_UNIT_TYPES);
};

// TEMPLATE LIST
export const GetTemplateListService =
  async (): Promise<ITemplateListResponse> => {
    const api = Api.getInstance();
    return await api.get<ITemplateListResponse>(GET_TEPLATE_LIST);
  };

// SAVE DOCUMENT TEMPLATE ID
export const SaveDocumentTemplateIdService = async (
  payload: ISaveDocumentTemplateIdPayload,
): Promise<ISaveDocumentTemplateIdResponse> => {
  const {params, payload: data} = payload;
  const api = Api.getInstance();
  return await api.update<
    ISaveDocumentTemplateIdRequestPayload,
    AxiosResponse<ISaveDocumentTemplateIdResponse>
  >(data, SAVE_DOCUMENT_TEMPLATE_ID(params.templateId));
};

// Get Saved Document Template ID List
export const GetSavedTemplateIdListService = async (
  payload: string,
): Promise<ISavedDocumentTemplateIdResponse> => {
  const api = Api.getInstance();
  return await api.get<ISavedDocumentTemplateIdResponse>(
    GET_SAVED_DOCUMENT_TEMPLATE_ID_LIST(payload),
  );
};
