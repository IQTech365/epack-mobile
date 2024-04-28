import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, Text, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import styles from './styles';
import InvoiceFormView from '../InvoiceFormView';
import { InvoiceFormContextProvider } from '../../../../../provider/InvoiceFormContextProvider';
import { ISingleEnquiryData } from '../../../../../interface/enquiry/ISingleEnquiryResponse';
import {
  getInvoiceHtmlRequest,
  getInvoiceListRequest,
  resetGetInvoiceHtmlRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import { IInvoice } from '../../../../../interface/order/IGetInvoiceListResponse';
import InvoiceListItem from './InvoiceListItem';
import { IHtmlTemplateRequest } from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import { startShare } from '../../../../../utils/utility';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  getVehicleCompanyRequest,
  getVehicleModelsRequest,
  getVehicleTypesRequest,
} from '../../../../../redux/slices/CommonSlice';
import { getVehicleSizeRequest } from '../../../../../redux/slices/VehicleSlice';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import AlertModal from '../../../../../common/AlertModal';
import LimitReachImage from '../../../../../images/icons/limit_reach.svg';

interface IInvoiceViewProps {
  orderId: string;
  item: ISingleEnquiryData;
  navigation: NavigationProp<any, any>;
}

const InvoiceView: React.FC<IInvoiceViewProps> = ({ orderId, item, navigation }) => {
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
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3ce2585e3dde644da98c');
  const { totalDocuments, hasSubscription, getTotalDocumentCount, loading } = useUtilityHook();

  const handleCreateNewInvoice = () => {
    if (totalDocuments < 10 || hasSubscription) {      
      setShowInvoiceList(false);
      setCreateNewInvoice(true);
      setShowLimitModal(false);
    } else if (totalDocuments >= 10 && !hasSubscription){
      setShowLimitModal(true);
    }
  };

  const handleShowInvoiceList = () => {
    setShowInvoiceList(true);
    setCreateNewInvoice(false);
    setShowLimitModal(false);
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

  const onEdit = () => { };

  const hanldeAlertModalClose = () => {
    setShowLimitModal(false);
    if (totalDocuments >= 10 && !hasSubscription){
      setShowInvoiceList(true);
      setCreateNewInvoice(false);
    }
  }

  const handlePlanUpgrade = () => {
    setShowLimitModal(false);
    navigation.navigate("Subscription");
  }

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Invoice Found!</Text>
      </View>
    );
  };

  const _getInvoiceList = (): IInvoice[] => {
    let list: IInvoice[] = [];
    const { data } = invoices || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const _handleEditInvoice = (invoice: IInvoice) => {
    //@ts-ignore
    navigation.navigate('EditInvoice', {
      item: invoice,
      enquiry: item,
      orderID: orderId,
    });
  };

  useEffect(() => {
    dispatch(getInvoiceListRequest(orderId));
    dispatch(getVehicleCompanyRequest());
    dispatch(getVehicleModelsRequest());
    dispatch(getVehicleTypesRequest());
    dispatch(getVehicleSizeRequest());
    getTotalDocumentCount();
  }, []);

  useEffect(() => {
    if (totalDocuments >= 10 && !hasSubscription){
      setShowLimitModal(true);
    }
  }, [totalDocuments, hasSubscription]);

  const handleOnRefresh = useCallback(() => {
    dispatch(getInvoiceListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewInvoice) {
      return (
        <InvoiceFormContextProvider>
          <InvoiceFormView
            orderId={orderId}
            item={item}
            onSuccess={onSuccess}
          />
        </InvoiceFormContextProvider>
      );
    }
    return null;
  };

  const showList = () => {
    if (showInvoiceList) {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}
            data={_getInvoiceList()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleOnRefresh} />
            }
            renderItem={({ item, index }) => (
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
            <View style={{ flex: 1 }}>
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
      <AlertModal 
        visible={showLimitModal}
        icon={<LimitReachImage width={200} height={200} />}
        onClose={hanldeAlertModalClose} 
        onUpgrade={handlePlanUpgrade} 
        title='Your document create limit has been reached. Please upgrade your plan.'
        buttonText='UPGRADE'
      />
      <Spinner show={getInvoiceHtmlRequesting || loading} />
    </>
  );
};

export default InvoiceView;
