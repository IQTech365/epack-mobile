import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY2 } from '../../../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainWrapper: {
    width: width * 0.9,
  },
  container: {
    width: width * 0.9,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
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
    marginLeft: 10,
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
  labelText: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-Medium'
  },
  fullWidthContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
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
});

export default styles;
