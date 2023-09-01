//** ALL ACTIONS */
export enum  BASIC_DETAIL_FORM_ACTION {
COMPANY_NAME = 'COMPANY_NAME ',
COMPANY_PUNCH_LINE = 'COMPANY_PUNCH_LINE',
REGISTERED_MOBILE_NUMBER = 'REGISTERED_MOBILE_NUMBER',
LANDLINE_NUMBER ='LANDLINE_NUMBER',
TOLL_FREE_NUMBER = 'TOLL_FREE_NUMBER',
ALTERNATE_NUMBER ='ALTERNATE_NUMBER',
MANAGER_NAME ='MANAGER_NAME',
WEBSITE ='WEBSITE',
EMAIL ='EMAIL',
COMPANY_PROFILE ='COMPANY_PROFILE',
//PLEASE ADD UPI FIELDS
}

/** BASIC DETAIL FORM STATE */

interface IBasicDetailFormState{
    companyName : string;
    companyPunchLine : string;
    registeredMobileNumber : string;
    landlineNumber : string ;
    tollFreeNumber : string;
    alternateNumber : string;
    managerName : string;
    wesite : string ;
    companyprofile : string ;
}

/** ACTION INTERFACE */

interface  IBasicDetailFormAction {
    type : BASIC_DETAIL_FORM_ACTION;
    payload  : string;
}

/** INITIAL STATE */

export const initialState:  IBasicDetailFormState ={

    companyName :'',
    companyPunchLine :'',
    registeredMobileNumber :'',
    landlineNumber : '',
    tollFreeNumber :'',
    alternateNumber :'',
    managerName :'',
    wesite : '',
    companyprofile : '',
}

/** Basic Details Reducer */

export const basicDetailsReducer = (
 state : IBasicDetailFormState ,
 action : IBasicDetailFormAction,
) =>{
 const {type ,payload } = action ;
 switch (type) {
    case BASIC_DETAIL_FORM_ACTION.COMPANY_NAME:
      return {...state, comapnyName: payload};
    case BASIC_DETAIL_FORM_ACTION.COMPANY_PUNCH_LINE:
      return {...state, comapnyPunchLine: payload};
    case BASIC_DETAIL_FORM_ACTION.REGISTERED_MOBILE_NUMBER:
      return {...state, registeredMobileNumber: payload};
    case BASIC_DETAIL_FORM_ACTION.LANDLINE_NUMBER:
      return {...state, landLineNumber: payload};
    case BASIC_DETAIL_FORM_ACTION.TOLL_FREE_NUMBER:
      return {...state, tollFreeNumber: payload};
    case BASIC_DETAIL_FORM_ACTION.ALTERNATE_NUMBER:
      return {...state, alternateNumber: payload};
    case BASIC_DETAIL_FORM_ACTION.MANAGER_NAME:
      return {...state, managerName: payload};
    case BASIC_DETAIL_FORM_ACTION.WEBSITE:
      return {...state, website: payload};
    case BASIC_DETAIL_FORM_ACTION.EMAIL:
    case BASIC_DETAIL_FORM_ACTION.COMPANY_PROFILE:
      return {...state, companyProfile: payload};
 }
}