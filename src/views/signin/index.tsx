import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AvoidSoftInputViewHOC from '../../common/AvoidSoftInputViewHOC';
import styles from './styles';
import LogoIcon from '../../images/icons/epack-logo.svg';
import MobileIcon from '../../images/icons/mobile-icon.svg';
import LockIcon from '../../images/icons/lock.svg';
import UserIcon from '../../images/icons/user.svg';

import Button from '../../common/Button';
import Input from '../../common/Input';
import Spacer from '../../common/Spacer';
import Spinner from '../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {COLOR_BLUE, COLOR_WHITE, INTRO_BG_LINEARGRADIENT, OFF_WHITE} from '../../utils/colors';
import Label from '../../common/Label';
import {IOtpGetRequest} from '../../interface/otp/IOtpGetRequest';
import {getOtpRequest, restGetOtpRequest} from '../../redux/slices/OtpSlice';
import {AuthStackRoute} from '../../utils/constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { setAuthToken, setIsRegistrationComplete, setLoginStatus } from '../../utils/storage';
import { useAuthContext } from '../../provider/AuthProvider';
import { getCompaniesRequest, resetGetCompaniesRequest } from '../../redux/slices/CompanySlice';

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
  const [showStaffLoginOption, setShowStaffLoginOption] = useState<boolean>(false);
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
      setInputKeyboardType('numeric');
    }
  }, [isStaffLogin]);

  useEffect(() => {
    if (!requesting && success) {
      if(isStaffLogin) {
        setAuthToken(otpData?.data?.jwtToken);
        dispatch(restGetOtpRequest());
        const uri = `companyId/${getCompanyId()}`;
        dispatch(getCompaniesRequest(uri));
      } else {
        dispatch(restGetOtpRequest());
        navigation.replace(AuthStackRoute.OTPInput);
      }
    } else if (!requesting && error) {
      dispatch(restGetOtpRequest());
      Alert.alert('Something went wrong. Please try again!');
    }
  }, [requesting, success, failure]);

  useEffect(() => {
    if(!getCompaniesRequesting && getCompaniesSuccess && isStaffLogin) {
      const {data} = companies || {};
      if(data && Array.isArray(data) && data.length > 0) {
        completeRegistrationAndLoggedIn();
      } else {
        Alert.alert(
          'You are not associated with any company. Please contact your Administrator!',
        );
      }
    } else if(!getCompaniesRequesting && getCompaniesFailure) {
      dispatch(resetGetCompaniesRequest());
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
        <Label text="Login or Register" style={{fontSize: 18}} />
        <Spacer height={20} />
        <Label text={topLabel} />
        <Input
          icon={isStaffLogin ? <UserIcon width={22} height={22} /> : <MobileIcon width={22} height={22} />}
          placeholder={inputLabel}
          //@ts-ignore
          inputType={inputKeyboardType}
          onChangeText={onChangeMobileText}
          error={null}
          maxLength={isStaffLogin ? 20 : 10}
          placeholderTextColor={OFF_WHITE}
        />
        <Spacer />
        {isStaffLogin && (
          <Input
            icon={<LockIcon width={22} height={22} />}
            placeholder="Password"
            inputType="default"
            onChangeText={onChangePasswordText}
            error={null}
            secureTextEntry={true}
            placeholderTextColor={OFF_WHITE}
          />
        )}
        {showStaffLoginOption ? <BouncyCheckbox
          size={25}
          fillColor={COLOR_BLUE}
          unfillColor="#FFFFFF"
          text="Login as Staff or Member"
          iconStyle={{borderColor: 'white', borderRadius: 0}}
          innerIconStyle={{borderWidth: 1, borderRadius: 0}}
          textStyle={{
            fontFamily: 'WorkSans-Regular',
            textDecorationLine: 'none',
            color: '#FFFFFF',
          }}
          style={{marginRight: 15, marginBottom: 10}}
          textContainerStyle={{paddingLeft: 0}}
          onPress={(isChecked: boolean) => {
            setIsStaffLogin(!isStaffLogin);
          }}
          isChecked={isStaffLogin}
          disableBuiltInState={true}
        /> : null}
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
