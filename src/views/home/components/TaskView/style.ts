import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_WHITE} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: COLOR_WHITE,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countContainer: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 28,
    height: 28,
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: COLOR_WHITE,
    fontSize: 12,
    fontFamily: 'WorkSans-Regular'
  },
  taskNameContainer: {
    position: 'absolute',
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    bottom: 0,
    paddingVertical: 3,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
  },
  taskNameText: {
    textAlign: 'center',
    color: COLOR_BLACK,
    fontSize: 12,
    fontFamily: 'WorkSans-Medium'
  }
});

export default styles;
