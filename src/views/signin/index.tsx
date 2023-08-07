import React, {useCallback, useEffect, useState} from 'react';
import { Alert, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AvoidSoftInputViewHOC from '../../common/AvoidSoftInputViewHOC';
import styles from './styles';
import LogoIcon from '../../images/icons/epack-logo.svg';
import MobileIcon from '../../images/icons/mobile-icon.svg';

import Button from '../../common/Button';
import Input from '../../common/Input';
import Spacer from '../../common/Spacer';
import Spinner from '../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {INTRO_BG_LINEARGRADIENT} from '../../utils/colors';
import Label from '../../common/Label';
import { IOtpGetRequest } from '../../interface/otp/IOtpGetRequest';
import { getOtpRequest } from '../../redux/slices/OtpSlice';
import { AuthStackRoute } from '../../utils/constants';

const SignInPageView = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {requesting, success, error, failure} = useAppSelector(state => state.OTP);
  const [mobile, setMobile] = useState<string>('');

  const onChangeMobileText = (text: string) => {
    setMobile(text);
  };

  const onLoginPress = useCallback(() => {
    const payload: IOtpGetRequest = {
      mobile: mobile,
    };
    dispatch(getOtpRequest(payload));
  }, []);

  useEffect(() => {
    if(!requesting && success) {
      navigation.navigate(AuthStackRoute.OTPInput);
    } else if(!requesting && error) {
      Alert.alert('Something went wrong. Please try again!');
    }
  }, [requesting, success, failure]);

  return (
    <AvoidSoftInputViewHOC>
      <LinearGradient colors={INTRO_BG_LINEARGRADIENT} style={styles.container}>
        <View style={styles.logo}>
          <LogoIcon width={232} height={56} />
        </View>
        <Spacer height={30} />
        <Label text='Signin OR Register' style={{fontSize: 18}} />
        <Spacer height={20} />
        <Label text='Enter mobile number' />
        <Input
          icon={<MobileIcon width={22} height={22} />}
          placeholder="Mobile Number"
          inputType='numeric'
          onChangeText={onChangeMobileText}
          error={null}
          maxLength={10}
        />
        <Spacer />
        <Spacer height={50} />
        <Button text="GET OTP" onPress={onLoginPress} disabled={!mobile || mobile.length < 10} />
        <Spacer height={50} />
        <Spinner show={requesting} />
      </LinearGradient>
    </AvoidSoftInputViewHOC>
  );
};

export default SignInPageView;
