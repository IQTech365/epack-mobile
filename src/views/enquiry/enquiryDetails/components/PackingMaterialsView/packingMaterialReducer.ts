import { Reducer } from 'react';

//** ALL ACTIONS */
export enum PACKING_MATERIAL_FORM_ACTION {
    LABOUR = 'LABOUR',
    PAKING_TAPES = 'PAKING_TAPES',
    BUBBLE_WRAPES = 'BUBBLE_WRAPES',
    CORRUGATE_SHEET = 'CORRUGATE_SHEET',
    WATERPROOF_LAMINATION = 'WATERPROOF_LAMINATION',
    THERMOCOL = 'THERMOCOL',
    CARTON_BOXES = 'CARTON_BOXES',
    AIR_BUBBLE = 'AIR_BUBBLE',
    NEW_PAPER = 'NEW_PAPER',
    FOAM_SHEET = 'FOAM_SHEET',
    PLASTIC_CARATE = 'PLASTIC_CARATE',
    WOODEN_FRAME = 'WOODEN_FRAME'
}

// **  packingitems Info
export type packingitems = {
    name: string,
    quantity: string,
    type: string
};

interface IPackingMaterialFormAction {
    type: PACKING_MATERIAL_FORM_ACTION;
    payload: packingitems;
}

const defaultPackingItem: packingitems = {
    name: '',
    quantity: '0',
    type: ''
};

/** ENQUIRY FORM STATE */
interface PackingMaterialFormState {
    Labour: packingitems,
    packingTape: packingitems,
    BubbleWrapes: packingitems,
    CorrugateSheet: packingitems,
    WaterproofLamination: packingitems,
    Thermocol: packingitems,
    CartonBoxes: packingitems,
    AirBubble: packingitems,
    NewPaper: packingitems,
    Foamsheet: packingitems,
    PlasticCarate: packingitems,
    WoodenFrame: packingitems,
}

/** INITIAL STATE */
export const initialState: PackingMaterialFormState = {
    Labour: defaultPackingItem,
    packingTape: defaultPackingItem,
    BubbleWrapes: defaultPackingItem,
    CorrugateSheet: defaultPackingItem,
    WaterproofLamination: defaultPackingItem,
    Thermocol: defaultPackingItem,
    CartonBoxes: defaultPackingItem,
    AirBubble: defaultPackingItem,
    NewPaper: defaultPackingItem,
    Foamsheet: defaultPackingItem,
    PlasticCarate: defaultPackingItem,
    WoodenFrame: defaultPackingItem,
};

/** Quotation Reducer */
export const packingMaterialReducer: Reducer<PackingMaterialFormState, IPackingMaterialFormAction> = (
    state: PackingMaterialFormState,
    action: IPackingMaterialFormAction,
) => {
    const { type, payload } = action;
    switch (type) {
        case PACKING_MATERIAL_FORM_ACTION.LABOUR:
            return { ...state, Labour: payload };
        case PACKING_MATERIAL_FORM_ACTION.PAKING_TAPES:
            return { ...state, packingTape: payload };
        case PACKING_MATERIAL_FORM_ACTION.BUBBLE_WRAPES:
            return { ...state, BubbleWrapes: payload };
        case PACKING_MATERIAL_FORM_ACTION.CORRUGATE_SHEET:
            return { ...state, CorrugateSheet: payload };
        case PACKING_MATERIAL_FORM_ACTION.WATERPROOF_LAMINATION:
            return { ...state, WaterproofLamination: payload };
        case PACKING_MATERIAL_FORM_ACTION.THERMOCOL:
            return { ...state, Thermocol: payload };
        case PACKING_MATERIAL_FORM_ACTION.CARTON_BOXES:
            return { ...state, CartonBoxes: payload };
        case PACKING_MATERIAL_FORM_ACTION.AIR_BUBBLE:
            return { ...state, AirBubble: payload };
        case PACKING_MATERIAL_FORM_ACTION.NEW_PAPER:
            return { ...state, NewPaper: payload };
        case PACKING_MATERIAL_FORM_ACTION.FOAM_SHEET:
            return { ...state, Foamsheet: payload };
        case PACKING_MATERIAL_FORM_ACTION.PLASTIC_CARATE:
            return { ...state, PlasticCarate: payload };
        case PACKING_MATERIAL_FORM_ACTION.WOODEN_FRAME:
            return { ...state, WoodenFrame: payload };
        default:
            return state;
    }
};
