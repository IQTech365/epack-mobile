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
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
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
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {IMoneyReceiptTempHtmlRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../../../../common/ModalHOC';
import MoneyReceiptTemplate from './MoneyReceiptTemplate';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

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
  console.log('MoneyReceiptList--', JSON.stringify(moneyReceiptList));
  const {data: MoneyReceiptData = []} = moneyReceiptList || {};
  const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];
  const [showMoneyReceiptList, setShowMoneyReceiptList] =
    useState<boolean>(false);
  const [createNewBiltyMoneyReceipt, setCreateNewMoneyReceipt] =
    useState<boolean>(true);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shouldDownload, setShouldDownload] = useState<boolean>(false);
  const [moneyReceiptId, setMoneyReceiptId] = useState<string>('');

  const handleCreateNewMoneyReceipt = () => {
    setShowMoneyReceiptList(false);
    setCreateNewMoneyReceipt(true);
    setIsEdit(false);
  };

  const handleShowMoneyReceipt = () => {
    setShowMoneyReceiptList(true);
    setCreateNewMoneyReceipt(false);
  };
  const presentModal = (moneyReceiptId:string) => {
    setMoneyReceiptId(moneyReceiptId);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    setShowShareModal(false);
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
    setShowPreview(false);
    
  };

  const handleShareClick = async (moneyReceiptId: string) => {
    setShowShareModal(true);
    setShouldDownload(false);
    const payload: IMoneyReceiptTempHtmlRequest = {
      templateId: '6561d45bec79daeb0af1b793',
      moneyReceiptId: moneyReceiptId,
    };
    dispatch(getMoneyReceiptHtmlRequest(payload));
  }

  const handleDownloadClick = async () => {
    setShowShareModal(false);
    setShouldDownload(true);
    const payload: IMoneyReceiptTempHtmlRequest = {
      templateId: '6561d45bec79daeb0af1b793',
      moneyReceiptId: moneyReceiptId,
    };
    dispatch(getMoneyReceiptHtmlRequest(payload));
  }

  const startDownload = async () => {
    let options = {
      html: moneyReceiptTemplateHtml,
      fileName: 'MoneyReceipt',
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log('file--', JSON.stringify(file));
  };

  const startShare = async () => {
    let options = {
      html: moneyReceiptTemplateHtml,
      fileName: 'MoneyReceipt',
      directory: 'Documents',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log('file--', JSON.stringify(file));
    // const fileExists = await RNFS.exists(file.filePath);
    // if(!fileExists) {
    //   console.log('Filed does not exists');
    //   return;
    // }

    const shareOptions = {
      file: 'pdf',
      message: 'Money Receipt Document',
      url: `file://${file.filePath}`,
    }
    Share.open(shareOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      dispatch(clearMoneyReceiptHtmlDocument());
      console.log(err);
    });
  }

  const handlePreviewClick = (moneyReceiptId: string) => {
    setShowShareModal(false);
    const payload: IMoneyReceiptTempHtmlRequest = {
      templateId: '6561d45bec79daeb0af1b793',
      moneyReceiptId: moneyReceiptId,
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
      if (!showShareModal && !shouldDownload) {
        setShowPreview(true);
      }
      dispatch(resetGetMoneyReceiptHtmlRequest());
    } else if (
      !getMoneyReceiptTemplateHtmlRequesting &&
      getMoneyReceiptTemplateHtmlFailure
    ) {
      if (!showShareModal && !shouldDownload) {
        setShowPreview(false);
      }
      dispatch(resetGetMoneyReceiptHtmlRequest());
    }
  }, [
    getMoneyReceiptTemplateHtmlRequesting,
    getMoneyReceiptTemplateHtmlSuccess,
    getMoneyReceiptTemplateHtmlFailure,
  ]);

  useEffect(() => {
    if(showShareModal) {
      startShare();
    } else if(shouldDownload) {
      console.log('shouldDownload--- called');
      startDownload();
    }
  }, [moneyReceiptTemplateHtml]);

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No MoneyReceipt Found!</Text>
      </View>
    );
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getMoneyReceiptListRequest(orderId));
  }, []);

  const showForm = () => {
    if (createNewBiltyMoneyReceipt) {
      return (
        <MoneyReceiptFormView
          orderId={orderId}
          editData={editData}
          isEdit={isEdit}
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
                onShare={() => {handleShareClick(item._id)}}
                onDownload={() => {presentModal(item._id)}}
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
                onPress={handleDownloadClick}
                style={downloadButtonStyle}
                activeOpacity={0.6}
                disabled={downloadOption == ''}>
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
            </>
          </FormModal>
          <ModalHOC
            visible={showPreview}
            onClose={handleShowPreviewModalClose}
            title="Preview">
            <View style={{flex: 1}}>
              <MoneyReceiptTemplate />
            </View>
          </ModalHOC>
        </View>
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
        <TouchableOpacity
          onPress={handleCreateNewMoneyReceipt}
          activeOpacity={0.4}>
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
      <Spinner
        show={
          getMoneyReceiptListRequesting || getMoneyReceiptTemplateHtmlRequesting
        }
      />
    </>
  );
};

export default MoneyReceiptView;
