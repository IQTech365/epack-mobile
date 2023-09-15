import React from "react";
import { COMPANY_REGISTRATION_ACTION, ICompanyRegistrationState } from "../views/company/registrationReducer";

export class Validator {

    static isEmpty = (text: string|null|undefined): boolean => {
        console.log('isEmpty----', text);
        
        return text == undefined || text == null || text.length === 0 || text === '';
    }

    static email = (text:string): boolean => {
        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        return emailRegex.test(text);
    }

    static validateRegistrationForm = (state: ICompanyRegistrationState, dispatch: React.Dispatch<any>) => {
        const {companyName, email, mobile, contactPerson, pinCode, address, document} = state;
        if(Validator.isEmpty(companyName)) {
            dispatch({
                type: COMPANY_REGISTRATION_ACTION.COMPANY_NAME_ERROR,
                payload: 'Company name required'
            });
        } else {
            dispatch({
                type: COMPANY_REGISTRATION_ACTION.COMPANY_NAME_ERROR,
                payload: ''
            });
        }
    }
}