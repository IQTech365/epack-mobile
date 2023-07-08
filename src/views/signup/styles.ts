import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE, COLOR_GRAY, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  logo: {
    width: 54,
    height: 38,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
    borderRadius: 5,
  },
  forgotPasswordContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  forgot: {
    color: COLOR_GRAY,
    fontSize: 16,
  },
  signupContainer: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dontHaveAccount: {
    color: COLOR_GRAY,
    fontSize: 14,
    textAlign: 'center',
    marginRight: 5
  },
  signup: {
    color: COLOR_BLUE,
    fontSize: 16,
  },
});

export default styles;
