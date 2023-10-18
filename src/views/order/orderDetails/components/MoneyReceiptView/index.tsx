import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import MoneyReceiptFormView from '../MoneyReceiptFormView';
import { getMoneyReceiptListRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';

interface IMoneyReceiptViewProps {
  orderId: string;
}

const MoneyReceiptView: React.FC<IMoneyReceiptViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {getMoneyReceiptListRequesting, moneyReceiptList} = useAppSelector(state => state.Order);
  console.log('MoneyReceiptList--', JSON.stringify(moneyReceiptList));

  const [showMoneyReceiptList, setShowMoneyReceiptList] = useState<boolean>(false);
  const [createNewBiltyMoneyReceipt, setCreateNewMoneyReceipt] = useState<boolean>(true);

  const handleCreateNewMoneyReceipt = () => {
    setShowMoneyReceiptList(false);
    setCreateNewMoneyReceipt(true);
  };

  const handleShowMoneyReceipt = () => {
    setShowMoneyReceiptList(true);
    setCreateNewMoneyReceipt(false);
  };

  useEffect(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No MoneyReceipt Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewBiltyMoneyReceipt) {
      return <MoneyReceiptFormView orderId={orderId} />;
    }
    return null;
  };

  const showList = () => {
    if (showMoneyReceiptList) {
      return (
        <FlatList
          contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
          data={[]}
          refreshControl={
            <RefreshControl refreshing={getMoneyReceiptListRequesting} onRefresh={handleOnRefresh} />
          }
          //   renderItem={({item, index}) => (
          //     <QuotationListItem item={item} index={1} onPress={() => {}} />
          //   )}
          renderItem={({item, index}) => <Text>Bilty item</Text>}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowMoneyReceipt} activeOpacity={0.4}>
          {showMoneyReceiptList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewMoneyReceipt} activeOpacity={0.4}>
          {createNewBiltyMoneyReceipt ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getMoneyReceiptListRequesting} />
    </>
  );
};

export default MoneyReceiptView;
