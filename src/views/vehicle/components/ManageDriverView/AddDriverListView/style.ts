import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3, COLOR_ORANGE, COLOR_WHITE} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  indexContainer: {
    width: 28,
    height: 32,
    backgroundColor: COLOR_BLUE,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText:{
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
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
    fontWeight: '500',
  },
  enquiryDateText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8
  },
  container: {
    width: width * 0.90,
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
      // paddingHorizontal: 8,
      // padding: 6,
  },
  rowItemContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    paddingVertical: 8,
    paddingLeft: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
  },
  rowItemContainer2: {
    width: '55%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
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
