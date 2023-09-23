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
    fontSize: 18,
    color: COLOR_BLACK,
  },
  title: {
    fontSize: 24,
  },
  templateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

export default styles;
