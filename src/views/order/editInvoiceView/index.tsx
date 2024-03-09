import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {OrderStackParamList} from '../../../navigation/params/OrderStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IInvoice} from '../../../interface/order/IGetInvoiceListResponse';
import {ISingleEnquiryData} from '../../../interface/enquiry/ISingleEnquiryResponse';
import {InvoiceFormContextProvider} from '../../../provider/InvoiceFormContextProvider';
import InvoiceFormView from '../orderDetails/components/InvoiceFormView';
import Header from '../../../common/Header';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<OrderStackParamList, 'EditInvoice'>;

const EditInvoiceView: FC<Props> = ({route, navigation}) => {
  const orderID: string = route.params?.orderID;
  const item: IInvoice = route.params?.item;
  const enquiry: ISingleEnquiryData = route.params?.enquiry;
  console.log('OrderID--', orderID);
  console.log('Invoice--', JSON.stringify(item));
  console.log('Enquiry--', JSON.stringify(enquiry));

  const _onEditDone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header label="Invoice Edit" canGoBack={true} />
      <InvoiceFormContextProvider>
        <InvoiceFormView
          orderId={orderID}
          item={enquiry}
          onSuccess={_onEditDone}
          isEdit={true}
          invoiceData={item}
        />
      </InvoiceFormContextProvider>
    </View>
  );
};

export default EditInvoiceView;
