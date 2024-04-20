import React, {FC, useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
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
  IPurchasedSubscription,
  IRazorPayCreateOrderPayload,
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
    console.log('purchasedSubscriptions--', JSON.stringify(data));

    let plan: IPurchasedSubscription | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      plan = data[0] as IPurchasedSubscription;
    }
    return plan;
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
        <CurrentPlanCard data={_getCurrentPlanInfo()} />
      ) : (
        <EmptyPlanCard onPress={handleBuyNow} />
      )}
    </View>
  );
};

export default SubscriptionView;
