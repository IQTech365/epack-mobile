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
import InvoiceFormView from '../InvoiceFormView';
import {InvoiceFormContextProvider} from '../../../../../provider/InvoiceFormContextProvider';
import { ISingleEnquiryData } from '../../../../../interface/enquiry/ISingleEnquiryResponse';
import { getInvoiceListRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import { IInvoice } from '../../../../../interface/order/IGetInvoiceListResponse';

interface IInvoiceViewProps {
  orderId: string;
  item: ISingleEnquiryData;
}

const InvoiceView: React.FC<IInvoiceViewProps> = ({orderId, item}) => {
  const dispatch = useAppDispatch();
  const {getInvoicesRequesting, invoices} = useAppSelector(state => state.Order);

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

  const _getInvoiceList = ():IInvoice[] => {
    let list:IInvoice[] = [];
    const {data} = invoices || {};
    if(data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  }

  useEffect(() => {
    dispatch(getInvoiceListRequest(orderId));
  }, []);

  const handleOnRefresh = useCallback(() => {
    dispatch(getInvoiceListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewInvoice) {
      return (
        <InvoiceFormContextProvider>
          <InvoiceFormView orderId={orderId} item={item} />
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
          data={_getInvoiceList()}
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
      <Spinner show={getInvoicesRequesting} />
    </>
  );
};

export default InvoiceView;
