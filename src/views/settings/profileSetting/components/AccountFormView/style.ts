import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: COLOR_GRAY2,
    borderRadius: 5,
  },
  container: {
    width: width,
    backgroundColor: COLOR_WHITE,
    flex: 1,
  },
  closeContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    flex: 1,
  },
  mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  applicableWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textContainer2: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_BLACK,
    paddingLeft: 4,
    borderWidth: 0.5,
  },
  switchInputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 0,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  outerCircleStyle: {
    width: '100%',
  },
  switchStyle: {
    width: '100%',
  },
  buttonStyle: {
    width: width * 0.44,
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  checkboxItem: {
    paddingVertical: 5,
  },
  iconStyle:{
    borderColor: 'red',
    borderRadius: 0,
    width: 18,
    height: 18,
  },
  innerIconStyle:{
    borderWidth: 1,
    borderRadius: 0,
    width: 18,
    height: 18,
  },
  textStyle2:{
    fontFamily: 'WorkSans-Regular',
    textDecorationLine: 'none',
    color: COLOR_BLACK,
  }
});

export default styles;
