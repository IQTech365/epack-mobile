import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_WHITE,
} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItemContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  rowItemContainer2: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  labelText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontFamily: 'WorkSans-Medium'
  },
  valueText: {
    color: COLOR_GRAY,
    fontSize: 12,
    fontFamily: 'WorkSans-Regular'
  },
});

export default styles;
