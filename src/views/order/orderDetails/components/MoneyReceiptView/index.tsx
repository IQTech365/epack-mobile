import React, {useCallback, useState} from 'react';
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

interface IMoneyReceiptViewProps {
  orderId: string;
}

const MoneyReceiptView: React.FC<IMoneyReceiptViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.Order);

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

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No MoneyReceipt Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    // dispatch(getQuotationsRequest(enquiryId));
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
            <RefreshControl refreshing={false} onRefresh={handleOnRefresh} />
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
    </>
  );
};

export default MoneyReceiptView;
