import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_GRAY6, COLOR_ORANGE, COLOR_WHITE} from '../../../../../utils/colors';
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
    fontSize: 14,
    fontFamily: 'WorkSans-Bold'
  },
  orderDateText: {
    color: COLOR_BLACK,
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'WorkSans-SemiBold'
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
    backgroundColor: COLOR_GRAY6,
    borderTopRightRadius: 5,
  },
  nameContainer: {
    width: '40%',
    paddingVertical: 8,
    paddingLeft: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contactOptionsContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    alignItems: 'center',
    // borderRadius: 8,
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
  },
  rowItemContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: COLOR_GRAY3,
    borderBottomColor: COLOR_GRAY2,
    borderBottomWidth: 0.5,
  },
  rowItemContainer2: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: COLOR_WHITE,
    borderBottomColor: COLOR_GRAY2,
    borderBottomWidth: 0.5,
  },
  nameText: {
      color: COLOR_GRAY,
      fontSize: 12,
      fontFamily: 'WorkSans-SemiBold'
  },
  amountText: {
    color: COLOR_GRAY,
    fontSize: 12,
    fontWeight: '500'
  },
  viewDetailsText: {
    color: COLOR_GRAY,
    fontSize: 12,
    fontWeight: '600'
  },
  labelText: {
      color: COLOR_BLACK,
      fontSize: 12,
      fontFamily: 'WorkSans-Medium'
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 13,
    fontFamily: 'WorkSans-Regular'
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
