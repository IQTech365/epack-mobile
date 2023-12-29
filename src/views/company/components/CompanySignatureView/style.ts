import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_WHITE,
} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  signatureWrapper: {
    width: width * 0.95,
    height: 200,
    alignSelf: 'center',
    borderColor: COLOR_BLACK,
    borderWidth: 1,
  },
  signature: {
    width: width * 0.93,
    height: 198,
    alignSelf: 'center',
    borderColor: COLOR_BLACK,
    borderWidth: 1,
  },
  titleText: {
    fontSize: 18,
    color: COLOR_BLACK,
    fontWeight: '400',
    paddingHorizontal: 16,
  },
  uploadButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_BLUE,
    margin: 10,
    borderRadius: 25,
  },
  resetButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_GRAY,
    margin: 10,
    borderRadius: 25,
  },
  rowContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLOR_BLACK,
    borderStyle: 'dashed',
    borderRadius: 5,
    paddingVertical: 30,
  },
  button: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontWeight: '400',
  },
  text2: {
    fontSize: 14,
    color: COLOR_WHITE,
    fontWeight: '400',
  },
  buttonContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle2: {
    backgroundColor: COLOR_BLUE,
    width: '50%',
    alignSelf: 'center',
    paddingVertical: 8,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '400',
  },
  iconStyle: {
    borderColor: 'red',
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  textStyle2: {
    fontFamily: 'JosefinSans-Regular',
    textDecorationLine: 'none',
    color: COLOR_BLACK,
  },
  checkboxContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: COLOR_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
  },
  closeIconContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
