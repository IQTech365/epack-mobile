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
    justifyContent: 'space-around'
  },

  switchMainWrapper: {
    backgroundColor: COLOR_GRAY2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  switchMainWrapper2: {
    backgroundColor: COLOR_WHITE,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  switchMainWrapper3: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_GRAY2,
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
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
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
  signatureWrapper: {
    width: width * 0.90,
    height: 200,
    alignSelf: 'center',
    borderColor: COLOR_GRAY2,
    borderWidth: 1,
  },
  signature: {
    width: width * 0.88,
    height: 198,
    alignSelf: 'center',
    borderColor: COLOR_GRAY2,
    borderWidth: 1,
  },
  rowContainer: {
    width: width * 0.80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  rowContainer2: {
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  button: {
    width: '44%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLOR_BLACK,
    flexDirection: 'row',
  },
  buttonStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
  signatureUploadContainer: {
    width: width * 0.90,
    height: 198,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR_GRAY,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed'
  },
});

export default styles;
