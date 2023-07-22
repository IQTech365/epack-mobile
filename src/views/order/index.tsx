import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {OrderStackRoute} from '../../utils/constants';
import OrderListItem, {
  IOrderItem,
} from './orderDetails/components/OrderListItem';
import styles from './style';

interface IOrderPageViewProps {
  navigation: NavigationProp<any, any>;
}

const OrderPageView: React.FC<IOrderPageViewProps> = ({navigation}) => {
  const tempItem: IOrderItem = {
    clientName: 'Ms. Vanshika',
    pickupAddress: 'Delhi, Munirka',
    deliveryAddress: 'Gurgaon, Sector 48',
    shiftingType: 'Domestic',
    shiftingLuggage: 'Home, car',
    phoneNumber: '9898989898',
  };

  const handleAddNew = () => {
    navigation.navigate(OrderStackRoute.AddOrder);
  };

  const handleEnquiryDetailsClick = () => {
    navigation.navigate(OrderStackRoute.OrderDetails);
  };

  return (
    <View style={styles.container}>
      <Header label="Order Management" />
      <Spacer height={4} />
      <AddNew countLabel="Total Orders" count="1200" onPress={handleAddNew} />
      <Spacer height={12} />
      <OrderListItem
        item={tempItem}
        index={1}
        onPress={handleEnquiryDetailsClick}
      />
    </View>
  );
};

export default OrderPageView;
