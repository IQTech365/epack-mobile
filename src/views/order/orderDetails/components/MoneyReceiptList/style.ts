import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_ORANGE, COLOR_WHITE} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainWrapper: {
    alignItems: 'center',
  },
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.94
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
  enquiryDateText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8
  },
  container: {
    width: '100%',
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
    width: '60%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: COLOR_GRAY2,
    borderLeftColor: COLOR_ORANGE,
  },
  contactOptionsContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
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
      // paddingVertical: 4,
  },
  rowItemContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
    paddingLeft: 8,
  },
  rowItemContainer2: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
    paddingLeft: 8,
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
    color: COLOR_BLACK,
    fontSize: 13,
    fontFamily: 'WorkSans-SemiBold'
  },
  labelText: {
      color: COLOR_BLACK,
      fontSize: 14,
      fontFamily: 'WorkSans-Medium'
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 14,
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
    borderTopColor: COLOR_GRAY2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: COLOR_GRAY2,
},
});

export default styles;
