import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE, COLOR_WHITE} from '../../../utils/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  container: {
    width: width * 0.46,
    height: width * 0.46,
    padding: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    position: 'absolute',
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR_BLUE,
    zIndex: 999,
    marginTop: 10,
    fontFamily: 'WorkSans-Bold'
  },
  gearContainer: {
    position: 'absolute',
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
