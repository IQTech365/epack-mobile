import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { ClientStackRoute } from '../../utils/constants';
import ClientListItem, {
  IClientItem,
} from './clientDetails/components/ClientListItem';
import styles from './style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IGetOrdersRequest } from '../../interface/order/IGetOrdersRequest';
import { getApprovedOrdersRequest, getOrdersRequest } from '../../redux/slices/OrderSlice';
import useCompanyId from '../../hooks/useCompanyId';

interface IClientPageViewProps {
  navigation: NavigationProp<any, any>;
}

const ClientPageView: React.FC<IClientPageViewProps> = ({ navigation }) => {
  const { otpData } = useAppSelector(state => state.OTP);
  const companyId = useCompanyId();
  const { approvedOrders, getOrdersRequesting } =
    useAppSelector(state => state.Order);
  const { data: ordersArr } = approvedOrders || {};
  console.log('ClientPageView--orders--', JSON.stringify(ordersArr));
  
  const dispatch = useAppDispatch();

  const handleOnRefresh = useCallback(() => {
    let orderListReq: IGetOrdersRequest = {
      // authId: otpData?.data.id as string,
      companyId: companyId,
      status: "COMPLETED"
    }
    dispatch(getApprovedOrdersRequest(orderListReq));
  }, []);

  useEffect(() => {
    let orderListReq: IGetOrdersRequest = {
      authId: otpData?.data.id as string,
      companyId: companyId,
      status: "COMPLETED"
    }
    dispatch(getApprovedOrdersRequest(orderListReq));

  }, [dispatch])

  const handleEnquiryDetailsClick = () => {
    navigation.navigate(ClientStackRoute.ClientDetails);
  };

  return (
    <View style={styles.container}>
      <Header label="Clients" canGoBack={true} showDrawerIcon={true} />
      <Spacer height={4} />
      {/* <AddNew countLabel="Total Orders" count="1200" onPress={handleAddNew} /> */}
      <Spacer height={12} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={ordersArr}
        refreshControl={
          <RefreshControl
            refreshing={getOrdersRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({ item, index }) => (
          <ClientListItem
            item={item}
            index={index}
            onPress={handleEnquiryDetailsClick}
          />
        )}
        ListEmptyComponent={() => <Text>No Orders available</Text>}
      />

    </View>
  );
};

export default ClientPageView;
