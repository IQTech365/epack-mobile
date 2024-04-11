import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_GRAY4, COLOR_GRAY5} from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 24,
    backgroundColor: '#FAF9F6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0, 0.1)',
  },
  sheetWrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  closeContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default styles;
