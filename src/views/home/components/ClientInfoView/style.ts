import {StyleSheet, Dimensions} from 'react-native';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GREEN, COLOR_WHITE } from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
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
  nameText2: {
    color: COLOR_WHITE,
    fontSize: 24,
    fontFamily: 'WorkSans-Bold'
  },
  clientLogoContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
  },
  clientDetailContainer: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 16,
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-SemiBold'
  },
  labelText: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-SemiBold',
    marginRight: 8,
  },
  valueText: {
    fontSize: 14,
    color: COLOR_BLACK,
    fontFamily: 'WorkSans-Medium',
  },
  planText: {
    fontSize: 14,
    color: COLOR_WHITE,
    fontFamily: 'WorkSans-SemiBold'
  },
  planContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  planNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 15,
    // marginLeft: 8,
    backgroundColor: COLOR_GREEN,
  },
  buyNowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 8,
    backgroundColor: COLOR_GREEN,
  }
});

export default styles;
