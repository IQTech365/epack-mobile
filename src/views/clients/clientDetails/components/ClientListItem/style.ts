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
    backgroundColor: COLOR_GRAY6,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  nameContainer: {
    width: '70%',
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    
  },
  contactOptionsContainer: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  },
  rowItemContainer: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_GRAY3,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
    paddingLeft: 8,
  },
  rowItemContainer2: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY2,
    paddingLeft: 8,
  },
  colonContainer: {
    width: '6%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
      color: COLOR_GRAY,
      fontSize: 16,
      fontFamily: 'WorkSans-SemiBold',
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
      color: COLOR_BLACK,
      fontSize: 14,
      fontFamily: 'WorkSans-Medium',
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
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
