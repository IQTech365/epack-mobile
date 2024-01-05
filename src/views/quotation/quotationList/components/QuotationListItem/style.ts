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
  cardWrapper: {
    borderRadius: 8,
    borderTopLeftRadius: 0,
    alignItems: 'center',
    marginBottom: 15,
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
    padding: 6,
    backgroundColor: COLOR_GRAY6,
    borderTopRightRadius: 5,
  },
  dateContainer: {
    width: '30%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
  },
  nameContainer: {
    width: '60%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    // alignItems: 'center',
    borderRadius: 8,
  },
  quotationNumberContainer: {
    width: '40%',
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
    borderRadius: 15,
    marginRight: 4,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 4,
    // paddingHorizontal: 4,
    // padding: 6,
  },
  rowItemContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: COLOR_GRAY3,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
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
    color: COLOR_BLACK,
    fontSize: 13,
    fontFamily: 'WorkSans-Bold'
  },
  destinationTypeText: {
    color: COLOR_BLACK,
    fontSize: 10,
    fontFamily: 'WorkSans-Regular'
  },
  destinationText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontFamily: 'WorkSans-Medium'
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
    backgroundColor:COLOR_GRAY2,
  },
  viewDetailContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  viewDetail: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
