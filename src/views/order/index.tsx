import {NavigationProp} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getOrdersRequest } from '../../redux/slices/OrderSlice';
import {OrderStackRoute} from '../../utils/constants';
import OrderListItem, {
  IOrderItem,
} from './orderDetails/components/OrderListItem';
import styles from './style';

interface IOrderPageViewProps {
  navigation: NavigationProp<any, any>;
}

const OrderPageView: React.FC<IOrderPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const { addCompanyInfo, companies } = useAppSelector(state => state.Company);
  const {orders, getOrdersRequesting, getOrdersSuccess, getOrdersFailure} = useAppSelector(state => state.Order);
  console.log('AddOrderView--state----', orders);
  const tempItem: IOrderItem = {
    clientName: 'Ms. Vanshika',
    pickupAddress: 'Delhi, Munirka',
    deliveryAddress: 'Gurgaon, Sector 48',
    shiftingType: 'Domestic',
    shiftingLuggage: 'Home, car',
    phoneNumber: '9898989898',
  };

  const getCompanyId = () => {
    let id;
    const { data } = addCompanyInfo || {};
    const { data: companiesData } = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    }
    return id;
  };

  const handleAddNew = () => {
    navigation.navigate(OrderStackRoute.AddOrder);
  };

  const handleEnquiryDetailsClick = () => {
    navigation.navigate(OrderStackRoute.OrderDetails);
  };

  useEffect(() => {
    dispatch(getOrdersRequest(getCompanyId()));
  }, []);

  return (
    <View style={styles.container}>
      <Header label="Order Management" canGoBack={true} showDrawerIcon={true} />
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
