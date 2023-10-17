import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE} from '../../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    alignItems: 'center',
  },
  container: {
    width: width * 0.92,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 6,
  },
  dateAndQuotationNumberContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  dateContainer: {
    width: '30%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    backgroundColor: COLOR_GRAY2,
    borderRadius: 8,
  },
  quotationNumberContainer: {
    width: '50%',
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    backgroundColor: COLOR_GRAY2,
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
      paddingHorizontal: 4,
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
  destinationTypeText: {
      color: COLOR_GRAY,
      fontSize: 10,
  },
  destinationText: {
    color: COLOR_GRAY,
    fontSize: 13,
    fontWeight: '500'
  },
  viewDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    // backgroundColor: COLOR_BLUE,
    borderTopWidth: 1,
    borderTopColor: COLOR_BLUE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
},
});

export default styles;
