import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_WHITE} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.30,
    height: width * 0.30,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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
    width: 30,
    height: 30,
    backgroundColor: COLOR_BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontWeight: '400'
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
    fontWeight: '500'
  }
});

export default styles;
