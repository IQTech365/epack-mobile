import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_ORANGE, COLOR_WHITE} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
    // marginVertical: 10,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bageContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  badgeText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  orderDateText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8
  },
  container: {
    width: width * 0.92,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateAndQuotationNumberContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    width: '40%',
    // height: 44,
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_GRAY2,
    // borderEndWidth: 15,
    // borderBottomRightRadius: 22,
    // borderTopLeftRadius: 8,
    // borderEndColor: COLOR_GRAY2,
    // borderTopStartRadius: 8,
    // borderLeftWidth: 10,
    // borderLeftColor: COLOR_ORANGE,
  },
  contactOptionsContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    // backgroundColor: COLOR_GRAY2,
    borderRadius: 8,
  },
  iconContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLOR_BLUE,
      borderRadius: 15,
      marginRight: 4,
  },
  rowContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingHorizontal: 8,
      padding: 6,
  },
  rowItemContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  nameText: {
      color: COLOR_GRAY,
      fontSize: 13,
      fontWeight: '500'
  },
  amountText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontWeight: '500'
  },
  viewDetailsText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontWeight: '600'
  },
  labelText: {
      color: COLOR_GRAY,
      fontSize: 13,
      fontWeight: '600'
  },
  valueText: {
    color: COLOR_GRAY,
    fontSize: 12,
    // fontWeight: '500'
  },
  viewDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: COLOR_BLUE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
},
});

export default styles;
