import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions, ImageBackground} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from '../../common/Header';
import SubscriptionPlanCard from './components/subscriptionPlanCard';
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
import {prepareSubscriptionPlanList} from './utils';
import BackgroundImage from '../../images/subscription_bg.png';
import SubscriptionPlanCard2 from './components/subscriptionPlanCard2';
import RazorpayCheckout from 'react-native-razorpay';
import * as SubscriptionService from '../../service/SubscriptionService';
import {ToastType, showToast} from '../../utils/utility';
import Spinner from '../../common/Spinner';
import {AuthStackRoute} from '../../utils/constants';
import useAuthId from '../../hooks/useAuthId';
import {formatDate4} from '../../utils/formatter';

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
  console.log('submodules----', JSON.stringify(submodules));

  const {modules, getModulesRequesting, getModulesSuccess} = useAppSelector(
    state => state.UserRole,
  );
  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const {data: subscriptionData} = subscriptionPlans || {};
  const {data: moduleData} = modules || {};
  const {data: submoduleData} = submodules || {};
  const {data: submoduleFeatureData} = submoduleFeatures || {};
  const handleByPlan = async (plan: ISubscriptionPlan) => {
    // Create Order on Server
    const payload:IRazorPayCreateOrderPayload = {
      amount: plan.amount * 100,
      currency: 'INR',
    }
    dispatch(createRazorpayRequest(payload));
    // _doPayment(plan);
  };

  const _addPurchase = (plan: ISubscriptionPlan) => {
    const payload: IAddPurchaseRequest = {
      authId: authId,
      subscriptionId: plan._id,
      purchaseDate: formatDate4(new Date()),
      expiryDate: '06-01-24',
      purchaseAmount: '100',
      status: 'active',
    };
    dispatch(addPurchaseRequest(payload));
  };

  const _doPayment = (plan: ISubscriptionPlan) => {
    const options: any = {
      description: 'Epack Book Subscription',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_Dl3dSM01ZoLIgz',
      amount: '5000',
      name: 'EpackBook',
      order_id: 'order_NJN9VIkIQc0G9J', //Replace this with an order_id created using Orders API.
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
          // handle success
          // alert(`Success: ${data.razorpay_payment_id}`);
          console.log('Payment-Success----', data.razorpay_payment_id);
          showToast(data.razorpay_payment_id, ToastType.SUCCESS);
          setPaymentProcessing(false);
          setPaymentDone(true);
          _addPurchase(plan);
        })
        .catch((error: any) => {
          // handle failure
          // alert(`Error: ${error.code} | ${error.description}`);
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
  console.log(
    '_prepareSubscriptionPlanList---',
    JSON.stringify(_prepareSubscriptionPlanList()),
  );

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
      navigation.navigate(AuthStackRoute.RegisterCompany, {
        registrationStep: 1,
      });
    } else if (!addPurchaseRequesting && addPurchaseFailure) {
      // README: If payment is done and plan is not activated due to server issue. 
      // Then needs to activte the plan from backend. 
    }
  }, [addPurchaseRequesting, addPurchaseSuccess, addPurchaseFailure]);

  useEffect(() => {
    if (!createRazorpayOrderRequesting && createRazorpayOrderSuccess) {
      dispatch(resetCreateRazorpayRequest());
    } else if (!createRazorpayOrderRequesting && createRazorpayOrderFailure) {
      showToast('Error in Createing Order ID', ToastType.ERROR);
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
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <SubscriptionPlanCard2 item={item} onPress={handleByPlan} />
              <Spinner show={paymentProcessing || addPurchaseRequesting} />
            </ScrollView>
          );
        }}
      />
    </ImageBackground>
  );
};

export default SubscriptionPlanView;
