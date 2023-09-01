//** ALL ACTIONS */

export enum ACCOUNT_DETAILS_FORM_ACTION{
BANK_NAME = 'BANK_NAME ',
BANK_IFSC ='BANK_IFSC',
BENEFICIARY_NAME ='BENEFICIARY_NAME',
ACCOUNT_NUMBER ='ACCOUNT_NUMBER',
}

/**ACCOUNT DETAILS FORM STATE */

interface IAccountDetailsFormState{
    bankName : string ;
    bankIfsc : string ;
    beneficiaryName : string ;
    accountNumber : string ;
}

/** ACCOUNT DETAILS FROM ACTION */

interface IAccountDetailsFormAction{
    type: ACCOUNT_DETAILS_FORM_ACTION;
    payload : string;
}

/** INITIAL STATE */

export const initialState : IAccountDetailsFormState = {
    bankName : '',
    bankIfsc : '',
    beneficiaryName : '',
    accountNumber : '',
}

/** ACCOUNT DETAILS REDUCER */
export const accountDetailsReducer = (
    state : IAccountDetailsFormState ,
    action : IAccountDetailsFormAction,
) => {
    const {type,payload} = action ;
    switch(type){
        case ACCOUNT_DETAILS_FORM_ACTION.BANK_NAME:
      return {...state, bankName: payload};
    case ACCOUNT_DETAILS_FORM_ACTION.BANK_IFSC:
      return {...state, bankIfsc: payload};
    case ACCOUNT_DETAILS_FORM_ACTION.BENEFICIARY_NAME:
      return {...state, beneficiaryName: payload};
    case ACCOUNT_DETAILS_FORM_ACTION.ACCOUNT_NUMBER:
      return {...state, accountNumber: payload};
    }
}

