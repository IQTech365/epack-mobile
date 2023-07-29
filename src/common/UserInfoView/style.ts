import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {COLOR_BLUE2, COLOR_GRAY, COLOR_WHITE} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    resizeMode: 'stretch',
  },
  backgroundContainer: {
    width: '100%',
    backgroundColor: COLOR_BLUE2,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE,
  },
  avatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: COLOR_GRAY,
  },
  nameText: {
      color: COLOR_WHITE,
      fontSize: 18,
      fontWeight: '500',
  },
  text: {
    color: COLOR_WHITE,
      fontSize: 14,
  }
});

export default styles;
