/** ALL ACTION */

export enum TERMS_AND_CONDITIONS_FORM_ACTION{
    COMPANY_TERMS_AND_CONDITIONS ='COMPANY_TERMS_AND_CONDITIONS',
}

/** TERMS AND CONDITIONS FORM STATE */

interface ITermsAndConditionsState{
    companyTermsAndConditions : string ;
}

/**  ACTION INTERFACE */

interface ITermsAndConditionsAction{
    type :TERMS_AND_CONDITIONS_FORM_ACTION;
    payload : string ;
}

/** INITIAL STATE */

export const initialState : ITermsAndConditionsState ={
    companyTermsAndConditions: '',
}

/** TERMS AND CONDITIONS REDUCER */ 

export const termsAndConditionsReducer =(
    
    state : ITermsAndConditionsState ,
     action :ITermsAndConditionsAction,
    ) =>{
        const {type,payload} = action ;
        switch (type){
            case TERMS_AND_CONDITIONS_FORM_ACTION.COMPANY_TERMS_AND_CONDITIONS:
      return {...state, companyTermAndConditions: payload};
        }
    }
