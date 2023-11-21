import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_GRAY2} from '../../../../utils/colors';
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR_GRAY2,
  },
  emptyContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
