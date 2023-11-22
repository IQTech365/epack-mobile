import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './style';
import SerilaNoSettingFormView from '../SerialNoSettingFormView';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {getSerialNoRequest} from '../../../../redux/slices/SerialNoSettingSlice';
import SerialNoListItem from '../SerialNoSettingListItem';
import useCompanyId from '../../../../hooks/useCompanyId';

interface IInvoiceSNProps {
  moduleId: string;
  moduleName: string;
}

const InvoiceSN: React.FC<IInvoiceSNProps> = ({moduleId, moduleName}) => {
  const {getSerialNumberRequesting, paymentMethods} = useAppSelector(
    state => state.SNSetting,
  );
  const {data: PaymentMethodsData = []} = paymentMethods || {};
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Invoice Serial No.# Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getSerialNoRequest(companyId));
  }, []);

  useEffect(() => {
    dispatch(getSerialNoRequest(companyId));
  }, []);

  const showFormView = () => {
    return (
      <SerilaNoSettingFormView moduleId={moduleId} moduleName={moduleName} />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={PaymentMethodsData}
        refreshControl={
          <RefreshControl
            refreshing={getSerialNumberRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({item, index}) => <SerialNoListItem item={item} />}
        ListEmptyComponent={showEmptyView()}
        ListHeaderComponent={showFormView()}
      />
    </View>
  );
};

export default InvoiceSN;
