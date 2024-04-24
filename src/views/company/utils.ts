import {Validator} from '../../utils/validation';
import {IState} from './registrationReducer';

export const ibaApprovalOptions: string[] = ['Not Approved', 'Approved'];

export const signatureOptions: string[] = [
  'Digital Signature',
  'Signature Upload',
];

export interface IError {
  valid: boolean;
  error: string;
  fieldName: string;
}

export const validate = (state: IState, docType?: string): IError[] => {
  let error: IError[] = [];
  const empty: string = '';
  if (Validator.isEmpty(state.company_name)) {
    const obj: IError = {
      valid: false,
      error: 'Company name required',
      fieldName: 'COMPANY_NAME',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.company_name)) {
    const obj: IError = {valid: true, error: empty, fieldName: 'COMPANY_NAME'};
    error.push(obj);
  }
  if (Validator.isEmpty(state.contact_person)) {
    const obj: IError = {
      valid: false,
      error: 'Contact person name required',
      fieldName: 'CONTACT_PERSON',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.contact_person)) {
    const obj: IError = {
      valid: true,
      error: empty,
      fieldName: 'CONTACT_PERSON',
    };
    error.push(obj);
  }
  if (Validator.isEmpty(state.email)) {
    const obj: IError = {
      valid: false,
      error: 'Email required',
      fieldName: 'EMAIL',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.email)) {
    const obj: IError = {valid: true, error: empty, fieldName: 'EMAIL'};
    error.push(obj);
  }
  if (Validator.isEmpty(state.pincode)) {
    const obj: IError = {
      valid: false,
      error: 'Pincode required',
      fieldName: 'PINCODE',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.pincode)) {
    const obj: IError = {valid: true, error: empty, fieldName: 'PINCODE'};
    error.push(obj);
  }
  if (Validator.isEmpty(state.address)) {
    const obj: IError = {
      valid: false,
      error: 'Address required',
      fieldName: 'ADDRESS',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.address)) {
    const obj: IError = {valid: true, error: empty, fieldName: 'ADDRESS'};
    error.push(obj);
  }
  if (state.iba_approval_status == ibaApprovalOptions[1]) {
    if (Validator.isEmpty(state.iba_approval_code)) {
      const obj: IError = {
        valid: false,
        error: 'IBA Code required',
        fieldName: 'IBA_APPROVAL_CODE',
      };
      error.push(obj);
    } else if (!Validator.isEmpty(state.iba_approval_code)) {
      const obj: IError = {
        valid: true,
        error: empty,
        fieldName: 'IBA_APPROVAL_CODE',
      };
      error.push(obj);
    }
    if (Validator.isEmpty(state.iba_expiry_date)) {
      const obj: IError = {
        valid: false,
        error: 'IBA Expiry Date required',
        fieldName: 'IBA_EXPIRY_DATE',
      };
      error.push(obj);
    } else if (!Validator.isEmpty(state.iba_expiry_date)) {
      const obj: IError = {
        valid: true,
        error: empty,
        fieldName: 'IBA_EXPIRY_DATE',
      };
      error.push(obj);
    }
  } else if (state.iba_approval_status == ibaApprovalOptions[0]) {
    const obj1: IError = {
      valid: true,
      error: empty,
      fieldName: 'IBA_APPROVAL_CODE',
    };
    error.push(obj1);
    const obj2: IError = {
      valid: true,
      error: empty,
      fieldName: 'IBA_EXPIRY_DATE',
    };
    error.push(obj2);
  }
  if (Validator.isEmpty(state.company_type)) {
    const obj: IError = {
      valid: false,
      error: 'Company Type required',
      fieldName: 'COMPANY_TYPE',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.company_type)) {
    const obj: IError = {valid: true, error: empty, fieldName: 'COMPANY_TYPE'};
    error.push(obj);
  }
  if (Validator.isEmpty(state.govt_document)) {
    const obj = {
      valid: false,
      error: 'Govt. Document required',
      fieldName: 'GOVT_DOCUMENT',
    };
    error.push(obj);
  } else if (!Validator.isEmpty(state.govt_document)) {
    if (docType && docType === 'PAN') {
      const isValidDocument = Validator.panCard(state.govt_document);
      if (isValidDocument) {
        const obj = {valid: true, error: empty, fieldName: 'GOVT_DOCUMENT'};
        error.push(obj);
      } else {
        const obj = {
          valid: false,
          error: 'Invalid PAN card',
          fieldName: 'GOVT_DOCUMENT',
        };
        error.push(obj);
      }
    } else {
      const obj = {valid: true, error: empty, fieldName: 'GOVT_DOCUMENT'};
      error.push(obj);
    }
  }
  return error;
};

export const getError = (
  fieldName: string,
  state: IState,
  shouldValidate: boolean,
  docType?: string,
): string => {
  const errors: IError[] = validate(state, docType);
  const error: IError = errors.find(
    (d: IError) => d.fieldName == fieldName,
  ) as IError;
  return shouldValidate ? error?.error : '';
};
