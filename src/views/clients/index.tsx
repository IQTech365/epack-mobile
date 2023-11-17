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

interface IClientPageViewProps {
  navigation: NavigationProp<any, any>;
}

const ClientPageView: React.FC<IClientPageViewProps> = ({ navigation }) => {
  const { otpData } = useAppSelector(state => state.OTP);
  const { addCompanyInfo, companies } = useAppSelector(state => state.Company);
  const { approvedOrders, getOrdersRequesting } =
    useAppSelector(state => state.Order);
  const { data: ordersArr } = approvedOrders || {};
  const dispatch = useAppDispatch();


  const getCompanyId = () => {
    let id;
    const { data } = addCompanyInfo || {};
    const { data: companiesData } = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
      id = companiesData._id;
    }
    return id;
  };

  const handleOnRefresh = useCallback(() => {
    let orderListReq: IGetOrdersRequest = {
      authId: otpData?.data.id as string,
      companyId: getCompanyId(),
      status: "APPROVED"
    }
    dispatch(getApprovedOrdersRequest(orderListReq));
  }, []);

  useEffect(() => {
    let orderListReq: IGetOrdersRequest = {
      authId: otpData?.data.id as string,
      companyId: getCompanyId(),
      status: "APPROVED"
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
