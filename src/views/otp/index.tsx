import React, {useCallback, useState, useRef, useEffect} from 'react';
import {Alert, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AvoidSoftInputViewHOC from '../../common/AvoidSoftInputViewHOC';
import styles from './styles';
import LogoIcon from '../../images/icons/epack-logo.svg';

import Button from '../../common/Button';
import Spacer from '../../common/Spacer';
import {AuthStackRoute} from '../../utils/constants';
import Spinner from '../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {INTRO_BG_LINEARGRADIENT} from '../../utils/colors';
import Label from '../../common/Label';
import OTPInput from '../../common/OtpInput';
import {resetVerifyOtpRequest, verifyOtpRequest} from '../../redux/slices/OtpSlice';
import Header from '../../common/Header';
import { IOtpVerifyRequest } from '../../interface/otp/IOtpVerifyRequest';
import { getIsRegistrationComplete, setAuthToken, setIsRegistrationComplete, setLoginStatus } from '../../utils/storage';
import { getCompaniesRequest } from '../../redux/slices/CompanySlice';
import { useAuthContext } from '../../provider/AuthProvider';

const OTPPageView = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const authContext = useAuthContext();
  const {setLoggedIn} = authContext;
  const {
    verifyOtpRequesting,
    verifyOtpSuccess,
    verifyOtpError,
    verifyOtpFailure,
    verifiedData,
    otpData,
  } = useAppSelector(state => state.OTP);
  const {getCompaniesRequesting, getCompaniesSuccess, getCompaniesFailure, companies} = useAppSelector(state => state.Company);

  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');
  const [otp5, setOtp5] = useState<string>('');
  const [otp6, setOtp6] = useState<string>('');

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();

  const onChangeOtpText1 = (text: string) => {
    if (text.length == 1) {
      setOtp1(text);
      //@ts-ignore
      inputRef2?.current?.focus();
    }
  };

  const onChangeOtpText2 = (text: string) => {
    if (text.length == 1) {
      setOtp2(text);
      //@ts-ignore
      inputRef3?.current?.focus();
    }
  };

  const onChangeOtpText3 = (text: string) => {
    if (text.length == 1) {
      setOtp3(text);
      //@ts-ignore
      inputRef4?.current?.focus();
    }
  };

  const onChangeOtpText4 = (text: string) => {
    if (text.length == 1) {
      setOtp4(text);
      //@ts-ignore
      inputRef5?.current?.focus();
    }
  };

  const onChangeOtpText5 = (text: string) => {
    if (text.length == 1) {
      setOtp5(text);
      //@ts-ignore
      inputRef6?.current?.focus();
    }
  };

  const onChangeOtpText6 = (text: string) => {
    if (text.length == 1) {
      setOtp6(text);
    }
  };

  const onVerifyOtpPress = useCallback(() => {
    const payload: IOtpVerifyRequest = {
      id: otpData?.data.id as string,
      otp: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`,
    };
    dispatch(verifyOtpRequest(payload));
  }, [otp1, otp2, otp3, otp4, otp5, otp6]);

  const disabled = !otp1 || !otp2 || !otp3 || !otp4 || !otp5 || !otp6;

  const completeRegistrationAndLoggedIn = async () => {
    await setIsRegistrationComplete();
    await setLoginStatus();
    setLoggedIn(true);
  }

  useEffect(() => {
    if(!verifyOtpRequesting && verifyOtpSuccess) {
      console.log('verifiedData------', JSON.stringify(verifiedData));
      const {data} = verifiedData || {};
      if(data?.id) {
        setAuthToken(data.token);
        dispatch(getCompaniesRequest(data?.id));
        dispatch(resetVerifyOtpRequest());
      }
    } else if(!verifyOtpRequesting && verifyOtpFailure) {
      dispatch(resetVerifyOtpRequest());
      Alert.alert('Otp verification failed');
    }
  }, [verifyOtpRequesting, verifyOtpSuccess, verifyOtpFailure]);

  useEffect(() => {
    if(!getCompaniesRequesting && getCompaniesSuccess) {
      const {data} = companies || {};
      console.log('data-data----', JSON.stringify(data));
      if(data && Array.isArray(data) && data.length > 0) {
        const firstCompany = data[0];
        if(firstCompany.companySignature) {
          completeRegistrationAndLoggedIn();
        } else {
          console.log('data-data---- block-1');
          navigation.navigate(AuthStackRoute.RegisterCompany, {registrationStep: 3});
        }
      } else {
        console.log('data-data---- block-2');
        navigation.navigate(AuthStackRoute.RegisterCompany, {registrationStep: 1});
      }
    } else if(!getCompaniesRequesting && getCompaniesFailure) {
      Alert.alert('Error in Getting companies details.');
    }
  }, [getCompaniesRequesting, getCompaniesSuccess, getCompaniesFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <LinearGradient colors={INTRO_BG_LINEARGRADIENT} style={styles.container}>
        <Header canGoBack={true} label="Verify OTP" />
        <Spacer height={100} />
        <View style={styles.logo}>
          <LogoIcon width={232} height={56} />
        </View>
        <Spacer height={40} />
        <Label text="Enter OTP" />
        <Spacer height={20} />
        <View style={styles.otpInputContainer}>
          <OTPInput
            //@ts-ignore
            ref={inputRef1}
            onChangeText={onChangeOtpText1}
            autoFocus={true}
            inputType='numeric'
          />
          <OTPInput
            //@ts-ignore
            ref={inputRef2}
            onChangeText={onChangeOtpText2}
            inputType='numeric'
          />
          <OTPInput
            //@ts-ignore
            ref={inputRef3}
            onChangeText={onChangeOtpText3}
            inputType='numeric'
          />
          <OTPInput
            //@ts-ignore
            ref={inputRef4}
            onChangeText={onChangeOtpText4}
            inputType='numeric'
          />
          <OTPInput
            //@ts-ignore
            ref={inputRef5}
            onChangeText={onChangeOtpText5}
            inputType='numeric'
          />
          <OTPInput
            //@ts-ignore
            ref={inputRef6}
            onChangeText={onChangeOtpText6}
            inputType='numeric'
          />
        </View>
        <Spacer />
        <Spacer height={50} />
        <Button
          text="Verify OTP"
          onPress={onVerifyOtpPress}
          disabled={disabled}
        />
        <Spacer height={50} />
        <Spinner variant='white' show={verifyOtpRequesting || getCompaniesRequesting} />
      </LinearGradient>
    </AvoidSoftInputViewHOC>
  );
};

export default OTPPageView;
