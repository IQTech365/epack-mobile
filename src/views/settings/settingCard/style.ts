import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_ORANGE,
  COLOR_WHITE,
} from '../../../utils/colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
    
  },
  container: {
    width: width * 0.42,
    height:height*0.2,
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
    justifyContent: 'center'
  },
  cardTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR_BLACK,
    zIndex: 999,
  },
  gearContainer: {
    position: 'absolute',
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default styles;
