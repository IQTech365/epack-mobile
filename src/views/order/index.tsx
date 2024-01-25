import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {IGetOrdersRequest} from '../../interface/order/IGetOrdersRequest';
import {IGetOrdersData} from '../../interface/order/IGetOrdersResponse';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getOrdersRequest} from '../../redux/slices/OrderSlice';
import {OrderStackRoute} from '../../utils/constants';
import {formatDate, sortItemByDate} from '../../utils/formatter';
import OrderListItem, {
  IOrderItem,
} from './orderDetails/components/OrderListItem';
import styles from './style';
import {ISingleEnquiryData} from '../../interface/enquiry/ISingleEnquiryResponse';
import { getCurrentCompanyId } from '../../utils/storage';

interface IOrderPageViewProps {
  navigation: NavigationProp<any, any>;
}

const OrderPageView: React.FC<IOrderPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {orders, getOrdersRequesting, getOrdersSuccess, getOrdersFailure} =
    useAppSelector(state => state.Order);
  const {data: ordersArr} = orders || {};

  const getClientName = (item: IGetOrdersData) => {
    let clientName = '';
    if (item.billingBy == 'by Individual') {
      clientName = item.partyName;
    } else if (item.billingBy == 'by Company') {
      //@ts-ignore
      clientName = item.billingDetails?.companyName || item.billingDetails?.authorityPersonName;
    }
    return clientName;
  };

  const getPhoneNumber = (item: IGetOrdersData) => {
    let phoneNumber = '';
    if (item.billingBy == 'by Individual') {
      phoneNumber = item.mobile;
    } else if (item.billingBy == 'by Company') {
      //@ts-ignore
      clientName = item.billingDetails?.authorityPersonMobile;
    }
    return phoneNumber;
  };

  const getAddress = (type: string, item: IGetOrdersData) => {
    let address = '';
    if (type == 'pick') {
      if(item?.pickupAddress?.address) {
        address += `${item.pickupAddress.address}, `;
      }
      if(item?.pickupAddress?.city) {
        address += `${item.pickupAddress.city}, `;
      }
      if(item?.pickupAddress?.state) {
        address += `${item.pickupAddress.state}, `;
      }
      if(item?.pickupAddress?.pincode) {
        address += `${item.pickupAddress.pincode}`;
      }
    } else if (type == 'drop') {
      if(item?.dropAddress?.address) {
        address += `${item.dropAddress.address}, `;
      }
      if(item?.dropAddress?.city) {
        address += `${item.dropAddress.city}, `;
      }
      if(item?.dropAddress?.state) {
        address += `${item.dropAddress.state}, `;
      }
      if(item?.dropAddress?.pincode) {
        address += `${item.dropAddress.pincode}`;
      }
    }
    return address;
  };

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
      .filter(
        e =>
          // e.status.toLowerCase() == 'new order' ||
          // e.status.toLowerCase() == 'new' ||
          e.status.toLowerCase() == 'approved' ||
          e.status.toLowerCase() == 'out for shifting' ||
          e.status.toLowerCase() == 'material received at warehouse' ||
          e.status.toLowerCase() == 'in transit' ||
          e.status.toLowerCase() == 'reached at destination city' ||
          e.status.toLowerCase() == 'cancelled order',
      );
  };

  const handleAddNew = () => {
    navigation.navigate(OrderStackRoute.AddOrder);
  };

  const handleOrderDetailsClick = (item: IOrderItem, index: number) => {
    navigation.navigate(OrderStackRoute.OrderDetails, {
      orderId: item.orderId,
      item: getOrderDataById(item.orderId),
    });
  };

  const getOrderDataById = (orderId: string) => {
    let order: ISingleEnquiryData | null = null;
    if (ordersArr && Array.isArray(ordersArr) && ordersArr.length > 0) {
      order = ordersArr.find(e => e._id == orderId);
    }
    return order;
  };

  const _fetchOrders = () => {
    getCurrentCompanyId().then(id => {
      const payload: Partial<IGetOrdersRequest> = {
        companyId: id as string,
      };
      dispatch(getOrdersRequest(payload));
    }).catch(err => console.log(err));
  }

  const handleOnRefresh = useCallback(() => {
    _fetchOrders();
  }, []);

  useEffect(() => {
    _fetchOrders();
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
        ListEmptyComponent={() => <Text style={styles.text}>No Orders available!</Text>}
      />
    </View>
  );
};

export default OrderPageView;
