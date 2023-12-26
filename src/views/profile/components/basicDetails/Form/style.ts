import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_WHITE } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 20,
    paddingBottom: 20,
  },
  elementContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
    borderWidth: 0.5,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  labelContainer: {
    width: width * 0.9,
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
  elementContainer3: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  datePicker: {
      width: '100%',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  photoCaptureContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  button: {
    borderColor: COLOR_BLACK,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  checkboxContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  textStyle2:{
    fontFamily: 'JosefinSans-Regular',
    textDecorationLine: 'none',
    color: COLOR_BLACK
  }
});

export default styles;
