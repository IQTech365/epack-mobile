import { Reducer } from "react"

export enum ACTION {
    SHIFTING_TYPE = 'SHIFTING_TYPE',
}

export interface IState {
    shifting_type: string,
}

export interface IAction {
    type: ACTION,
    payload: string,
}

export const initialState:IState = {
    shifting_type: '',
}

export const quotationReducer:Reducer<IState, IAction> = (state:IState, action:IAction) => {
    const {type, payload} = action;
    switch (type) {
      case ACTION.SHIFTING_TYPE:
        return {...state, shiftingType: payload as string};
      default:
        return state;
    }
}