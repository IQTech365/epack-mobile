import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../../../../../utils/colors';
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
    fontFamily: 'WorkSans-Medium'
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
    color: COLOR_BLACK,
  }
});

export default styles;
