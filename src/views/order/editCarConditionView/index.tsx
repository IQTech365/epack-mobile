import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {OrderStackParamList} from '../../../navigation/params/OrderStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Header from '../../../common/Header';
import styles from './style';
import { AddLorryFormContextProvider } from '../../../provider/AddLorryFormContextProvider';
import CarConditionFormView from '../orderDetails/components/CarConditionFormView';
import { ICardConditionData } from '../../../interface/order/IGetCarConditionListResponse';

type Props = NativeStackScreenProps<OrderStackParamList, 'EditCarCondition'>;

const EditCarCondition: FC<Props> = ({route, navigation}) => {
  const orderID: string = route.params?.orderID;
  const item: ICardConditionData = route.params?.item;
//   const enquiry: ISingleEnquiryData = route.params?.enquiry;

  const _onEditDone = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header label="Car Condition Edit" canGoBack={true} />
      <AddLorryFormContextProvider>
          <CarConditionFormView orderId={orderID} onSuccess={_onEditDone} item={item} isEdit={true} />
        </AddLorryFormContextProvider>
    </View>
  );
};

export default EditCarCondition;
