import {billingByOptions} from './utils';

export enum ACTION {
  BILING_TYPE = 'BILING_TYPE',
  SAME_AS_CLIENT_ADDRESS = 'SAME_AS_CLIENT_ADDRESS',
}

interface State {
  billing_type: string;
  same_as_client_address: boolean;
}

interface Action {
  type: ACTION;
  payload: string | boolean;
}

export const initialState: State = {
  billing_type: billingByOptions[0],
  same_as_client_address: true,
};

export const invoiceReducer = (state: State, action: Action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.BILING_TYPE:
      return {...state, billing_type: payload as string};
    case ACTION.SAME_AS_CLIENT_ADDRESS:
      return {...state, same_as_client_address: payload as boolean};
    default:
      return state;
  }
};
