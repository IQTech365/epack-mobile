import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import AccountDetailUpdateView from '../AccountFormView';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {getPaymentMethodsRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import { getBankListRequest } from '../../../../../redux/slices/CommonSlice';
import Spinner from '../../../../../common/Spinner';
import { IGetPaymentMethodData } from '../../../../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import PaymentMethodListItem from './component/PaymentMethodListItem';

const AddAccountView = () => {
  const [showPaymentMethodList, setShowPaymentMethodList] =
    useState<boolean>(false);
  const [showAddPaymentMehod, setShowAddPaymentMethod] =
    useState<boolean>(true);
  const dispatch = useAppDispatch();
  const {getPaymentMethodsRequesting, paymentMethods} = useAppSelector(
    state => state.Setting,
  );

  const _getPaymentMethodsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getPaymentMethodsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const _getBankListRequest = () => {
    dispatch(getBankListRequest());
  }

  const _getPaymentMethodList = ():IGetPaymentMethodData[] => {
    let list:IGetPaymentMethodData[] = [];
    const {data} = paymentMethods || {};
    if(data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  }

  const _onDelete = (id:string) => {
    //
  }

  useEffect(() => {
    _getPaymentMethodsRequest();
    _getBankListRequest();
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text style={styles.text}>No Payment Info Found!</Text>
      </View>
    );
  };

  const handleCreateNewBilty = () => {
    setShowPaymentMethodList(false);
    setShowAddPaymentMethod(true);
  };

  const handleShowBiltyList = () => {
    setShowPaymentMethodList(true);
    setShowAddPaymentMethod(false);
  };

  const showForm = () => {
    if (showAddPaymentMehod) {
      return <AccountDetailUpdateView />;
    }
    return null;
  };

  const showList = () => {
    if (showPaymentMethodList) {
      return (
        <FlatList
          data={_getPaymentMethodList()}
          renderItem={({item, index}) => (
            <PaymentMethodListItem
              item={item}
              index={index}
              onDelete={_onDelete}
            />
          )}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ActionHeaderView
        count={_getPaymentMethodList().length}
        onCreate={handleCreateNewBilty}
        onShow={handleShowBiltyList}
      />
      {showForm()}
      {showList()}
      <Spinner show={getPaymentMethodsRequesting} />
    </View>
  );
};

export default AddAccountView;
