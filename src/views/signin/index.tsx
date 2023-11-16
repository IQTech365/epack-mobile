import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
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
import {COLOR_BLUE, INTRO_BG_LINEARGRADIENT} from '../../utils/colors';
import Label from '../../common/Label';
import {IOtpGetRequest} from '../../interface/otp/IOtpGetRequest';
import {getOtpRequest, restGetOtpRequest} from '../../redux/slices/OtpSlice';
import {AuthStackRoute} from '../../utils/constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { setAuthToken, setIsRegistrationComplete, setLoginStatus } from '../../utils/storage';
import { useAuthContext } from '../../provider/AuthProvider';
import { getCompaniesRequest } from '../../redux/slices/CompanySlice';

const SignInPageView = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {requesting, success, error, failure, otpData} = useAppSelector(
    state => state.OTP,
  );
  const {
    getCompaniesRequesting,
    getCompaniesSuccess,
    getCompaniesFailure,
    companies,
  } = useAppSelector(state => state.Company);
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isStaffLogin, setIsStaffLogin] = useState<boolean>(false);
  const [topLabel, setTopLabel] = useState<string>('Enter mobile number');
  const [inputLabel, setInputLabel] = useState<string>('Mobile Number');
  const [inputKeyboardType, setInputKeyboardType] = useState<string>('numeric');
  const authContext = useAuthContext();
  const {setLoggedIn} = authContext;
  const {data = {}} = otpData || {};
  const {userRolePermission = []} = data || {};

  const getCompanyId = () => {
    let id:string = '';
    if(userRolePermission && Array.isArray(userRolePermission) && userRolePermission.length > 0) {
      const firstPermissionItem = userRolePermission[0];
      id = firstPermissionItem.companyId;
    }
    return id;
  }

  console.log('companies------', JSON.stringify(companies));
  
  const onChangeMobileText = (text: string) => {
    setMobile(text);
  };

  const onChangePasswordText = (text: string) => {
    setPassword(text);
  };

  const completeRegistrationAndLoggedIn = async () => {
    await setIsRegistrationComplete();
    await setLoginStatus();
    setLoggedIn(true);
  }

  const onLoginPress = useCallback(() => {
    let payload:Partial<IOtpGetRequest>;
    if(isStaffLogin) {
      payload = {
        username: mobile,
        password: password,
      };
    } else {
      payload = {
        mobile: mobile,
      };
    }
    dispatch(getOtpRequest(payload));
  }, [mobile, password]);

  useEffect(() => {
    if(isStaffLogin){
      setTopLabel('Enter Username and Password');
      setInputLabel('Username');
      setInputKeyboardType('default');
    } else {
      setTopLabel('Enter mobile number');
      setInputLabel('Mobile Number');
      setInputKeyboardType('default');
    }
  }, [isStaffLogin]);

  useEffect(() => {
    if (!requesting && success) {
      console.log('otpData--------', JSON.stringify(otpData));
      if(isStaffLogin) {
        setAuthToken(otpData?.data?.jwtToken);
        dispatch(restGetOtpRequest());
        dispatch(getCompaniesRequest(getCompanyId()));
      } else {
        dispatch(restGetOtpRequest());
        navigation.navigate(AuthStackRoute.OTPInput);
      }
    } else if (!requesting && error) {
      Alert.alert('Something went wrong. Please try again!');
    }
  }, [requesting, success, failure]);

  useEffect(() => {
    if(!getCompaniesRequesting && getCompaniesSuccess) {
      completeRegistrationAndLoggedIn();
    } else if(!getCompaniesRequesting && getCompaniesFailure) {
      Alert.alert('Error in Getting companies details.');
    }
  }, [getCompaniesRequesting, getCompaniesSuccess, getCompaniesFailure]);

  const buttonDisable = isStaffLogin ? (!mobile || !password) : !mobile || mobile.length < 10;

  return (
    <AvoidSoftInputViewHOC>
      <LinearGradient colors={INTRO_BG_LINEARGRADIENT} style={styles.container}>
        <View style={styles.logo}>
          <LogoIcon width={232} height={56} />
        </View>
        <Spacer height={30} />
        <Label text="Signin OR Register" style={{fontSize: 18}} />
        <Spacer height={20} />
        <Label text={topLabel} />
        <Input
          icon={<MobileIcon width={22} height={22} />}
          placeholder={inputLabel}
          //@ts-ignore
          inputType={inputKeyboardType}
          onChangeText={onChangeMobileText}
          error={null}
          maxLength={isStaffLogin ? 20 : 10}
        />
        <Spacer />
        {isStaffLogin && (
          <Input
            icon={<MobileIcon width={22} height={22} />}
            placeholder="Password"
            inputType="default"
            onChangeText={onChangePasswordText}
            error={null}
          />
        )}
        <Spacer />
        <BouncyCheckbox
          size={25}
          fillColor={COLOR_BLUE}
          unfillColor="#FFFFFF"
          text="SignIn as Staff OR Member"
          iconStyle={{borderColor: 'white', borderRadius: 0}}
          innerIconStyle={{borderWidth: 1, borderRadius: 0}}
          textStyle={{
            fontFamily: 'JosefinSans-Regular',
            textDecorationLine: 'none',
            color: '#FFFFFF',
          }}
          style={{marginRight: 15, marginBottom: 10}}
          textContainerStyle={{paddingLeft: 0}}
          onPress={(isChecked: boolean) => {
            setIsStaffLogin(!isStaffLogin);
          }}
        />
        <Spacer height={50} />
        <Button
          text="GET OTP"
          onPress={onLoginPress}
          disabled={buttonDisable}
        />
        <Spacer height={50} />
        <Spinner show={requesting} variant='white' />
      </LinearGradient>
    </AvoidSoftInputViewHOC>
  );
};

export default SignInPageView;
