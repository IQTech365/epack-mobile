import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import BiltyFormView from '../BiltyFormView';
import styles from './styles';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import {getBiltyHtmlRequest, getBiltyListRequest, resetGetBiltyHtmlRequest} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {BiltyFormContextProvider} from '../../../../../provider/BiltyFormContextProvider';
import BiltyListItem from './BiltyListItem';
import {IBiltyItem} from './IBiltyItem';
import {
  IBilty,
  IBiltyFreight,
} from '../../../../../interface/order/IGetBiltyListResponse';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import FormModal from '../../../../settings/formModal';
import {downloadOptions} from './downloadOptions';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import {IHtmlTemplateRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import { startShare } from '../../../../../utils/utility';

interface IBiltyViewProps {
  orderId: string;
}

const BiltyView: React.FC<IBiltyViewProps> = ({orderId}) => {
  const dispatch = useAppDispatch();
  const {
    biltyList,
    getBiltyListRequesting,
    biltyTemplateHtml,
    getBiltyHtmlRequesting,
    getBiltyHtmlSuccess,
    getBiltyHtmlFailure,
  } = useAppSelector(state => state.Order);
  console.log('biltyList----', JSON.stringify(biltyList));

  const [showBiltyList, setShowBiltyList] = useState<boolean>(false);
  const [createNewBilty, setCreateNewBilty] = useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>('');

  const bottomSheetRef = useRef<BottomSheet>(null);

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
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    // setOpenShare(false);
    // setShouldDownload(false);
    bottomSheetRef.current?.close();
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
    setShowBiltyList(false);
    setCreateNewBilty(true);
  };

  const handleShowBiltyList = () => {
    setShowBiltyList(true);
    setCreateNewBilty(false);
  };

  const handleShowPreviewModalClose = () => {
    dispatch(resetGetBiltyHtmlRequest());
    setShowModal(false);
    
  };

  useEffect(() => {
    dispatch(getBiltyListRequest(orderId));
  }, []);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Bilty Found!</Text>
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
          <BiltyFormView orderId={orderId} />
        </BiltyFormContextProvider>
      );
    }
    return null;
  };

  const onEdit = () => {};

  const handleDocumentDownload = async () => {
    const payload: IHtmlTemplateRequest = {
      templateId: '6578288c93cd6fcba42676d5',
      docId: documentId,
    };
    dispatch(getBiltyHtmlRequest(payload));
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
                      iconStyle={{borderColor: 'red', borderRadius: 0}}
                      innerIconStyle={{borderWidth: 1, borderRadius: 0}}
                      onPress={(isChecked: boolean) => {
                        setDownloadOption(option);
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                        color: COLOR_BLACK,
                      }}
                      style={{paddingRight: 8, marginBottom: 20}}
                      textContainerStyle={{marginLeft: 10, marginRight: 4}}
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
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </>
          </FormModal>
          <ModalHOC
            visible={showModal}
            onClose={handleShowPreviewModalClose}
            title="Preview">
            <View style={{flex: 1}}>
              <TemplateViewer html={biltyTemplateHtml} />
            </View>
          </ModalHOC>
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
        if (
          !getBiltyHtmlRequesting &&
          getBiltyHtmlSuccess
        ) {
          if (showPreview) {
            setShowModal(true);
          } else if(showShare) {
            startShare(biltyTemplateHtml, 'Bilty', dispatch(resetGetBiltyHtmlRequest()));
          }
        } else if (
          !getBiltyHtmlRequesting &&
          getBiltyHtmlFailure
        ) {
          setShowPreview(false);
          setShowShare(false);
          setShowDownload(false);
          dispatch(resetGetBiltyHtmlRequest());
        }
      }, [
        getBiltyHtmlRequesting,
        getBiltyHtmlSuccess,
        getBiltyHtmlFailure,
      ]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowBiltyList} activeOpacity={0.4}>
          {showBiltyList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity onPress={handleCreateNewBilty} activeOpacity={0.4}>
          {createNewBilty ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
      <Spinner show={getBiltyListRequesting} />
    </>
  );
};

export default BiltyView;
