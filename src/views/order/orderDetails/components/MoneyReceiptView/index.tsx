import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Spacer from '../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import styles from './styles';
import MoneyReceiptFormView from '../MoneyReceiptFormView';
import {
  clearMoneyReceiptHtmlDocument,
  getMoneyReceiptHtmlRequest,
  getMoneyReceiptListRequest,
  resetGetMoneyReceiptHtmlRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import AddMoneyReceiptListItem from '../MoneyReceiptList';
import FormModal from '../../../../settings/formModal';
import {COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {IHtmlTemplateRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import {startShare} from '../../../../../utils/utility';
import TemplateViewer from '../../../../../common/TemplateViewer';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import ActionHeaderView from '../../../../../common/ActionHeaderView';

interface IMoneyReceiptViewProps {
  orderId: string;
}

const MoneyReceiptView: React.FC<IMoneyReceiptViewProps> = ({
  // navigation,
  orderId,
}) => {
  const dispatch = useAppDispatch();
  const {
    getMoneyReceiptListRequesting,
    moneyReceiptList,
    moneyReceiptTemplateHtml,
    getMoneyReceiptTemplateHtmlRequesting,
    getMoneyReceiptTemplateHtmlSuccess,
    getMoneyReceiptTemplateHtmlFailure,
  } = useAppSelector(state => state.Order);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {data: MoneyReceiptData = []} = moneyReceiptList || {};
  const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];
  const [showMoneyReceiptList, setShowMoneyReceiptList] =
    useState<boolean>(false);
  const [createNewMoneyReceipt, setCreateNewMoneyReceipt] =
    useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>([]);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [shouldDownload, setShouldDownload] = useState<boolean>(false);
  const [moneyReceiptId, setMoneyReceiptId] = useState<string>('');
  const templateId = useTemplateIdHook('658d3c9c585e3dde644da970');

  const _getDocCount = ():number => {
    let count:number = 0;
    if(MoneyReceiptData && Array.isArray(MoneyReceiptData)) {
      count = MoneyReceiptData.length;
    }
    return count;
  }

  const handleCreateNewMoneyReceipt = () => {
    setShowMoneyReceiptList(false);
    setCreateNewMoneyReceipt(true);
    setIsEdit(false);
  };

  const handleShowMoneyReceipt = () => {
    setShowMoneyReceiptList(true);
    setCreateNewMoneyReceipt(false);
  };

  const onSuccess = () => {
    setShowMoneyReceiptList(true);
    setCreateNewMoneyReceipt(false);
    dispatch(getMoneyReceiptListRequest(orderId));
  }

  const presentModal = (moneyReceiptId: string) => {
    setMoneyReceiptId(moneyReceiptId);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    setOpenShare(false);
    setShouldDownload(false);
    bottomSheetRef.current?.close();
  };

  const handleEditClick = (index: number) => {
    const item: any = MoneyReceiptData[index];

    setCreateNewMoneyReceipt(true);
    setShowMoneyReceiptList(false);
    setEditData(item);
    setIsEdit(true);
  };

  const handleShowPreviewModalClose = () => {
    dispatch(clearMoneyReceiptHtmlDocument());
    setOpenPreview(false);
    setShowModal(false);
  };

  const handleShareClick = async (moneyReceiptId: string) => {
    setOpenPreview(false);
    setShouldDownload(false);
    setOpenShare(true);
    //658d3c9c585e3dde644da970
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      docId: moneyReceiptId,
    };
    dispatch(getMoneyReceiptHtmlRequest(payload));
  };

  const handleDownloadClick = async () => {
    setOpenShare(false);
    setShouldDownload(true);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      docId: moneyReceiptId,
    };
    dispatch(getMoneyReceiptHtmlRequest(payload));
  };

  const handlePreviewClick = (moneyReceiptId: string) => {
    setOpenShare(false);
    setShouldDownload(false);
    setOpenPreview(true);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      docId: moneyReceiptId,
    };
    dispatch(getMoneyReceiptHtmlRequest(payload));
  };

  useEffect(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  useEffect(() => {
    if (
      !getMoneyReceiptTemplateHtmlRequesting &&
      getMoneyReceiptTemplateHtmlSuccess
    ) {
      if (openPreview) {
        setShowModal(true);
      } else if (openShare) {
        startShare(
          moneyReceiptTemplateHtml,
          'MoneyReceipt',
          dispatch(resetGetMoneyReceiptHtmlRequest()),
        );
      }
    } else if (
      !getMoneyReceiptTemplateHtmlRequesting &&
      getMoneyReceiptTemplateHtmlFailure
    ) {
      setOpenPreview(false);
      setOpenShare(false);
      setShouldDownload(false);
      dispatch(resetGetMoneyReceiptHtmlRequest());
    }
  }, [
    getMoneyReceiptTemplateHtmlRequesting,
    getMoneyReceiptTemplateHtmlSuccess,
    getMoneyReceiptTemplateHtmlFailure,
  ]);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Money Receipt Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewMoneyReceipt) {
      return (
        <MoneyReceiptFormView
          orderId={orderId}
          editData={editData}
          isEdit={isEdit}
          onSuccess={onSuccess}
        />
      );
    }
    return null;
  };

  const downloadButtonStyle =
    downloadOption == ''
      ? styles.downloadDisabledButton
      : styles.downloadButton;

  const showList = () => {
    if (showMoneyReceiptList) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
            data={MoneyReceiptData}
            refreshControl={
              <RefreshControl
                refreshing={getMoneyReceiptListRequesting}
                onRefresh={handleOnRefresh}
              />
            }
            renderItem={({item, index}) => (
              <AddMoneyReceiptListItem
                item={item}
                index={1}
                onPress={() => {}}
                onShare={() => {
                  handleShareClick(item._id);
                }}
                onDownload={() => {
                  presentModal(item._id);
                }}
                onPreview={() => {
                  handlePreviewClick(item._id);
                }}
                onEdit={() => handleEditClick(index)}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <FormModal ref={bottomSheetRef} onClose={dismissModal}>
            <>
              <View style={styles.checkboxContainer}>
                {downloadOptions.slice(0, 3).map((option, index) => {
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
                      textStyle={styles.textStyle}
                      style={{paddingRight: 8, marginBottom: 20}}
                      textContainerStyle={{marginLeft: 10, marginRight: 4}}
                      isChecked={option == downloadOption}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              <TouchableOpacity
                onPress={handleDownloadClick}
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
            modalStyle={styles.modalStyle}
            headerStyle={styles.headerStyle}
            title="Preview">
            <View style={{flex: 1}}>
              <TemplateViewer html={moneyReceiptTemplateHtml} />
            </View>
          </ModalHOC>
        </View>
      );
    }
    return null;
  };

  return (
    <>
      <ActionHeaderView
        count={_getDocCount()}
        onShow={handleShowMoneyReceipt}
        onCreate={handleCreateNewMoneyReceipt}
      />
      <Spacer height={2} />
      {showForm()}
      {showList()}
      <Spinner
        show={
          getMoneyReceiptListRequesting || getMoneyReceiptTemplateHtmlRequesting
        }
      />
    </>
  );
};

export default MoneyReceiptView;
