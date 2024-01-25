import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalStyle: {
    width: width,
    height: height,
  },
  headerStyle: {
    width: width,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default styles;
