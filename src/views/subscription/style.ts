import {StyleSheet, Dimensions} from 'react-native';
import {COLOR_BLACK, COLOR_WHITE} from '../../utils/colors';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  gradientContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  currentPlanContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 5,
  },
  planNameText: {
    color: COLOR_WHITE,
    fontSize: 22,
    fontFamily: 'WorkSans-Bold',
  },
  planDaysText: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
  },
  planExpireText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center'
  },
  dividerLineContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '70%',
    height: 1,
    backgroundColor: COLOR_BLACK,
    alignSelf: 'center'
  },
  plansBoxContainer: {
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_BLACK,
  },
  plansText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
    textAlign: 'center'
  },
  cardWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
  },
  otherPlanContainer: {
    // width: '90%',
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLOR_BLACK,
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: COLOR_BLACK,
  },
  iconContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  otherPlanNameText: {
    color: COLOR_WHITE,
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
  },
  otherPlanDurationText: {
    color: COLOR_WHITE,
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLOR_WHITE,
  },
  subscribeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_WHITE,
  },
  subscribeText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorksSans-Regular'
  }
});

export default styles;
