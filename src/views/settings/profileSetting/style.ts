import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: COLOR_WHITE,
  },
  tabsContainer: {
    width: width,
    height: 40,
},

  textContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
});

export default styles;
