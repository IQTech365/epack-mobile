import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_BLUE, COLOR_GRAY2, COLOR_GRAY5, COLOR_WHITE } from '../../../../utils/colors';
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY2,
  },
  emptyContainer2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
