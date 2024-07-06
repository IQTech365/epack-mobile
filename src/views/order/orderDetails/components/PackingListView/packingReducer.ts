import { formatDate4 } from "../../../../../utils/formatter";

export enum ACTION {
  PACKING_NO = 'PACKING_NO',
  PACKING_DATE = 'PACKING_DATE',
  PACKING_ITEMS = 'PACKING_ITEMS',
  NEW_PACKING_ITEMS = 'NEW_PACKING_ITEMS',
}

export interface IPackingItem {
  particular_name: string;
  quantity: string;
  packing_type: string;
  product_code: string;
  value_of_goods: string;
  description: string;
}

export interface IState {
  packing_no: string;
  packing_date: string;
  packing_items: IPackingItem[];
  new_packing_items: any[];
}

export const initialState: IState = {
  packing_no: '',
  packing_date: formatDate4(new Date()),
  packing_items: [],
  new_packing_items: [],
};

interface IAction {
  type: string;
  payload: string | IPackingItem[];
}

export const packingReducer = (state: IState, action: IAction) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.PACKING_NO:
      return {...state, packing_no: payload as string};
    case ACTION.PACKING_DATE:
      return {...state, packing_date: payload as string};
    case ACTION.PACKING_ITEMS:
      return {...state, packing_items: payload as IPackingItem[]};
      case ACTION.NEW_PACKING_ITEMS:
      return {...state, new_packing_items: payload as any[]};
    default:
      return state;
  }
};
