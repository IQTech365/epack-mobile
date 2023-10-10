import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK } from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_BLACK,
  },
  dropdownIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
  container: {
    position: 'relative',
    width: width * 0.9,
    justifyContent: 'center',
    
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
    width: '80%',
    // backgroundColor: 'red'
  },
  closeButtonStyle: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: 15,
    right: '2%',
    zIndex: 2,
    width: width * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
