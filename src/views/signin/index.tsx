import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AvoidSoftInputViewHOC from '../../common/AvoidSoftInputViewHOC';
import LabelCircle from '../../common/LabelCircle';
import styles from './styles';
import LogoIcon from '../../images/icons/epack-logo.svg';
import UserIcon from '../../images/icons/user2.svg';
import MobileIcon from '../../images/icons/mobile-icon.svg';

import Button from '../../common/Button';
import Input from '../../common/Input';
import Spacer from '../../common/Spacer';
import {AuthStackRoute} from '../../utils/constants';
import Spinner from '../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {ISigninRequest} from '../../interface/signin/ISigninRequest';
import {signinRequest} from '../../redux/slices/SigninSlice';
import {INTRO_BG_LINEARGRADIENT} from '../../utils/colors';
import Label from '../../common/Label';

const SignInPageView = (props: any) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {requesting, success, error} = useAppSelector(state => state.Signin);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeUsernameText = (text: string) => {
    setUsername(text);
  };

  const onChangePasswordText = (text: string) => {
    setPassword(text);
  };

  const onForgotPasswordPress = useCallback(() => {
    navigation.navigate(AuthStackRoute.ForgotPassword);
  }, []);

  const onLoginPress = useCallback(() => {
    const payload: ISigninRequest = {
      username: username,
      password: password,
    };
    dispatch(signinRequest(payload));
  }, []);

  const onSignUpPress = useCallback(() => {
    navigation.navigate(AuthStackRoute.SignUp);
  }, []);

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
          placeholder="Mobile"
          inputType='numeric'
          onChangeText={onChangeUsernameText}
          error={null}
        />
        <Spacer />
        <Spacer height={50} />
        <Button text="GET OTP" onPress={onLoginPress} disabled={false} />
        <Spacer height={50} />
        <Spinner show={requesting} />
      </LinearGradient>
    </AvoidSoftInputViewHOC>
  );
};

export default SignInPageView;
