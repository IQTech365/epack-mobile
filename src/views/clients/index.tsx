import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {ClientStackRoute} from '../../utils/constants';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {ICustomer, ICustomerRequest} from '../../interface/customer/customer';
import {getCustomersRequest} from '../../redux/slices/CustomerSlice';
import Spinner from '../../common/Spinner';
import ClientListItem from './clientDetails/components/ClientListItem';
import { IGetOrdersRequest } from '../../interface/order/IGetOrdersRequest';
import { getOrdersRequest } from '../../redux/slices/OrderSlice';
import Label from '../../common/Label';
import { getCurrentCompanyId } from '../../utils/storage';

interface IClientPageViewProps {
  navigation: NavigationProp<any, any>;
}

const ClientPageView: React.FC<IClientPageViewProps> = ({navigation}) => {
  
  const {getCustomersRequesting, customers} = useAppSelector(
    state => state.Customer,
  );
  const {orders, getOrdersRequesting} = useAppSelector(state => state.Order);
  const dispatch = useAppDispatch();

  const _fetchCustomers = () => {
    getCurrentCompanyId().then(id => {
      const payload: ICustomerRequest = {
        companyId: id as string,
      };
      dispatch(getCustomersRequest(payload));
    }).catch(err => console.log('api-error', err));
  };

  const _fetchOrders = () => {
    // const payload: Partial<IGetOrdersRequest> = {
    //   companyId: companyId,
    // };
    // dispatch(getOrdersRequest(payload));
  }

  const handleOnRefresh = useCallback(() => {
    _fetchCustomers();
  }, []);

  const _getCustomerList = () => {
    const {data} = customers || {};
    let list:ICustomer[] = [];
    if(data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  }

  useEffect(() => {
    _fetchCustomers();
  }, []);

  const handleClientDetailsClick = (item: any) => {
    navigation.navigate(ClientStackRoute.ClientDetails, {item: item});
  };

  return (
    <View style={styles.container}>
      <Header label="Clients" canGoBack={true} showDrawerIcon={true} />
      <Spacer height={4} />
      <Label text={`Total Clients: ${_getCustomerList().length}`} style={styles.clientCount} />
      <FlatList
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={_getCustomerList()}
        refreshControl={
          <RefreshControl
            refreshing={getCustomersRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({item, index}) => (
          <ClientListItem
            item={item}
            index={index}
            onPress={() => handleClientDetailsClick(item)}
          />
        )}
        ListEmptyComponent={() => <Text style={styles.text}>No Clients available!</Text>}
      />
      <Spinner show={getCustomersRequesting} />
    </View>
  );
};

export default ClientPageView;
