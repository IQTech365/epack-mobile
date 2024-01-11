import React, {useEffect, useState} from 'react';
import {View, Dimensions, ImageBackground} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../../common/Header';
const {width, height} = Dimensions.get('window');
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addPurchaseRequest,
  createRazorpayRequest,
  getSubmoduleFeaturesRequest,
  getSubmodulesRequest,
  getSubscriptionPlansRequest,
  resetAddPurchaseRequest,
  resetCreateRazorpayRequest,
} from '../../redux/slices/SubscriptionSlice';
import {getModulesRequest} from '../../redux/slices/UserRoleManagementSlice';
import {
  IAddPurchaseRequest,
  IRazorPayCreateOrderPayload,
  ISubscriptionPlan,
} from '../../interface/subscription/subscription';
import {IDurationConverter, getDurationConverter, getNextRenewableDate, prepareSubscriptionPlanList} from './utils';
import BackgroundImage from '../../images/subscription_bg.png';
import SubscriptionPlanCard2 from './components/subscriptionPlanCard2';
import RazorpayCheckout from 'react-native-razorpay';
import * as SubscriptionService from '../../service/SubscriptionService';
import {ToastType, showToast} from '../../utils/utility';
import Spinner from '../../common/Spinner';
import {AuthStackRoute} from '../../utils/constants';
import useAuthId from '../../hooks/useAuthId';
import {formatDate4} from '../../utils/formatter';
import subscriptions from '../../data/subscrptionplans.json';

const SubscriptionPlanView = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {
    subscriptionPlans,
    getSubscriptionPlansRequesting,
    getSubscriptionPlansRequestSuccess,
    submoduleFeatures,
    getSubmoduleFeaturesRequesting,
    getSubmoduleFeaturesRequestSuccess,
    getSubmodulesRequesting,
    getSubmodulesRequestSuccess,
    submodules,
    addPurchaseRequesting,
    addPurchaseSuccess,
    addPurchaseFailure,
    addPurchaseInfo,
    createRazorpayOrderRequesting,
    createRazorpayOrderSuccess,
    createRazorpayOrderFailure,
    razorpayOrder
  } = useAppSelector(state => state.Subscription);

  const {modules, getModulesRequesting, getModulesSuccess} = useAppSelector(
    state => state.UserRole,
  );
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<ISubscriptionPlan>();
  const [planAmount, setPlanAmount] = useState<number>(0);
  const [planDuration, setPlanDuration] = useState<string>('');
  const {data: subscriptionData} = subscriptionPlans || {};
  const {data: moduleData} = modules || {};
  const {data: submoduleData} = submodules || {};
  const {data: submoduleFeatureData} = submoduleFeatures || {};

  const handleByPlan = async (plan: ISubscriptionPlan, amount:number, duration:string) => {
    setSubscriptionPlan(plan);
    setPlanAmount(amount);
    setPlanDuration(duration);
    // Create Order on Server
    const payload:IRazorPayCreateOrderPayload = {
      amount: amount * 100,
      currency: 'INR',
    }
    dispatch(createRazorpayRequest(payload));
  };

  const _addPurchase = (plan: ISubscriptionPlan, orderId:string) => {
    const durationConvert:IDurationConverter = getDurationConverter(planDuration);
    const payload: IAddPurchaseRequest = {
      purchaseOrderId: orderId,
      authId: authId,
      subscriptionId: plan._id,
      subscriptionPlan: '',
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
        email: 'essencewebtech@gmail.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#53a20e'},
    };
    try {
      RazorpayCheckout.open(options)
        .then((data: any) => {
          console.log('Payment-Success----', data.razorpay_payment_id);
          showToast(data.razorpay_payment_id, ToastType.SUCCESS);
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

  useEffect(() => {
    if (!addPurchaseRequesting && addPurchaseSuccess) {
      dispatch(resetAddPurchaseRequest());
      navigation.replace("CompanyBasicInfo");
    } else if (!addPurchaseRequesting && addPurchaseFailure) {
      // README: If payment is done and plan is not activated due to server issue. 
      // Then needs to activte the plan from backend. 
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
    <ImageBackground
      style={{flex: 1, height: height, width: width}}
      source={BackgroundImage}>
      <Header canGoBack={true} label="Choose Subscription Plan" />
      <Carousel
        loop
        width={width}
        mode="parallax"
        // autoPlay={true}
        data={_prepareSubscriptionPlanList()}
        // data={subscriptions}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          return (
            <View>
              {/* <SubscriptionPlanCard item={item} onPress={() => {}}/> */}
              <SubscriptionPlanCard2 item={item} onPress={handleByPlan} />
              <Spinner show={paymentProcessing || addPurchaseRequesting} />
            </View>
          );
        }}
      />
    </ImageBackground>
  );
};

export default SubscriptionPlanView;
