import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK} from '../../../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_BLACK,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  titleText:{
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
  }
});

export default styles;
