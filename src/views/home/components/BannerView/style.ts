import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_WHITE} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    height: width * 0.28,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  banner: {
    width: width * 0.92,
    height: width * 0.28,
    borderRadius: 8,
    resizeMode: 'contain'
  },
  carousel: {
    borderRadius: 8,
  }
});

export default styles;
