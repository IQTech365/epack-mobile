import {StyleSheet} from 'react-native';
import { COLOR_WHITE } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparent: {
      backgroundColor: 'transparent',
  },
  opaque: {
    backgroundColor: COLOR_WHITE,
  }
});

export default styles;
