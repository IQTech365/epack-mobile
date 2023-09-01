//** ALL ACTIONS */

export enum PROFILE_ADDRESS_FORM_ACTION {
STREET ='STREET',
STATE ='STATE',
DISTRICT ='DISTRICT',
COUNTRY ='COUNTRY',
LANDMARK ='LANDMARK',
CITY ='CITY',
PINCODE ='PINCODE',
POST_OFFICE ='POST_OFFICE',
}

/**PROFILE ADDRESS STATE  */

interface IProfileAddressFormState {
    street : string;
    state : string ;
    district : string ;
    country : string;
    landmark : string ;
    city : string ;
    pincode : string ;
    postOffice :string;
}

/** ACTION INTERFACE */

interface IProfileAddressFormAction{
    type: PROFILE_ADDRESS_FORM_ACTION;
    payload : string ;
}
 
/** INITIAL STATE */

export const initialState : IProfileAddressFormState ={
    street :'',
    state : '',
    district : '',
    country :'',
    landmark : '',
    city : '', 
    pincode : '',
    postOffice :'',
}

/**PROFILE ADDRESS REDUCER */

export const profileAddressReducer =(
    state :IProfileAddressFormState,
    action : IProfileAddressFormAction,
) =>{
    const {type,payload} = action;
    switch(type) {
        case PROFILE_ADDRESS_FORM_ACTION.STREET:
      return {...state, street: payload};
    case PROFILE_ADDRESS_FORM_ACTION.STATE:
      return {...state, state: payload};
    case PROFILE_ADDRESS_FORM_ACTION.DISTRICT:
      return {...state, district: payload};
    case PROFILE_ADDRESS_FORM_ACTION.COUNTRY:
      return {...state, country: payload};
    case PROFILE_ADDRESS_FORM_ACTION.LANDMARK:
      return {...state, landmark: payload};
    case PROFILE_ADDRESS_FORM_ACTION.CITY:
      return {...state, city: payload};
    case PROFILE_ADDRESS_FORM_ACTION.PINCODE:
      return {...state, pincode: payload};
    case PROFILE_ADDRESS_FORM_ACTION.POST_OFFICE:
      return {...state, postOffice: payload};
    }
}