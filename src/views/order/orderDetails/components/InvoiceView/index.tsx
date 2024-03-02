import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import InvoiceFormView from '../InvoiceFormView';
import {InvoiceFormContextProvider} from '../../../../../provider/InvoiceFormContextProvider';
import {ISingleEnquiryData} from '../../../../../interface/enquiry/ISingleEnquiryResponse';
import {
  getInvoiceHtmlRequest,
  getInvoiceListRequest,
  resetGetInvoiceHtmlRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {IInvoice} from '../../../../../interface/order/IGetInvoiceListResponse';
import InvoiceListItem from './InvoiceListItem';
import {IHtmlTemplateRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import {startShare} from '../../../../../utils/utility';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import { useNavigation } from '@react-navigation/native';

interface IInvoiceViewProps {
  orderId: string;
  item: ISingleEnquiryData;
}

const InvoiceView: React.FC<IInvoiceViewProps> = ({orderId, item}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {
    getInvoicesRequesting,
    invoices,
    getInvoiceHtmlRequesting,
    invoiceTemplateHtml,
    getInvoiceHtmlSuccess,
    getInvoiceHtmlFailure,
  } = useAppSelector(state => state.Order);

  const [showInvoiceList, setShowInvoiceList] = useState<boolean>(false);
  const [createNewInvoice, setCreateNewInvoice] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3ce2585e3dde644da98c');

  // console.log('invoices----', JSON.stringify(invoices));
  

  const handleCreateNewInvoice = () => {
    setShowInvoiceList(false);
    setCreateNewInvoice(true);
  };

  const handleShowInvoiceList = () => {
    setShowInvoiceList(true);
    setCreateNewInvoice(false);
  };

  const onSuccess = () => {
    setShowInvoiceList(true);
    setCreateNewInvoice(false);
    dispatch(getInvoiceListRequest(orderId));
  };

  const handleShowPreviewModalClose = () => {
    setShowPreview(false);
    setShowModal(false);
    dispatch(resetGetInvoiceHtmlRequest());
  };

  const handleDocDownload = (docId: string) => {
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      quotationId: docId,
    };
    dispatch(getInvoiceHtmlRequest(payload));
  };

  const onEdit = () => {};

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Invoice Found!</Text>
      </View>
    );
  };

  const _getInvoiceList = (): IInvoice[] => {
    let list: IInvoice[] = [];
    const {data} = invoices || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const _handleEditInvoice = (invoice: IInvoice) => {
    //@ts-ignore
    navigation.navigate("EditInvoice", {item: invoice, enquiry: item, orderID: orderId});
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
          <InvoiceFormView orderId={orderId} item={item} onSuccess={onSuccess} />
        </InvoiceFormContextProvider>
      );
    }
    return null;
  };

  const showList = () => {
    if (showInvoiceList) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
            data={_getInvoiceList()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleOnRefresh} />
            }
            renderItem={({item, index}) => (
              <InvoiceListItem
                item={item}
                index={index}
                onPress={() => {
                  // presentModal(item.id)
                }}
                onShare={() => {
                  setShowPreview(false);
                  setShowShare(true);
                  handleDocDownload(item._id);
                }}
                onDownload={() => {
                  //
                }}
                onPreview={() => {
                  setShowPreview(true);
                  setShowShare(false);
                  handleDocDownload(item._id);
                }}
                onEdit={() => {
                  _handleEditInvoice(item);
                }}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
            modalStyle={styles.modalStyle}
            headerStyle={styles.headerStyle}
            title="Preview">
            <View style={{flex: 1}}>
              <TemplateViewer html={invoiceTemplateHtml} />
            </View>
          </ModalHOC>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!getInvoiceHtmlRequesting && getInvoiceHtmlSuccess) {
      if (showPreview) {
        setShowModal(true);
      } else if (showShare) {
        startShare(
          invoiceTemplateHtml,
          'Invoice',
          dispatch(resetGetInvoiceHtmlRequest()),
        );
      }
    } else if (!getInvoiceHtmlRequesting && getInvoiceHtmlFailure) {
      setShowPreview(false);
      setShowShare(false);
      // setShowDownload(false);
      dispatch(resetGetInvoiceHtmlRequest());
    }
  }, [getInvoiceHtmlRequesting, getInvoiceHtmlSuccess, getInvoiceHtmlFailure]);

  return (
    <>
      <ActionHeaderView
        count={_getInvoiceList().length}
        onShow={handleShowInvoiceList}
        onCreate={handleCreateNewInvoice}
      />
      {showForm()}
      {showList()}
      <Spinner show={getInvoiceHtmlRequesting} />
    </>
  );
};

export default InvoiceView;
