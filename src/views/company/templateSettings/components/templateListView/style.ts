import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK } from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    alignSelf: 'center',
  },
  headerContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  header: {
    fontSize: 20,
    color: COLOR_BLACK,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default styles;
