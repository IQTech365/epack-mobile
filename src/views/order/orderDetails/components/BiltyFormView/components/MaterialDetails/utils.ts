import {ICheckboxButton} from 'react-native-bouncy-checkbox-group';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';

export const typeOfMovingOptions:string[] = ['Household', 'Vehicle', 'Commercial', '3PL']
export const riskTypeOptions:string[] = ['Owners Risk', 'Carrier Risk'];
export const liabilityOfTaxOptions:string[] = ['Consigner', 'Consignee', 'Carrier', 'Exempted'];
export const payTypeOptions:string[] = ['To Be Billed', 'To Pay', 'Paid'];
export const insuranceOptions:string[] = ['Insured', 'Not Insured'];

  export const insuranceOptions1: Array<ICheckboxButton> = [
    {
      id: '1',
      text: 'Insured',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'WorkSans-Regular', textDecorationLine: 'none', color: COLOR_BLACK},
      style: {paddingRight: 10},
    },
    {
      id: '2',
      text: 'Not Insured',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'WorkSans-Regular', textDecorationLine: 'none', color: COLOR_BLACK},
    },
  ];
