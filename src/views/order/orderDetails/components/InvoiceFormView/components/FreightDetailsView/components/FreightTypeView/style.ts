import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK } from '../../../../../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainWrapper: {
    width: width * 0.98,
  },
  container: {
    width: width * 0.98,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionContainer: {
    width: width * 0.98,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    borderRadius: 0,
    width: 16,
    height: 16,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 0,
    width: 16,
    height: 16,
  },
  textStyle: {
    fontFamily: 'JosefinSans-Regular',
    textDecorationLine: 'none',
    fontSize: 14,
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
  labelText: {
    fontSize: 14,
    color: COLOR_BLACK,
  }
});

export default styles;
