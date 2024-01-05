import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY2} from '../../../../../../../utils/colors';
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
});

export default styles;
