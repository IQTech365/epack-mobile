import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import BiltyFormView from '../BiltyFormView';
import styles from './styles';
import {
  getBiltyHtmlRequest,
  getBiltyListRequest,
  resetGetBiltyHtmlRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import { BiltyFormContextProvider } from '../../../../../provider/BiltyFormContextProvider';
import BiltyListItem from './BiltyListItem';
import { IBiltyItem } from './IBiltyItem';
import {
  IBilty,
  IBiltyFreight,
} from '../../../../../interface/order/IGetBiltyListResponse';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import FormModal from '../../../../settings/formModal';
import { downloadOptions } from './downloadOptions';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../../utils/colors';
import { IHtmlTemplateRequest } from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import { startShare } from '../../../../../utils/utility';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import AlertModal from '../../../../../common/AlertModal';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface IBiltyViewProps {
  orderId: string;
  navigation: NavigationProp<any, any>;
}

const BiltyView: React.FC<IBiltyViewProps> = ({ orderId, navigation }) => {
  const dispatch = useAppDispatch();
  const {
    biltyList,
    getBiltyListRequesting,
    biltyTemplateHtml,
    getBiltyHtmlRequesting,
    getBiltyHtmlSuccess,
    getBiltyHtmlFailure,
  } = useAppSelector(state => state.Order);

  const [showBiltyList, setShowBiltyList] = useState<boolean>(false);
  const [createNewBilty, setCreateNewBilty] = useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>('');
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3cb5585e3dde644da97e');
  const { getDocumentLimitCount } = useUtilityHook();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const getTotalBilty = () => {
    const { data } = biltyList || {};
    let _count = 0;
    if (data && Array.isArray(data) && data.length > 0) {
      _count = data.length;
    }
    return _count;
  };

  const _getBiltyType = (bilty: IBilty) => {
    let biltyType: string = '';
    const { biltyfreights } = bilty;
    if (biltyfreights && biltyfreights.length > 0) {
      const biltyFreight: IBiltyFreight = biltyfreights[0];
      biltyType = biltyFreight.freightDetails.billingStatus;
    }
    return biltyType;
  };

  const presentModal = (docId: string) => {
    setDocumentId(docId);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    // setOpenShare(false);
    // setShouldDownload(false);
    bottomSheetRef.current?.close();
  };

  const _getBiltyData = () => {
    const { data } = biltyList || {};
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
          from_location: bilty.vehicle.shiftingFrom,
          to_location: bilty.vehicle.shiftingTo,
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
    } else {
      setShowLimitModal(true);
    }
  };

  const handleShowBiltyList = () => {
    setShowBiltyList(true);
    setCreateNewBilty(false);
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

  const onEdit = () => { };

  const handleDocumentDownload = async () => {
    bottomSheetRef.current?.close();
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      quotationId: documentId,
      biltyCopyType: downloadOption,
    };
    dispatch(getBiltyHtmlRequest(payload));
  };

  const hanldeAlertModalClose = () => {
    setShowLimitModal(false);
  }

  const handlePlanUpgrade = () => {
    setShowLimitModal(false);
    navigation.navigate("OrderSubscription", {isUpgrade: true});
  }

  const showList = () => {
    if (showBiltyList) {
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}
            data={_getBiltyData()}
            refreshControl={
              <RefreshControl
                refreshing={getBiltyListRequesting}
                onRefresh={handleOnRefresh}
              />
            }
            renderItem={({ item, index }) => (
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
                onDownload={() => {
                  setShowShare(false);
                  setShowPreview(false);
                  setShowDownload(true);
                  presentModal(item.id);
                }}
                onPreview={() => {
                  setShowShare(false);
                  setShowPreview(true);
                  setShowDownload(false);
                  presentModal(item.id);
                }}
                onEdit={onEdit}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <FormModal ref={bottomSheetRef} onClose={dismissModal}>
            <>
              <View style={styles.checkboxContainer}>
                {downloadOptions.map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{ borderColor: 'red', borderRadius: 0 }}
                      innerIconStyle={{ borderWidth: 1, borderRadius: 0 }}
                      onPress={(isChecked: boolean) => {
                        setDownloadOption(option);
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                        color: COLOR_BLACK,
                      }}
                      style={{ paddingRight: 8, marginBottom: 20 }}
                      textContainerStyle={{ marginLeft: 10, marginRight: 4 }}
                      isChecked={option == downloadOption}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              <TouchableOpacity
                onPress={handleDocumentDownload}
                style={downloadButtonStyle}
                activeOpacity={0.6}
                disabled={downloadOption == ''}>
                <Text style={styles.downloadText}>Preview</Text>
              </TouchableOpacity>
            </>
          </FormModal>
          <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
            modalStyle={styles.modalStyle}
            headerStyle={styles.headerStyle}
            title="Preview">
            <View style={{ flex: 1 }}>
              <TemplateViewer html={biltyTemplateHtml} />
            </View>
          </ModalHOC>
          <AlertModal visible={showLimitModal} onClose={hanldeAlertModalClose} onUpgrade={handlePlanUpgrade} />
        </View>
      );
    }
    return null;
  };

  const downloadButtonStyle =
    downloadOption == ''
      ? styles.downloadDisabledButton
      : styles.downloadButton;

  useEffect(() => {
    if (!getBiltyHtmlRequesting && getBiltyHtmlSuccess) {
      if (showPreview) {
        bottomSheetRef.current?.close();
        setShowModal(true);
      } else if (showShare) {
        startShare(
          biltyTemplateHtml,
          'Bilty',
          dispatch(resetGetBiltyHtmlRequest()),
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
