import {ICheckboxButton} from 'react-native-bouncy-checkbox-group';
import {COLOR_BLUE} from '../../../../../../../utils/colors';

export const riskTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Owners Risk',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'Carrier Risk',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

export const typeOfMovingOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Household',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10, marginBottom: 10},
  },
  {
    id: '2',
    text: 'Vehicle',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10, marginBottom: 10},
  },
  {
    id: '3',
    text: 'Commercial',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10, marginBottom: 10},
  },
  {
    id: '4',
    text: '3PL',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

export const payTypeOptions: Array<ICheckboxButton> = [
    {
      id: '1',
      text: 'To Be Billed',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
      style: {paddingRight: 16},
    },
    {
      id: '2',
      text: 'To Pay',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
      style: {paddingRight: 16},
    },
    {
      id: '3',
      text: 'Paid',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    },
  ];

  export const insuranceOptions: Array<ICheckboxButton> = [
    {
      id: '1',
      text: 'Insured',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
      style: {paddingRight: 10},
    },
    {
      id: '2',
      text: 'Not Insured',
      fillColor: COLOR_BLUE,
      iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
      innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
      textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    },
  ];
