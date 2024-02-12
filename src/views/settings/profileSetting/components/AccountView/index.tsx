import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import AccountDetailUpdateView from '../AccountFormView';
import Spacer from '../../../../../common/Spacer';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getPaymentMethodsRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import { getCurrentCompanyId } from '../../../../../utils/storage';

const AddAccountView = () => {
  const [showPaymentMethodList, setShowPaymentMethodList] =
    useState<boolean>(false);
  const [showAddPaymentMehod, setShowAddPaymentMethod] =
    useState<boolean>(true);
    const dispatch = useAppDispatch();

  const _getPaymentMethodsRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getPaymentMethodsRequest(id as string));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _getPaymentMethodsRequest();
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
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleShowBiltyList} activeOpacity={0.4}>
          {showPaymentMethodList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewBilty} activeOpacity={0.4}>
          {showAddPaymentMehod ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
    </View>
  );
};

export default AddAccountView;
