import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GREEN,
  COLOR_WHITE,
} from '../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elementContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  elementContainer2: {
    flexWrap: 'wrap',
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  labelContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium'
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
    borderWidth: 0.5,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  twoColumnWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  datePickerContainer: {
    width: width * 0.9,
  },
  errorContainer: {
    width: width * 0.9,
    paddingHorizontal: 20,
  },
  error: {
    color: COLOR_ERROR,
    fontSize: 14,
  },
  customerItemContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_GREEN,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  customerNameText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '400',
  },
  iconStyle:{
    borderColor: 'red',
    borderRadius: 0,
    width: 16,
    height: 16,
  },
  innerIconStyle:{
    borderWidth: 1,
    borderRadius: 0,
    width: 16,
    height: 16,
  },
  textStyle2:{
    fontFamily: 'WorkSans-Regular',
    textDecorationLine: 'none',
    color: COLOR_BLACK
  }
});

export default styles;
