import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import BiltyFormView from '../BiltyFormView';
import styles from './styles';
import {
  getBiltyHtmlRequest,
  getBiltyListRequest,
  resetGetBiltyHtmlRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {BiltyFormContextProvider} from '../../../../../provider/BiltyFormContextProvider';
import BiltyListItem from './BiltyListItem';
import {IBiltyItem} from './IBiltyItem';
import {
  IBilty,
  IBiltyFreight,
} from '../../../../../interface/order/IGetBiltyListResponse';
import {IHtmlTemplateRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import {startShare} from '../../../../../utils/utility';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import AlertModal from '../../../../../common/AlertModal';
import {NavigationProp} from '@react-navigation/native';
import PreviewShareModal from '../../../../../common/PreviewShareModal';
import LimitReachImage from '../../../../../images/icons/limit_reach.svg';


interface IBiltyViewProps {
  orderId: string;
  navigation: NavigationProp<any, any>;
}

const BiltyView: React.FC<IBiltyViewProps> = ({orderId, navigation}) => {
  const dispatch = useAppDispatch();
  const {
    biltyList,
    getBiltyListRequesting,
    biltyTemplateHtml,
    getBiltyHtmlRequesting,
    getBiltyHtmlSuccess,
    getBiltyHtmlFailure,
  } = useAppSelector(state => state.Order);
  console.log(JSON.stringify(biltyList));

  const [showBiltyList, setShowBiltyList] = useState<boolean>(false);
  const [createNewBilty, setCreateNewBilty] = useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>('');
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const [showPreviewShareModal, setShowPreviewShareModal] =
    useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3cb5585e3dde644da97e');
  const {getDocumentLimitCount} = useUtilityHook();

  const getTotalBilty = () => {
    const {data} = biltyList || {};
    let _count = 0;
    if (data && Array.isArray(data) && data.length > 0) {
      _count = data.length;
    }
    return _count;
  };

  const _getBiltyType = (bilty: IBilty) => {
    let biltyType: string = '';
    const {biltyfreights} = bilty;
    if (biltyfreights && biltyfreights.length > 0) {
      const biltyFreight: IBiltyFreight = biltyfreights[0];
      biltyType = biltyFreight.freightDetails.billingStatus;
    }
    return biltyType;
  };

  const presentModal = (docId: string) => {
    setDocumentId(docId);
    setShowPreviewShareModal(true);
  };

  const dismissModal = () => {
    setDownloadOption('');
    setShowPreviewShareModal(false);
  };

  const _getBiltyData = () => {
    const {data} = biltyList || {};
    let items: IBiltyItem[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      items = data.map((bilty: IBilty) => {
        const item: IBiltyItem = {
          id: bilty._id,
          enter_date: bilty.createdAt,
          bilty_date: bilty.biltyDate,
          bilty_no: bilty.biltyNumber,
          billing_by: 'NA',
          moving_type: 'NA', // TODO: Not available in the api response
          from_location: bilty?.loadingAddress?.city,
          to_location: bilty?.unloadingAddress?.city,
          transit_days: bilty.vehicle.transitDays,
          risk_type: bilty.riskType,
          tax_liability: 'NA', //TODO: Not available in the api response
          billing_type: _getBiltyType(bilty),
          expected_date_of_delivery: bilty.vehicle.expectedDateOfDelivery,
        };
        return item;
      });
    }
    return items;
  };

  const handleCreateNewBilty = () => {
    const docLimit: number = getDocumentLimitCount('');
    const currentDocCount: number = getTotalBilty();
    if (docLimit == -1 || currentDocCount < docLimit) {
      setShowBiltyList(true);
      setCreateNewBilty(false);
      setShowLimitModal(false);
    } else {
      setShowLimitModal(true);
    }
  };

  const handleShowBiltyList = () => {
    setShowBiltyList(true);
    setCreateNewBilty(false);
    setShowLimitModal(false);
  };

  const onSuccess = () => {
    setShowBiltyList(true);
    setCreateNewBilty(false);
    dispatch(getBiltyListRequest(orderId));
  };

  const handleShowPreviewModalClose = () => {
    dispatch(resetGetBiltyHtmlRequest());
    setShowPreview(false);
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getBiltyListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Bilty Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getBiltyListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewBilty) {
      return (
        <BiltyFormContextProvider>
          <BiltyFormView orderId={orderId} onSuccess={onSuccess} />
        </BiltyFormContextProvider>
      );
    }
    return null;
  };

  const onEdit = (id:String) => {
    const {data} = biltyList || {};
    if(data && Array.isArray(data) && data.length > 0) {
      const bilty:IBilty = data.find((ele:IBilty) => ele._id === id);
      navigation.navigate("EditBilty", {item: bilty, orderID: orderId})
    }
  };

  const handleDocumentDownload = async () => {
    setShowPreviewShareModal(false);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      quotationId: documentId,
      biltyCopyType: downloadOption,
    };
    dispatch(getBiltyHtmlRequest(payload));
  };

  const hanldeAlertModalClose = () => {
    setShowLimitModal(false);
  };

  const handlePlanUpgrade = () => {
    setShowLimitModal(false);
    navigation.navigate('Subscription');
  };

  const showList = () => {
    if (showBiltyList) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
            data={_getBiltyData()}
            refreshControl={
              <RefreshControl
                refreshing={getBiltyListRequesting}
                onRefresh={handleOnRefresh}
              />
            }
            renderItem={({item, index}) => (
              <BiltyListItem
                item={item}
                index={index}
                onPress={() => {
                  // presentModal(item.id)
                }}
                onShare={() => {
                  setShowShare(true);
                  setShowPreview(false);
                  setShowDownload(false);
                  presentModal(item.id);
                }}
                onDownload={() => {}}
                onPreview={() => {
                  setShowShare(false);
                  setShowPreview(true);
                  setShowDownload(false);
                  presentModal(item.id);
                }}
                onEdit={() => onEdit(item.id)}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <PreviewShareModal
            visible={showPreviewShareModal}
            onClose={dismissModal}
            onOk={handleDocumentDownload}
            biltyCopyType={downloadOption}
            onBiltyCopyTypeChange={setDownloadOption}
            isShare={showShare}
          />
          <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
            modalStyle={styles.modalStyle}
            headerStyle={styles.headerStyle}
            title="Preview">
            <View style={{flex: 1}}>
              <TemplateViewer html={biltyTemplateHtml} />
            </View>
          </ModalHOC>
          <AlertModal
            visible={showLimitModal}
            icon={<LimitReachImage width={200} height={200} />}
            onClose={hanldeAlertModalClose}
            onUpgrade={handlePlanUpgrade}
            title='Your free document create limit has been reached. Please upgrade your plan.'
            buttonText='UPGRADE'
          />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!getBiltyHtmlRequesting && getBiltyHtmlSuccess) {
      if (showPreview) {
        setShowPreviewShareModal(false);
        setShowModal(true);
      } else if (showShare) {
        startShare(
          biltyTemplateHtml,
          'Bilty',
          dispatch(resetGetBiltyHtmlRequest()),
          true,
        );
      }
    } else if (!getBiltyHtmlRequesting && getBiltyHtmlFailure) {
      setShowPreview(false);
      setShowShare(false);
      setShowDownload(false);
      dispatch(resetGetBiltyHtmlRequest());
    }
  }, [getBiltyHtmlRequesting, getBiltyHtmlSuccess, getBiltyHtmlFailure]);

  return (
    <>
      <ActionHeaderView
        count={_getBiltyData().length}
        onShow={handleShowBiltyList}
        onCreate={handleCreateNewBilty}
      />
      {showForm()}
      {showList()}
      <Spinner show={getBiltyListRequesting} />
    </>
  );
};

export default BiltyView;
