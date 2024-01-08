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
import {ISingleEnquiryData} from '../../../../../interface/enquiry/ISingleEnquiryResponse';
import {getInvoiceHtmlRequest, getInvoiceListRequest, resetGetInvoiceHtmlRequest} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {IInvoice} from '../../../../../interface/order/IGetInvoiceListResponse';
import InvoiceListItem from './InvoiceListItem';
import { IHtmlTemplateRequest } from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import { startShare } from '../../../../../utils/utility';

interface IInvoiceViewProps {
  orderId: string;
  item: ISingleEnquiryData;
}

const InvoiceView: React.FC<IInvoiceViewProps> = ({orderId, item}) => {
  const dispatch = useAppDispatch();
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

  const handleCreateNewInvoice = () => {
    setShowInvoiceList(false);
    setCreateNewInvoice(true);
  };

  const handleShowInvoiceList = () => {
    setShowInvoiceList(true);
    setCreateNewInvoice(false);
  };

  const handleShowPreviewModalClose = () => {
    dispatch(resetGetInvoiceHtmlRequest());
    setShowPreview(false);
  };

  const handleDocDownload = (docId:string) => {
    const payload: IHtmlTemplateRequest = {
      templateId: '657d77534a69ca45d2255096',
      docId: docId,
    };
    dispatch(getInvoiceHtmlRequest(payload));
  }

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
              onEdit={() => {}}
            />
          )}
          ListEmptyComponent={showEmptyView()}
        />
        <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
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
  }, [
    getInvoiceHtmlRequesting,
    getInvoiceHtmlSuccess,
    getInvoiceHtmlFailure,
  ]);

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
