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
    marginBottom: 10,
  },
  container: {
    width: width,
    backgroundColor: COLOR_WHITE,
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
  },
  innerCircleStyle: {
    width: '80%',
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
  applicableWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  checkboxItem: {
    paddingVertical: 5,
  },
  toolbarContentContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  editorContentContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    height: 250,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
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
