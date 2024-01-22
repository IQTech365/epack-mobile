import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY, COLOR_WHITE} from '../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  itemContainer: {
    width: width * 0.95,
    borderColor: COLOR_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingVertical: 5,
  },
  itemContentContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  itemActionContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNameContainer: {
    width: '60%',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightColor: COLOR_GRAY,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemQuantityContainer: {
    width: '20%',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemUnitContainer: {
    width: '20%',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftColor: COLOR_GRAY,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerContainer: {
    width: width * 0.95,
    borderColor: COLOR_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  headerTitleText: {
    fontSize: 16,
    color: COLOR_BLACK,
    fontWeight: '500',
  },
  packingInfoContainer: {
    width: width * 0.95,
    borderColor: COLOR_GRAY,
    alignItems: 'flex-start',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    padding: 6,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoLabelText: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontWeight: '500',
    paddingVertical: 3,
  },
  infoValueText: {
    fontSize: 14,
    color: COLOR_GRAY,
    fontWeight: '400',
    paddingVertical: 3,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
  },
});

export default styles;
