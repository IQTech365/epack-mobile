import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE2, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  header: {
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY,
    backgroundColor: COLOR_BLUE2,
  },
  titleText: {
    fontSize: 16,
    color: COLOR_WHITE,
    fontFamily: 'WorkSans-Bold'
  },
});

export default styles;
