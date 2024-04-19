import React from 'react';
import {View} from 'react-native';
import AccountDetailUpdateView from '../AccountFormView';
import Header from '../../../../../common/Header';
import Spacer from '../../../../../common/Spacer';
import {IGetPaymentMethodData} from '../../../../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import {COLOR_WHITE} from '../../../../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const AccountEditView = (props: any) => {
  const navigation = useNavigation();
  const paymentInfo: IGetPaymentMethodData = props?.route?.params?.paymentInfo;
  return (
    <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
      <Header label="Account-Edit" canGoBack={true} />
      <Spacer height={10} />
      <AccountDetailUpdateView
        isEdit={true}
        paymentInfo={paymentInfo}
        onSuccess={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default AccountEditView;
