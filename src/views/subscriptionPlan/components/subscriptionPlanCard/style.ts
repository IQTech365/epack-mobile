import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_GRAY5, COLOR_WHITE} from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    width: width * 0.95,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: COLOR_WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // padding: 4,
  },
  contentContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  planNameAndPriceContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  planTypeText: {
    color: COLOR_WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  planPriceText: {
    color: COLOR_WHITE,
    fontSize: 30,
    fontWeight: 'bold',
  },
  planDurationText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontWeight: 'normal',
  },
  featureWrapper: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLOR_GRAY5,
  },
  planFeatureContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  featureTitleText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  featuresText: {
    color: COLOR_BLACK,
    fontSize: 12,
    fontWeight: 'normal',
  },
  featuresText2: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  featureValuesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 40,
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
    marginRight: 10,
  },
  buttonContainer: {
    width: width * 0.6,
    marginVertical: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default styles;
