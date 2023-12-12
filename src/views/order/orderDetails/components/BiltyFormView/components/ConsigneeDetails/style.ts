import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../../../utils/colors';
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    // alignItems: 'flex-start',
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  label2: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontWeight: '600',
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
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  materialItemContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY2,
    padding: 15,
  },
  materialItem: {
    flexDirection: 'row',
  },
  materialLabelText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontWeight: '500',
  },
  materialValueText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '400',
  },
  iconStyle:{
    borderColor: 'red',
    borderRadius: 0,
    width: 18,
    height: 18,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 0,
    width: 18,
    height: 18,
  },
  textStyle2: {
    fontFamily: 'JosefinSans-Regular',
    textDecorationLine: 'none',
  }
});

export default styles;
