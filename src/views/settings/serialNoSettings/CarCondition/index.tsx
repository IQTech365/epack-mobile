import React, {useEffect, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import styles from './style';
import SerilaNoSettingFormView from '../SerialNoSettingFormView';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {getSerialNoRequest} from '../../../../redux/slices/SerialNoSettingSlice';
import SerialNoListItem from '../SerialNoSettingListItem';
import useCompanyId from '../../../../hooks/useCompanyId';

interface ICarConditionSNProps {
  moduleId: string;
  moduleName: string;
}

const CarConditionSN: React.FC<ICarConditionSNProps> = ({
  moduleId,
  moduleName,
}) => {
  const {getSerialNumberRequesting, paymentMethods} = useAppSelector(
    state => state.SNSetting,
  );
  const {data: PaymentMethodsData = []} = paymentMethods || {};
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer2}>
        <Text>No Car Conditions Serial No.# Found!</Text>
      </View>
    );
  };

  const showFormView = () => {
    return (
      <SerilaNoSettingFormView moduleId={moduleId} moduleName={moduleName} />
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getSerialNoRequest(companyId));
  }, []);

  useEffect(() => {
    dispatch(getSerialNoRequest(companyId));
  }, []);

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
        renderItem={({item, index}) => { return item.moduleName === 'CAR CONDITION' ? (
          <SerialNoListItem item={item} />
        ) : null}}
        ListEmptyComponent={showEmptyView()}
        ListHeaderComponent={showFormView()}
      />
    </View>
  );
};

export default CarConditionSN;
