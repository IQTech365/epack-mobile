import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_BLUE2, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BLUE,
    alignItems: 'center'
  },
  clientInfoContainer: {
    width: width * 0.92,
    borderRadius: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  clientLogoContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientDetailContainer: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  cardWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 16,
    color: COLOR_BLACK,
    fontWeight: '600',
  },
  idText: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontWeight: '400',
  },
  taskContainer: {
    width: width * 0.92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureContainer: {
    width: width * 0.92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
});

export default styles;
