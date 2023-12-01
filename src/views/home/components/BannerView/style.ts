import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_WHITE} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    height: width * 0.28,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
