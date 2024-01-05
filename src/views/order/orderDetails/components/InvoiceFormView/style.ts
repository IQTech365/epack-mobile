import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
  },
  elementContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  elementContainer3: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  elementContainer2: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  label: {
    fontFamily: 'WorkSans-Medium',
    color: COLOR_BLACK,
    fontSize: 14,
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
  switchMainWrapper3: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_GRAY2,
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
  outerCircleStyle: {
    width: '100%',
  },
  innerCircleStyle: {
    width: '80%',
  },
  switchStyle: {
    width: '100%',
  },
  labelContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  switchMainWrapper2: {
    backgroundColor: COLOR_WHITE,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  switchMainWrapper: {
    backgroundColor: COLOR_GRAY2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  datePickerContainer: {
    width: width * 0.9,
  },
  // checkbox styles
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
    fontFamily: 'WorkSans-Regular',
    color: COLOR_BLACK,
    textDecorationLine: 'none',
    fontSize: 15,
  },
  textContainerStyle: {
    paddingLeft: 0,
    marginLeft: 10,
  },
  style: {
    marginRight: 45,
  },
  checkboxContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle2: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
});

export default styles;
