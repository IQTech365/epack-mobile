import React, {useEffect} from 'react';
import {View, Dimensions, ImageBackground} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../../common/Header';
const {width, height} = Dimensions.get('window');
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getSubmoduleFeaturesRequest,
  getSubmodulesRequest,
  getSubscriptionPlansRequest,
} from '../../redux/slices/SubscriptionSlice';
import {getModulesRequest} from '../../redux/slices/UserRoleManagementSlice';
import {
  ISubscriptionPlan,
} from '../../interface/subscription/subscription';
import {prepareSubscriptionPlanList} from './utils';
import BackgroundImage from '../../images/subscription_bg.png';
import SubscriptionPlanCard from './components/subscriptionPlanCard';

const UpgradeSubscriptionPlanView = (props: any) => {
  const {navigation, route} = props;
  const isUpgrade: boolean = route?.params?.isUpgrade;
  const dispatch = useAppDispatch();
  const {
    subscriptionPlans,
    getSubscriptionPlansRequestSuccess,
    submoduleFeatures,
    getSubmoduleFeaturesRequestSuccess,
    getSubmodulesRequestSuccess,
    submodules,
  } = useAppSelector(state => state.Subscription);

  const {modules, getModulesSuccess} = useAppSelector(state => state.UserRole);
  const {data: subscriptionData} = subscriptionPlans || {};
  const {data: moduleData} = modules || {};
  const {data: submoduleData} = submodules || {};
  const {data: submoduleFeatureData} = submoduleFeatures || {};

  const handleByPlan = async (plan: ISubscriptionPlan, amount:number, duration:string) => {
    navigation.navigate("Checkout", {subscriptionPlan: plan, amount: amount, duration: duration});
  };

  const _prepareSubscriptionPlanList = (): ISubscriptionPlan[] => {
    return prepareSubscriptionPlanList(
      subscriptionData,
      moduleData,
      submoduleData,
      submoduleFeatureData,
    );
  };

  useEffect(() => {
    dispatch(getSubscriptionPlansRequest());
    dispatch(getModulesRequest());
    dispatch(getSubmodulesRequest());
    dispatch(getSubmoduleFeaturesRequest());
  }, []);

  useEffect(() => {
    if (
      getSubscriptionPlansRequestSuccess &&
      getSubmoduleFeaturesRequestSuccess &&
      getModulesSuccess &&
      getSubmodulesRequestSuccess
    ) {
      _prepareSubscriptionPlanList();
    }
  }, [
    getSubscriptionPlansRequestSuccess,
    getSubmoduleFeaturesRequestSuccess,
    getModulesSuccess,
    getSubmodulesRequestSuccess,
  ]);

  

  return (
    <ImageBackground
      style={{flex: 1, height: height, width: width}}
      source={BackgroundImage}>
      <Header canGoBack={true} label="CHOOSE YOUR PLAN" />
      <Carousel
        loop
        width={width}
        mode="parallax"
        data={_prepareSubscriptionPlanList()}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          return (
            <View>
              <SubscriptionPlanCard item={item} onPress={handleByPlan} />
            </View>
          );
        }}
      />
    </ImageBackground>
  );
};

export default UpgradeSubscriptionPlanView;
