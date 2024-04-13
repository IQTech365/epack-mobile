import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {OrderStackParamList} from '../../../navigation/params/OrderStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IInvoice} from '../../../interface/order/IGetInvoiceListResponse';
import {ISingleEnquiryData} from '../../../interface/enquiry/ISingleEnquiryResponse';
import {InvoiceFormContextProvider} from '../../../provider/InvoiceFormContextProvider';
import InvoiceFormView from '../orderDetails/components/InvoiceFormView';
import Header from '../../../common/Header';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { BiltyFormContextProvider } from '../../../provider/BiltyFormContextProvider';
import BiltyFormView from '../orderDetails/components/BiltyFormView';
import { IBilty } from '../../../interface/order/IGetBiltyListResponse';

type Props = NativeStackScreenProps<OrderStackParamList, 'EditBilty'>;

const EditBiltyView: FC<Props> = ({route, navigation}) => {
  const orderID: string = route.params?.orderID;
  const item: IBilty = route.params?.item;
//   const enquiry: ISingleEnquiryData = route.params?.enquiry;

  const _onEditDone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header label="Bilty Edit" canGoBack={true} />
      <BiltyFormContextProvider>
          <BiltyFormView orderId={orderID} onSuccess={_onEditDone} item={item} isEdit={true} />
        </BiltyFormContextProvider>
    </View>
  );
};

export default EditBiltyView;
