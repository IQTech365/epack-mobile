import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  dropdownIcon: {
    position: 'absolute',
    top: 10,
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
    paddingVertical: 8,
    width: '80%',
  },
  closeButtonStyle: {
    position: 'absolute',
    alignItems: 'flex-end',
    right: '2%',
    zIndex: 2,
    width: width * 0.01,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
