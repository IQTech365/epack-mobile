import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import Carousel from 'react-native-reanimated-carousel';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {IDurationConverter, getDurationConverter, getNextRenewableDate, prepareSubscriptionPlanList} from '../subscriptionPlan/utils';
import {IAddPurchaseRequest, IGetPurchasedSubscriptionParams, IPurchasedSubscription, IRazorPayCreateOrderPayload, ISubscriptionPlan} from '../../interface/subscription/subscription';
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
import { ToastType, showToast } from '../../utils/utility';
import { getCurrentCompanyId } from '../../utils/storage';
import CurrentPlanCard from './CurrentPlanCard';

const {width} = Dimensions.get('window');

interface IProps {}

const SubscriptionView: FC<IProps> = ({}) => {
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
    purchasedSubscriptions
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

  const handleUpgradePlan = async (plan: ISubscriptionPlan, amount:number, duration:string) => {
    setSubscriptionPlan(plan);
    setPlanAmount(amount);
    setPlanDuration(duration);
    if(plan.subscriptionType.toLocaleLowerCase() == 'free' && amount == 0) {
      // Get the Subscription without payment
      _addPurchase(plan, 'order_id_not_applicable');
    } else {
      // Create Order on Server
      const payload: IRazorPayCreateOrderPayload = {
        amount: amount * 100,
        currency: 'INR',
      };
      dispatch(createRazorpayRequest(payload));
    }
    
  };

  const _addPurchase = (plan: ISubscriptionPlan, orderId:string) => {
    const durationConvert:IDurationConverter = getDurationConverter(planDuration);
    const payload: IAddPurchaseRequest = {
      purchaseOrderId: orderId,
      authId: authId,
      subscriptionId: plan._id,
      subscriptionPlan: plan.subscriptionType,
      amountPaid: `${planAmount}`,
      discountAmount: '0',
      couponCode: '',
      expiryDate: getNextRenewableDate(durationConvert.days, durationConvert.months, durationConvert.years),
      status: 'active',
    };
    dispatch(addPurchaseRequest(payload));
  };

  const _getRazorpayOrderId = () => {
    let orderId:string = '';
    const {data} = razorpayOrder || {};
    if(data && data.hasOwnProperty('id')) {
      orderId = data.id;
    }
    return orderId;
  }

  const _doPayment = (plan: ISubscriptionPlan, orderId: string) => {
    const options: any = {
      description: 'Epack Book Subscription',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_M4tXt01eZSLSLA',
      amount: planAmount * 100,
      name: 'EpackBook',
      order_id: orderId, //'order_NJN9VIkIQc0G9J'
      prefill: {
        // email: 'essencewebtech@gmail.com',
        // contact: '9191919191',
        // name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    try {
      RazorpayCheckout.open(options)
        .then((data: any) => {
          console.log('Payment-Success----', data.razorpay_payment_id);
          showToast("Payment Success", ToastType.SUCCESS);
          setPaymentProcessing(false);
          setPaymentDone(true);
          _addPurchase(plan, orderId);
        })
        .catch((error: any) => {
          console.log('error----', JSON.stringify(error));
          showToast(
            `Error: ${error.code} | ${error.description}`,
            ToastType.ERROR,
          );
          setPaymentProcessing(false);
        });
    } catch (err) {
      console.log('error processing');
    }
  };

  const _prepareSubscriptionPlanList = (): ISubscriptionPlan[] => {
    return prepareSubscriptionPlanList(
      subscriptionData,
      moduleData,
      submoduleData,
      submoduleFeatureData,
    ).filter((d:ISubscriptionPlan) => d.subscriptionType !== 'free');
  };

  const _getPurchasedSubscription = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetPurchasedSubscriptionParams = {
        authId: authId,
        companyId: id as string,
      };
      dispatch(getPurchasedSubscriptionRequest(payload));
    }).catch(err => console.log('storage-fetch-error--', err));
  }

  const _getCurrentPlanInfo = () => {
    const {data} = purchasedSubscriptions || {};
    let plan:IPurchasedSubscription|null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      plan = data[0] as IPurchasedSubscription;
    }
    return plan;
  }

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

  useEffect(() => {
    if (!addPurchaseRequesting && addPurchaseSuccess) {
      dispatch(resetAddPurchaseRequest());
      //TODO:show plan upgrade message and refresh data
    } else if (!addPurchaseRequesting && addPurchaseFailure) {
      dispatch(resetAddPurchaseRequest());
    }
  }, [addPurchaseRequesting, addPurchaseSuccess, addPurchaseFailure]);

  useEffect(() => {
    if (!createRazorpayOrderRequesting && createRazorpayOrderSuccess) {
      // Start Payment process
      _doPayment(subscriptionPlan as ISubscriptionPlan, _getRazorpayOrderId());
      dispatch(resetCreateRazorpayRequest());
    } else if (!createRazorpayOrderRequesting && createRazorpayOrderFailure) {
      showToast('Error in Creating Order ID. Try again!', ToastType.ERROR);
      dispatch(resetCreateRazorpayRequest());
    }
  }, [createRazorpayOrderRequesting, createRazorpayOrderSuccess, createRazorpayOrderFailure]);

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Subscription" />
      <Spacer height={10} />
      <CurrentPlanCard data={_getCurrentPlanInfo()} />
      <Spacer height={40} />
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
          return <SubscriptionPlanCard2 item={item} onPress={handleUpgradePlan} />;
        }}
      />
    </View>
  );
};

export default SubscriptionView;
