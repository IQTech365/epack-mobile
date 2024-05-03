import React, {FC, useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import Carousel from 'react-native-reanimated-carousel';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  IDurationConverter,
  getDurationConverter,
  getNextRenewableDate,
  prepareSubscriptionPlanList,
} from '../subscriptionPlan/utils';
import {
  IAddPurchaseRequest,
  IGetPurchasedSubscriptionParams,
  IPlan,
  IPurchasedSubscription,
  IRazorPayCreateOrderPayload,
  ISubscription,
  ISubscriptionPlan,
} from '../../interface/subscription/subscription';
import {
  addPurchaseRequest,
  createRazorpayRequest,
  getPurchasedSubscriptionRequest,
  getSubmoduleFeaturesRequest,
  getSubmodulesRequest,
  getSubscriptionPlansRequest,
  resetAddPurchaseRequest,
  resetCreateRazorpayRequest,
} from '../../redux/slices/SubscriptionSlice';
import {getModulesRequest} from '../../redux/slices/UserRoleManagementSlice';
import SubscriptionPlanCard2 from '../subscriptionPlan/components/subscriptionPlanCard2';
import RazorpayCheckout from 'react-native-razorpay';
import useAuthId from '../../hooks/useAuthId';
import {ToastType, showToast} from '../../utils/utility';
import {getCurrentCompanyId} from '../../utils/storage';
import CurrentPlanCard from './CurrentPlanCard';
import EmptyPlanCard from './EmptyPlanCard';
import {NavigationProp} from '@react-navigation/native';
import _ from 'underscore';
import PlanVariants from './PlanVariants';
import OtherSubscriptionPlan from './OtherSubscriptionPlan';

const {width} = Dimensions.get('window');

interface IProps {
  navigation: NavigationProp<any, any>;
}

const SubscriptionView: FC<IProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {
    subscriptionPlans,
    getSubscriptionPlansRequestSuccess,
    submoduleFeatures,
    getSubmoduleFeaturesRequestSuccess,
    getSubmodulesRequestSuccess,
    submodules,
    addPurchaseRequesting,
    addPurchaseSuccess,
    addPurchaseFailure,
    createRazorpayOrderRequesting,
    createRazorpayOrderSuccess,
    createRazorpayOrderFailure,
    razorpayOrder,
    purchasedSubscriptions,
  } = useAppSelector(state => state.Subscription);

  const {modules, getModulesSuccess} = useAppSelector(state => state.UserRole);
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<ISubscriptionPlan>();
  const [planAmount, setPlanAmount] = useState<number>(0);
  const [planDuration, setPlanDuration] = useState<string>('');
  //
  const [planVariants, setPlanVariants] = useState<IPlan[]>([]);
  const [otherPlans, setOtherPlans] = useState<ISubscriptionPlan[]>([]);

  const {data: subscriptionData} = subscriptionPlans || {};
  const {data: moduleData} = modules || {};
  const {data: submoduleData} = submodules || {};
  const {data: submoduleFeatureData} = submoduleFeatures || {};

  const handleBuyNow = async () => {
    navigation.navigate('Subscription');
  };

  const _prepareSubscriptionPlanList = (): ISubscriptionPlan[] => {
    return prepareSubscriptionPlanList(
      subscriptionData,
      moduleData,
      submoduleData,
      submoduleFeatureData,
    ).filter((d: ISubscriptionPlan) => d.subscriptionType !== 'free');
  };

  const _getPurchasedSubscription = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetPurchasedSubscriptionParams = {
          authId: authId,
          companyId: id as string,
        };
        dispatch(getPurchasedSubscriptionRequest(payload));
      })
      .catch(err => console.log('storage-fetch-error--', err));
  };

  const _getCurrentPlanInfo = () => {
    const {data} = purchasedSubscriptions || {};
    let plan: IPurchasedSubscription | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      plan = data[0] as IPurchasedSubscription;
    }
    return plan;
  };

  const _getCurrentSubscriptionType = () => {
    let subscriptionType: string = '';
    const plan: IPurchasedSubscription | null = _getCurrentPlanInfo();
    if (_.isObject(plan)) {
      const {subscription} = plan || {};
      if (_?.isArray(subscription) && subscription.length > 0) {
        const firstSubscription: ISubscription = subscription[0];
        if (_.isObject(firstSubscription)) {
          subscriptionType = firstSubscription.subscriptionType;
        }
      }
    }
    return subscriptionType.toUpperCase();
  };

  const _getPlanVariants = () => {
    const currentPlan: IPurchasedSubscription | null = _getCurrentPlanInfo();
    if (
      !_.isNull(currentPlan) &&
      !_.isEmpty(subscriptionData) &&
      _.isArray(subscriptionData) &&
      subscriptionData.length > 0
    ) {
      const _planSubscription: ISubscriptionPlan = subscriptionData.find(
        (plan: ISubscriptionPlan) => plan._id === currentPlan.subscriptionId,
      );
      const _otherPlans: ISubscriptionPlan[] = subscriptionData.filter(
        (plan: ISubscriptionPlan) => plan._id !== currentPlan.subscriptionId,
      );
      if (_.isObject(_planSubscription)) {
        const _variants: IPlan[] = _planSubscription.plans.filter(
          (p: IPlan) => p.duration !== currentPlan.subscriptionPlan,
        );
        setPlanVariants(_variants);
      }
      setOtherPlans(_otherPlans);
    }
  };

  useEffect(() => {
    _getPurchasedSubscription();
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
      _getPlanVariants();
    }
  }, [
    getSubscriptionPlansRequestSuccess,
    getSubmoduleFeaturesRequestSuccess,
    getModulesSuccess,
    getSubmodulesRequestSuccess,
  ]);

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Subscription" />
      <Spacer height={10} />
      {_getCurrentPlanInfo() ? (
        <ScrollView>
          <Spacer height={40} />
          <View style={styles.dividerLineContainer}>
            <View style={styles.line} />
            <View style={styles.plansBoxContainer}>
              <Text style={styles.plansText}>ACTIVE PLAN</Text>
            </View>
          </View>
          <Spacer height={40} />
          <CurrentPlanCard data={_getCurrentPlanInfo()} />
          <Spacer height={40} />
          <View style={styles.dividerLineContainer}>
            <View style={styles.line} />
            <View style={styles.plansBoxContainer}>
              <Text style={styles.plansText}>
                OTHER{' '}
                <Text style={styles.subscriptionText}>
                  {_getCurrentSubscriptionType()}
                </Text>{' '}
                PLANS
              </Text>
            </View>
          </View>
          <Spacer height={30} />
          <PlanVariants
            variants={planVariants}
            currentPlan={_getCurrentPlanInfo() as IPurchasedSubscription}
          />
          <Spacer height={40} />
          <View style={styles.dividerLineContainer}>
            <View style={styles.line} />
            <View style={styles.plansBoxContainer}>
              <Text style={styles.plansText}>MORE SUBSCRIPTION PLANS</Text>
            </View>
          </View>
          <Spacer height={40} />
          <OtherSubscriptionPlan plans={otherPlans} />
        </ScrollView>
      ) : (
        <EmptyPlanCard onPress={handleBuyNow} />
      )}
    </View>
  );
};

export default SubscriptionView;
