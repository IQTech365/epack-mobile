import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_GRAY4, COLOR_GRAY5 } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.7,
    borderColor: COLOR_GRAY4,
    padding: 5,
    borderRadius: 5,
    height: 46,
  },
  dropdownIcon: {
    position: 'absolute',
    top: 14,
    right: 10,
  },
  container: {
    position: 'relative',
  },
  optionsContainer: {
    left: 0,
    right: 0,
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    elevation: 4,
    position: 'absolute',
    alignSelf: 'center',
  },
  optionItem: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY5,
  },
  closeButtonStyle: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: 5,
    right: '2%',
    zIndex: 2,
    width: width * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
