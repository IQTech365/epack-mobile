import {StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_GRAY6,
  COLOR_WHITE,
} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
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
    fontFamily: 'WorkSans-Bold'
  },
  enquiryDateText: {
    color: COLOR_BLACK,
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'WorkSans-SemiBold'
  },
  container: {
    width: width * 0.9,
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
    width: '60%',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contactOptionsContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8,
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
  },
  rowItemContainer: {
    width: '40%',
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
    width: '60%',
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
    fontSize: 13,
    fontFamily: 'WorkSans-SemiBold'
  },
  amountText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontWeight: '500',
  },
  viewDetailsText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontWeight: '600',
  },
  labelText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontFamily: 'WorkSans-SemiBold'
  },
  valueText: {
    color: COLOR_GRAY,
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
  orderDocuemntContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap', 
    // paddingVertical: 8, 
    paddingHorizontal: 10,
    // backgroundColor: 'red'
  },
});

export default styles;
