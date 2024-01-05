import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_GRAY } from '../../../../../../../../../utils/colors';
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
    color: COLOR_BLACK,
    textDecorationLine: 'none',
    fontSize: 15,
  },
  textContainerStyle: {
    paddingLeft: 0, 
    marginLeft: 5
  },
  style: {
    marginRight: 20,
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
  }
});

export default styles;
