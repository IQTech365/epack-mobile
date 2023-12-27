import React, {useEffect} from 'react';
import {View, ScrollView, Dimensions, ImageBackground} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../../common/Header';
import SubscriptionPlanCard from './components/subscriptionPlanCard';
const {width, height} = Dimensions.get('window');
import subscriptionplans from '../../data/subscrptionplans.json';
import {COLOR_GRAY5} from '../../utils/colors';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  getSubmoduleFeaturesRequest,
  getSubmodulesRequest,
  getSubscriptionPlansRequest,
} from '../../redux/slices/SubscriptionSlice';
import {getModulesRequest} from '../../redux/slices/UserRoleManagementSlice';
import {ISubscriptionPlan} from '../../interface/subscription/subscription';
import { prepareSubscriptionPlanList } from './utils';
import BackgroundImage from '../../images/subscription_bg.png';

const SubscriptionPlanView = () => {
  const dispatch = useAppDispatch();
  const {
    subscriptionPlans,
    getSubscriptionPlansRequesting,
    getSubscriptionPlansRequestSuccess,
    submoduleFeatures,
    getSubmoduleFeaturesRequesting,
    getSubmoduleFeaturesRequestSuccess,
    getSubmodulesRequesting,
    getSubmodulesRequestSuccess,
    submodules
  } = useAppSelector(state => state.Subscription);
  console.log('submodules----', JSON.stringify(submodules));
  
  const {modules, getModulesRequesting, getModulesSuccess} = useAppSelector(
    state => state.UserRole,
  );
  const {data: subscriptionData} = subscriptionPlans || {};
  const {data: moduleData} = modules || {};
  const {data: submoduleData} = submodules || {};
  const {data: submoduleFeatureData} = submoduleFeatures || {};
  const handleByPlan = (planType: string) => {
    // TODO: Process Payment and the move user to Dashboard
  };

  const _prepareSubscriptionPlanList = (): ISubscriptionPlan[] => {
    return prepareSubscriptionPlanList(subscriptionData, moduleData, submoduleData, submoduleFeatureData);
  };
  console.log('_prepareSubscriptionPlanList---', JSON.stringify(_prepareSubscriptionPlanList()));

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
      getModulesSuccess && getSubmodulesRequestSuccess
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
    <ImageBackground style={{flex: 1, height:height, width: width}} source={BackgroundImage}>
      <Header canGoBack={true} label="Choose Subscription Plan" />
      <Carousel
        loop
        width={width}
        mode="parallax"
        // autoPlay={true}
        data={subscriptionplans}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <SubscriptionPlanCard item={item} onPress={handleByPlan} />
            </ScrollView>
          );
        }}
      />
    </ImageBackground>
  );
};

export default SubscriptionPlanView;
