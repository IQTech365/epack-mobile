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
import InvoiceFormView from '../InvoiceFormView';
import {InvoiceFormContextProvider} from '../../../../../provider/InvoiceFormContextProvider';

interface IInvoiceViewProps {
  orderId: string;
}

const InvoiceView: React.FC<IInvoiceViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.Order);

  const [showInvoiceList, setShowInvoiceList] = useState<boolean>(false);
  const [createNewInvoice, setCreateNewInvoice] = useState<boolean>(true);

  const handleCreateNewInvoice = () => {
    setShowInvoiceList(false);
    setCreateNewInvoice(true);
  };

  const handleShowInvoiceList = () => {
    setShowInvoiceList(true);
    setCreateNewInvoice(false);
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Invoice Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    // dispatch(getQuotationsRequest(enquiryId));
  }, []);

  const showForm = () => {
    if (createNewInvoice) {
      return (
        <InvoiceFormContextProvider>
          <InvoiceFormView orderId={orderId} />
        </InvoiceFormContextProvider>
      );
    }
    return null;
  };

  const showList = () => {
    if (showInvoiceList) {
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
        <TouchableOpacity onPress={handleShowInvoiceList} activeOpacity={0.4}>
          {showInvoiceList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewInvoice} activeOpacity={0.4}>
          {createNewInvoice ? (
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

export default InvoiceView;
