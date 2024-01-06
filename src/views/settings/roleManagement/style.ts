import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_ERROR,
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
  elementContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    fontSize: 14,
    fontFamily: 'WorkSans-Medium'
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
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  usernameAvailablityStatusContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  usernameAvailableInfoText: {
    fontSize: 14,
    color: COLOR_GREEN,
    fontFamily: 'WorkSans-Regular',
  },
  usernameNotAvailableInfoText: {
    fontSize: 14,
    color: COLOR_ERROR,
    fontFamily: 'WorkSans-Regular',
  },
  submoduleContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  submoduleFeaturesContainer: {
    flexWrap: 'wrap',
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
