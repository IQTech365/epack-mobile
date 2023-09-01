/**ALL ACTIONS */

export enum REGISTRATION_DETAILS_FROM_ACTION {
    GST_NO ='GST_NO',
    UDYAM_REGD_NO ='UDYAM_REGD_NO',
    SHOP_ACT_NO ='SHOP_ACT_NO',
    IBA_CODE ='IBA_CODE',
    ISO_NO ='ISO_NO',
    COMPANY_TYPE ='COMPANY_TYPE',
    PAN_NO ='PAN_NO',
    IBA_EXPIRY ='IBA_EXPIRY',
}
/** REGISTRATION DETAILS FORM STATE */

interface IRegistrationDetailsState {
    gstNo : string ;
    udyamRegdNo : string ;
    shopActNo : string ;
    ibaCode : string ;
    isoNo : string ;
    companyType : string ;
    panNo : string ;
    ibaExpiry : string ;
}

/** ACTION INTERFACE */

interface IRegistrationDetailsAction {
    type :REGISTRATION_DETAILS_FROM_ACTION;
    payload :string;
}

/** INITIAL STATE */

export const initialState : IRegistrationDetailsState ={
    gstNo : '',
    udyamRegdNo : '',
    shopActNo : '',
    ibaCode : '',
    isoNo : '',
    companyType : '',
    panNo : '',
    ibaExpiry : '',
}

/** REGISTRATION FORM REDUCER */

export const registrationdetailsReducer =(
    state : IRegistrationDetailsState,
    action : IRegistrationDetailsAction,
) =>{
    const {type ,payload} =action ;
    switch (type){
        case REGISTRATION_DETAILS_FROM_ACTION.GST_NO:
      return {...state, gstNo: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.UDYAM_REGD_NO:
      return {...state, udyamRegdNo: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.SHOP_ACT_NO:
      return {...state, shopActNo: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.IBA_CODE:
      return {...state, ibaCode: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.ISO_NO:
      return {...state, isoNo: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.COMPANY_TYPE:
      return {...state, companyType: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.PAN_NO:
      return {...state, panNo: payload};
    case REGISTRATION_DETAILS_FROM_ACTION.IBA_EXPIRY:
      return {...state, ibaExpiry: payload};
    }
}