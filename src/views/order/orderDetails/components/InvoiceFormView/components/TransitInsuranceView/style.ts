import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE} from '../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  halfWidthCompContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullWidthCompContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  compContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  optionContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  textStyle: {
    fontFamily: 'WorkSans-Regular',
    textDecorationLine: 'none',
    fontSize: 15,
    color: COLOR_BLACK,
  },
  textContainerStyle: {
    paddingLeft: 0, 
    marginLeft: 10
  },
  style: {
    marginRight: 25,
    marginBottom: 15,
  },
  checkboxContainer: {
    width: width * 0.90,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: COLOR_BLUE,
    width: width * 0.3,
  },
  buttonText: {
    color: COLOR_WHITE,
  },
  transitChargeContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: COLOR_GRAY,
    padding: 8,
    borderRadius: 5,
  },
  transitChargeContentWrapper: {
    width: '85%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  transitChargeContentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  transitChargeDeleteIconContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-Medium',
    fontSize: 14,
  },
  ValueText: {
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-Regualr',
    fontSize: 14,
  }
});

export default styles;
