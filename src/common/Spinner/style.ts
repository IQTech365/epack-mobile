import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_WHITE } from '../../utils/colors';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  transparent: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
  },
  opaque: {
    backgroundColor: COLOR_WHITE,
  }
});

export default styles;
