import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'red',
  },
  contentContainer: {
    alignItems: 'center',
  },
  closeContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});

export default styles;
