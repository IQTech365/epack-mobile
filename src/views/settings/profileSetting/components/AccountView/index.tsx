import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import AccountDetailUpdateView from '../AccountFormView';
import {useAppDispatch} from '../../../../../redux/hooks';
import {getPaymentMethodsRequest} from '../../../../../redux/slices/ProfileSettingSlice';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import { getBankListRequest } from '../../../../../redux/slices/CommonSlice';

const AddAccountView = () => {
  const [showPaymentMethodList, setShowPaymentMethodList] =
    useState<boolean>(false);
  const [showAddPaymentMehod, setShowAddPaymentMethod] =
    useState<boolean>(true);
  const dispatch = useAppDispatch();

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
          data={[]}
          renderItem={({item, index}) => <Text>Hello</Text>}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ActionHeaderView
        count={0}
        onCreate={handleCreateNewBilty}
        onShow={handleShowBiltyList}
      />
      {showForm()}
      {showList()}
    </View>
  );
};

export default AddAccountView;
