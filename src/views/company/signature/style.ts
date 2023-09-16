import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_WHITE,
} from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
  rowContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  button: {
    width: '48%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLOR_BLACK,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontWeight: '400',
  },
  signatureImageContainer: {
    width: width * 0.95,
    height: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR_GRAY,
    borderWidth: 1,
  },
  sign: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prevButtonContainer: {
    width: '50%',
  },
  nextButtonContainer: {
    width: '50%',
  },
  buttonStyle2: {
    backgroundColor: COLOR_BLUE,
    width: '80%',
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: COLOR_WHITE,
  },
});

export default styles;
