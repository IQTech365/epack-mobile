import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { IGetOrdersRequest } from '../../interface/order/IGetOrdersRequest';
import { IGetOrdersData } from '../../interface/order/IGetOrdersResponse';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getOrdersRequest} from '../../redux/slices/OrderSlice';
import {OrderStackRoute} from '../../utils/constants';
import { formatDate, sortItemByDate } from '../../utils/formatter';
import OrderListItem, {
  IOrderItem,
} from './orderDetails/components/OrderListItem';
import styles from './style';
import useCompanyId from '../../hooks/useCompanyId';
import { ISingleEnquiryData } from '../../interface/enquiry/ISingleEnquiryResponse';

interface IOrderPageViewProps {
  navigation: NavigationProp<any, any>;
}

const OrderPageView: React.FC<IOrderPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {orders, getOrdersRequesting, getOrdersSuccess, getOrdersFailure} =
    useAppSelector(state => state.Order);
  console.log('OrderPageView--orders----', orders);
  const {data: ordersArr} = orders || {};
  const companyId = useCompanyId();

  const getClientName = (item: IGetOrdersData) => {
    let clientName = '';
    if(item.billingBy == 'by Individual') {
      clientName = item.partyName;
    } else if(item.billingBy == 'by Company') {
      //@ts-ignore
      clientName = item.billingDetails?.authorityPersonName
    }
    return clientName;
  }

  const getPhoneNumber = (item: IGetOrdersData) => {
    let phoneNumber = '';
    if(item.billingBy == 'by Individual') {
      phoneNumber = item.mobile;
    } else if(item.billingBy == 'by Company') {
      //@ts-ignore
      clientName = item.billingDetails?.authorityPersonMobile
    }
    return phoneNumber;
  }

  const getAddress = (type: string, item: IGetOrdersData) => {
    let address = '';
    if(type == 'pick') {
      address = `${item.pickupAddress.address}, ${item.pickupAddress.city}, ${item.pickupAddress.state}, ${item.pickupAddress.pincode}`;
    } else if(type == 'drop') {
      address = `${item.dropAddress.address}, ${item.dropAddress.city}, ${item.dropAddress.state}, ${item.dropAddress.pincode}`;
    }
    return address;
  }


  const getTransformedData = () => {
    let dataSet: IOrderItem[] = [];
    if (ordersArr && Array.isArray(ordersArr) && ordersArr.length > 0) {
      dataSet = ordersArr.map(el => {
        const item: IOrderItem = {
          orderId: el._id,
          clientName: getClientName(el),
          shiftingType: el?.shiftingType,
          shiftingLuggage: el?.shiftingLuggage.join(','),
          phoneNumber: getPhoneNumber(el),
          pickupAddress: getAddress('pick', el),
          deliveryAddress: getAddress('drop', el),
          orderData: formatDate(el.createdAt),
          createdAt: el?.createdAt,
          status: el.status,
        };
        return item;
      });
    }
    return dataSet
      .sort((a, b) => sortItemByDate(a.orderData, b.orderData))
      .filter(e => e.status !== 'COMPLETED');
  };

  const handleAddNew = () => {
    navigation.navigate(OrderStackRoute.AddOrder);
  };

  const handleOrderDetailsClick = (item: IOrderItem, index: number) => {
    navigation.navigate(OrderStackRoute.OrderDetails, {orderId: item.orderId, item: getOrderDataById(item.orderId)});
  };

  const getOrderDataById = (orderId: string) => {
    let order:ISingleEnquiryData|null = null;
    if(ordersArr && Array.isArray(ordersArr) && ordersArr.length > 0) {
      order = ordersArr.find(e => e._id == orderId)
    }
    return order;
  }

  const handleOnRefresh = useCallback(() => {
    const payload: Partial<IGetOrdersRequest> = {
      companyId: companyId,
    }
    dispatch(getOrdersRequest(payload));
  }, []);

  useEffect(() => {
    const payload: Partial<IGetOrdersRequest> = {
      companyId: companyId,
    }
    dispatch(getOrdersRequest(payload));
  }, []);

  return (
    <View style={styles.container}>
      <Header label="Order Management" canGoBack={true} showDrawerIcon={true} />
      <Spacer height={4} />
      <AddNew
        countLabel="Total Orders"
        count={`${getTransformedData().length}`}
        onPress={handleAddNew}
      />
      <Spacer height={12} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={getTransformedData()}
        refreshControl={
          <RefreshControl
            refreshing={getOrdersRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({item, index}) => (
          <OrderListItem
            item={item}
            index={index}
            onPress={() => handleOrderDetailsClick(item, index)}
          />
        )}
        ListEmptyComponent={() => <Text>No Orders available</Text>}
      />
    </View>
  );
};

export default OrderPageView;
