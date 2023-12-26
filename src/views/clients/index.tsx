import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {ClientStackRoute} from '../../utils/constants';
import styles from './style';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import useCompanyId from '../../hooks/useCompanyId';
import {ICustomer, ICustomerRequest} from '../../interface/customer/customer';
import {getCustomersRequest} from '../../redux/slices/CustomerSlice';
import Spinner from '../../common/Spinner';
import ClientListItem from './clientDetails/components/ClientListItem';

interface IClientPageViewProps {
  navigation: NavigationProp<any, any>;
}

const ClientPageView: React.FC<IClientPageViewProps> = ({navigation}) => {
  const companyId = useCompanyId();
  const {getCustomersRequesting, customers} = useAppSelector(
    state => state.Customer,
  );
  console.log('ClientsPage--customers--', JSON.stringify(customers));
  const dispatch = useAppDispatch();

  const _fetchCustomers = () => {
    const payload: ICustomerRequest = {
      companyId: companyId,
    };
    dispatch(getCustomersRequest(payload));
  };

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
  }, [dispatch]);

  const handleClientDetailsClick = (item: any) => {
    navigation.navigate(ClientStackRoute.ClientDetails, {item: item});
  };

  return (
    <View style={styles.container}>
      <Header label="Clients" canGoBack={true} showDrawerIcon={true} />
      <Spacer height={4} />
      {/* <AddNew countLabel="Total Orders" count="1200" onPress={handleAddNew} /> */}
      <Spacer height={12} />
      <FlatList
        contentContainerStyle={styles.listContent}
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
        ListEmptyComponent={() => <Text>No Clients available</Text>}
      />
      <Spinner show={getCustomersRequesting} />
    </View>
  );
};

export default ClientPageView;
