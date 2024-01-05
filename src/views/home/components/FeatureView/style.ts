import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE2, COLOR_WHITE} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: 12,
    backgroundColor: COLOR_BLUE2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskNameContainer: {
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 3,
    alignItems: 'center',
  },
  taskNameText: {
    textAlign: 'center',
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-SemiBold'
  }
});

export default styles;
