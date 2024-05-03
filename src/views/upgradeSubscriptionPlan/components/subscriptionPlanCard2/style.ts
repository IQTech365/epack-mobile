import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY5, COLOR_WHITE, OFF_WHITE} from '../../../../utils/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 35,
    backgroundColor: COLOR_WHITE,
    marginTop: -80,
  },
  contentContainer: {
    width: '100%',
    height: height * 0.7,
    alignSelf: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  planNameAndPriceContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  planTypeText: {
    color: COLOR_WHITE,
    fontSize: 24,
    fontFamily: 'WorkSans-Bold'
  },
  planPriceText: {
    color: COLOR_WHITE,
    fontSize: 30,
    fontFamily: 'WorkSans-Bold'
  },
  planDurationText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontFamily: 'WorkSans-SemiBold'
  },
  featureWrapper: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  planFeatureContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  featureTitleText: {
    color: COLOR_BLACK,
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
    paddingLeft: 5,
  },
  featuresText: {
    color: COLOR_GRAY,
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
  },
  featuresText2: {
    color: COLOR_BLACK,
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    paddingLeft: 5,
  },
  featureValuesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 30,
  },
  featureValuesContainer2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 60,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLOR_BLACK,
    marginRight: 5,
  },
  buttonContainer: {
    width: width * 0.6,
    marginVertical: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 30,
  },
  planDurationContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: COLOR_GRAY,
    backgroundColor: COLOR_WHITE,
  },
  dropDownContainer: {
    backgroundColor: COLOR_WHITE,
  },
  dropDownStyle: {
    height: 60,
    borderWidth: 0,
    backgroundColor: COLOR_WHITE,
  },
  selectedTextStyle: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 18,
  }
});

export default styles;
