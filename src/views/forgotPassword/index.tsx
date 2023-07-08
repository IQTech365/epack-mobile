import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../common/AvoidSoftInputViewHOC';
import LabelCircle from '../../common/LabelCircle';
import styles from './styles';
import LogoIcon from '../../images/icons/logo.svg';
import UserIcon from '../../images/icons/user2.svg';
import LockIcon from '../../images/icons/lock.svg';
import EmailIcon from '../../images/icons/email.svg';

import Button from '../../common/Button';
import Input from '../../common/Input';
import Spacer from '../../common/Spacer';
import {AuthStackRoute} from '../../utils/constants';

const ForgotPasswordPageView = (props: any) => {
  const {navigation} = props;
  const onChangeUsernameText = (text: string) => {};

  const onChangeEmailText = (text: string) => {};

  const onChangePasswordText = (text: string) => {};

  const onSignUpPress = useCallback(() => {
    //
  }, []);

  const onSignInPress = useCallback(() => {
    navigation.navigate(AuthStackRoute.SignIn);
  }, []);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <LabelCircle text={`Forgot Password`} />
        <View style={styles.logo}>
          <LogoIcon width={52} height={35} />
        </View>
        <Spacer />
        <View style={styles.emailDescription}>
          <Text>Please enter your registered email.</Text>
        </View>
        <Spacer />
        <Input
          icon={<EmailIcon width={20} height={20} />}
          placeholder="Email"
          onChangeText={onChangeEmailText}
          error={null}
        />
        <Spacer height={50} />
        <Button text="SUBMIT" onPress={onSignUpPress} />
        <Spacer height={50} />
        <View style={styles.signupContainer}>
          <Text style={styles.dontHaveAccount}>Back to</Text>
          <TouchableOpacity onPress={onSignInPress}>
            <Text style={styles.signup}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ForgotPasswordPageView;
