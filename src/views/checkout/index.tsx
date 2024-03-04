import React, {FC, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Input from '../../common/Input';
import Button from '../../common/Button';
import {
  IAddPurchaseRequest,
  IRazorPayCreateOrderPayload,
  ISubscriptionPlan,
} from '../../interface/subscription/subscription';
import useAuthId from '../../hooks/useAuthId';
import {
  addPurchaseRequest,
  createRazorpayRequest,
  resetAddPurchaseRequest,
  resetCreateRazorpayRequest,
} from '../../redux/slices/SubscriptionSlice';
import {ToastType, showToast} from '../../utils/utility';
import RazorpayCheckout from 'react-native-razorpay';
import {
  IDurationConverter,
  getDurationConverter,
  getNextRenewableDate,
} from '../subscriptionPlan/utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/params/AuthStackParamList';
import Spinner from '../../common/Spinner';
import {COLOR_BLACK} from '../../utils/colors';
type Props = NativeStackScreenProps<AuthStackParamList, 'Checkout'>;

const CheckoutPage: FC<Props> = ({route, navigation}) => {
  const plan: ISubscriptionPlan | undefined = route.params?.subscriptionPlan;
  const amount: number | undefined = route.params?.amount;
  const duration: string | undefined = route.params?.duration;
  // README: Discount logic is not implemented yet. So currently assuming discount price as 0(`zero`)
  const GST_PERCENT = 18; // Fixed GST
  const COUPONS = [
    'LALIT50',
    'SARITA20',
    'POONAM20',
    'EPACKBOOK10',
    'EPACKBOOK25',
    'EPACKBOOKCRM100',
  ];

  const [paymentProcessing, setPaymentProcessing] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [couponCodeApplied, setCouponCodeApplied] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [firstRenderDone, setFirstRenderDone] = useState<boolean>(false);
  const inputRef = useRef(null);

  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {
    addPurchaseRequesting,
    addPurchaseSuccess,
    addPurchaseFailure,
    createRazorpayOrderRequesting,
    createRazorpayOrderSuccess,
    createRazorpayOrderFailure,
    razorpayOrder,
  } = useAppSelector(state => state.Subscription);

  const applyButtonStyle = couponCodeApplied ? styles.btnText2 : styles.btnText;

  const handleCheckout = async () => {
    if (plan?.subscriptionType.toLocaleLowerCase() == 'free' || totalPrice == 0) {
      // Get the Subscription without payment
      _addPurchase('order_id_not_applicable');
    } else {
      // Create Order on Server
      const payload: IRazorPayCreateOrderPayload = {
        amount: totalPrice * 100,
        currency: 'INR',
      };
      dispatch(createRazorpayRequest(payload));
    }
  };

  const _applyCouponCode = () => {
    let _amountAfterCouponCode = amount;
    let discountPercent = 0;
    const code = COUPONS.find(d => d === couponCode);

    if (code !== undefined) {
      switch (code) {
        case COUPONS[0]:
          discountPercent = 50;
          break;
        case COUPONS[1]:
          discountPercent = 20;
          break;
        case COUPONS[2]:
          discountPercent = 20;
          break;
        case COUPONS[3]:
            discountPercent = 10;
            break;
        case COUPONS[4]:
          discountPercent = 25;
          break;
        case COUPONS[5]:
          discountPercent = 100;
          break;
        default:
          discountPercent = 0;
      }
      setCouponCodeApplied(true);
      const discountAmount = amount * (discountPercent / 100);
      _amountAfterCouponCode = amount - discountAmount;
    }
    setDiscountedPrice(_amountAfterCouponCode);
    const _gstAmount = _amountAfterCouponCode * (GST_PERCENT / 100);
    setGstAmount(_gstAmount);
    const _totalAmount = _amountAfterCouponCode + _gstAmount;
    setTotalPrice(_totalAmount);
  };

  const _removeCouponCode = () => {
    setCouponCodeApplied(false);
    setCouponCode('');
    //@ts-ignore
    inputRef && inputRef?.current?.reset();
    setDiscountedPrice(amount);
    const _gstAmount = amount * (GST_PERCENT / 100);
    setGstAmount(_gstAmount);
    const _totalAmount = amount + _gstAmount;
    setTotalPrice(_totalAmount);
  };

  const _handleCouponCodeChange = (text: string) => {
    setCouponCode(text);
  };

  const _addPurchase = (orderId: string) => {
    const durationConvert: IDurationConverter = getDurationConverter(
      duration as string,
    );
    const payload: IAddPurchaseRequest = {
      purchaseOrderId: orderId,
      authId: authId,
      subscriptionId: plan?._id as string,
      subscriptionPlan: duration as string, //plan.subscriptionType,
      amountPaid: `${totalPrice}`,
      discountAmount: '0',
      couponCode: '',
      expiryDate: getNextRenewableDate(
        durationConvert.days,
        durationConvert.months,
        durationConvert.years,
      ),
      status: 'active',
    };
    dispatch(addPurchaseRequest(payload));
  };

  const _getRazorpayOrderId = () => {
    let orderId: string = '';
    const {data} = razorpayOrder || {};
    if (data && data.hasOwnProperty('id')) {
      orderId = data.id;
    }
    return orderId;
  };

  const _doPayment = (orderId: string) => {
    const options: any = {
      description: 'Epack Book Subscription',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_M4tXt01eZSLSLA',
      amount: amount * 100,
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
          showToast('Payment Success', ToastType.SUCCESS);
          setPaymentProcessing(false);
          setPaymentDone(true);
          _addPurchase(orderId);
        })
        .catch((error: any) => {
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

  useEffect(() => {
    setDiscountedPrice(0);
    const _gstAmount = amount * (GST_PERCENT / 100);
    setGstAmount(_gstAmount);
    const _totalAmount = amount + _gstAmount;
    setTotalPrice(_totalAmount);
    setFirstRenderDone(true);
  }, []);

  useEffect(() => {
    if (!addPurchaseRequesting && addPurchaseSuccess) {
      dispatch(resetAddPurchaseRequest());
      navigation.replace('CompanyBasicInfo');
    } else if (!addPurchaseRequesting && addPurchaseFailure) {
      dispatch(resetAddPurchaseRequest());
    }
  }, [addPurchaseRequesting, addPurchaseSuccess, addPurchaseFailure]);

  useEffect(() => {
    if (!createRazorpayOrderRequesting && createRazorpayOrderSuccess) {
      _doPayment(_getRazorpayOrderId());
      dispatch(resetCreateRazorpayRequest());
    } else if (!createRazorpayOrderRequesting && createRazorpayOrderFailure) {
      showToast('Error in Creating Order ID. Try again!', ToastType.ERROR);
      dispatch(resetCreateRazorpayRequest());
    }
  }, [
    createRazorpayOrderRequesting,
    createRazorpayOrderSuccess,
    createRazorpayOrderFailure,
  ]);

  return (
    <View style={styles.container}>
      <Header label="Checkout" canGoBack={true} />
      <Spacer height={15} />
      <View style={styles.labelContainer}>
        <Text style={styles.text4}>Registered Mobile No. 844595774</Text>
      </View>
      <Spacer height={15} />
      <View style={styles.planCardContainer}>
        <View style={styles.planInfoContainer}>
          <Text
            style={
              styles.text
            }>{`Epackbook ${plan?.subscriptionType.toUpperCase()}`}</Text>
        </View>
        <Spacer height={4} />
        <View style={styles.planInfoContainer}>
          <Text style={styles.text2}>
            {`₹ ${amount}/-`}{' '}
            <Text style={styles.text3}>{`per ${duration}`}</Text>
          </Text>
        </View>
      </View>
      <Spacer height={20} />
      <View style={styles.labelContainer}>
        <Text style={styles.text4}>Summary</Text>
      </View>
      <Spacer height={20} />
      <View style={styles.line} />
      <Spacer height={10} />
      <View style={styles.priceBreakupContainer}>
        <Text style={styles.text5}>Original Price</Text>
        <Text style={styles.text6}>{`₹ ${amount}/-`}</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.priceBreakupContainer}>
        <Text style={styles.text5}>After Discount Price</Text>
        <Text style={styles.text6}>{`₹ ${discountedPrice}/-`}</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.priceBreakupContainer}>
        <View style={styles.inputWrapper}>
          <Input
            onChangeText={_handleCouponCodeChange}
            containerStyle={styles.inputContainer}
            placeholder="Coupon Code"
            selectionColor={COLOR_BLACK}
            inputStyle={styles.input}
            //@ts-ignore
            ref={inputRef}
          />
          <Spacer width={4} />
          {couponCodeApplied ? (
            <TouchableOpacity onPress={_removeCouponCode}>
              <Text style={styles.btnText3}>Remove</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity onPress={_applyCouponCode}>
          <Text style={applyButtonStyle}>
            {couponCodeApplied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
      <View style={styles.priceBreakupContainer}>
        <Text style={styles.text5}>GST 18%</Text>
        <Text style={styles.text6}>{`₹ ${gstAmount}/-`}</Text>
      </View>
      <Spacer height={20} />
      <View style={styles.line} />
      <Spacer height={10} />
      <View style={styles.priceBreakupContainer}>
        <Text style={styles.text2}>Total</Text>
        <Text style={styles.text2}>{`₹ ${totalPrice}/-`}</Text>
      </View>
      <Spacer height={20} />
      <Button
        text="CHECKOUT"
        onPress={handleCheckout}
        style={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        disabled={!firstRenderDone}
      />
      <Spinner show={paymentProcessing || addPurchaseRequesting} />
    </View>
  );
};

export default CheckoutPage;
