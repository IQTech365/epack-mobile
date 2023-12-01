import {billingByOptions, loadTypeOptions} from './utils';

export enum ACTION {
  BILING_TYPE = 'BILING_TYPE',
  SAME_AS_CLIENT_ADDRESS = 'SAME_AS_CLIENT_ADDRESS',
  FREIGHT_LOAD_TYPE = 'FREIGHT_LOAD_TYPE',
}

interface State {
  billing_type: string;
  same_as_client_address: boolean;
  freight_load_type: string;
}

interface Action {
  type: ACTION;
  payload: string | boolean;
}

export const initialState: State = {
  billing_type: billingByOptions[0],
  same_as_client_address: true,
  freight_load_type: loadTypeOptions[0],
};

export const invoiceReducer = (state: State, action: Action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.BILING_TYPE:
      return {...state, billing_type: payload as string};
    case ACTION.SAME_AS_CLIENT_ADDRESS:
      return {...state, same_as_client_address: payload as boolean};
    case ACTION.FREIGHT_LOAD_TYPE:
      return {...state, freight_load_type: payload as string};
    default:
      return state;
  }
};
