import { NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  RefreshControl,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getQuotationHtmlRequest,
  getQuotationsRequest,
  resetGetQuotationHtmlRequest,
} from '../../redux/slices/QuotationSlice';
import {
  EnquiryStackRoute,
  QuotationStackRoute,
  TabRoute,
} from '../../utils/constants';
import QuotationListItem, {
  IQuotationItem,
} from './quotationList/components/QuotationListItem';
import styles from './style';
import BottomSheet from '@gorhom/bottom-sheet';
import FormModal from '../settings/formModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLOR_BLACK, COLOR_BLUE } from '../../utils/colors';
import { IGetQuotationRequest } from '../../interface/quotation/IGetQuotationRequest';
import {
  IEnquiry,
  IGetQuotationData,
} from '../../interface/quotation/IGetQuotationsResponse';
import { IHtmlTemplateRequest } from '../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../common/ModalHOC';
import TemplateViewer from '../../common/TemplateViewer';
import { startShare } from '../../utils/utility';
import { getCurrentCompanyId } from '../../utils/storage';
import useTemplateIdHook from '../../hooks/useTemplateIdHook';
import Spinner from '../../common/Spinner';
import useUtilityHook from '../../hooks/useUtilityHook';
import AlertModal from '../../common/AlertModal';
import LimitReachImage from '../../images/icons/limit_reach.svg';

interface IQuotationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];

const QuotationPageView: React.FC<IQuotationPageViewProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const {
    quotations = [],
    getQuotationsRequesting,
    quotationTemplateHtml,
    getQuotationTemplateHtmlRequesting,
    getQuotationTemplateHtmlSuccess,
    getQuotationTemplateHtmlFailure,
  } = useAppSelector(state => state.Quotation);
  const [downloadOption, setDownloadOption] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { data: quotationData } = quotations || {};

  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3c6f585e3dde644da95b');
  const { getDocumentLimitCount } = useUtilityHook();

  const getTotalQuotations = () => {
    let _count = 0;
    if (
      quotationData &&
      Array.isArray(quotationData) &&
      quotationData.length > 0
    ) {
      _count = quotationData.length;
    }
    return _count;
  };

  const _getClientName = (item: IGetQuotationData) => {
    let name: string = 'NA';
    //@ts-ignore
    const { enquiries } = item;
    if (enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry: IEnquiry = enquiries[0];
      if (enquiry?.partyName) {
        name = enquiry?.partyName;
        //@ts-ignore
      } else if (enquiry.billingDetails?.companyName) {
        //@ts-ignore
        name = enquiry.billingDetails?.companyName;
        //@ts-ignore
      } else if (enquiry.billingDetails?.authorityPersonName) {
        //@ts-ignore
        name = enquiry.billingDetails?.authorityPersonName;
        //@ts-ignore
      } else if (enquiry.billingDetails?.employeeName) {
        //@ts-ignore
        name = enquiry.billingDetails?.employeeName;
      }
    }
    return name;
  };

  const _getFromDestination = (item: IGetQuotationData) => {
    let destination: string = 'NA';
    const { enquiries } = item;
    if (enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry: IEnquiry = enquiries[0];
      if (enquiry?.pickupAddress.city) {
        destination = enquiry?.pickupAddress.city;
      }
    }
    return destination;
  };

  const _getToDestination = (item: IGetQuotationData) => {
    let destination: string = 'NA';
    const { enquiries } = item;
    if (enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry: IEnquiry = enquiries[0];
      if (enquiry?.dropAddress.city) {
        destination = enquiry?.dropAddress.city;
      }
    }
    return destination;
  };

  const _getShiftingType = (item: IGetQuotationData) => {
    let shiftingType: string = 'NA';
    const { enquiries } = item;
    if (enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry: IEnquiry = enquiries[0];
      if (enquiry?.shiftingType) {
        shiftingType = enquiry?.shiftingType;
      }
    }
    return shiftingType;
  };

  const _getMobile = (item: IGetQuotationData) => {
    let mobile: string = 'NA';
    //@ts-ignore
    const { enquiries } = item;
    if (enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry: IEnquiry = enquiries[0];
      if (enquiry?.mobile) {
        mobile = enquiry?.mobile;
        //@ts-ignore
      } else if (enquiry.billingDetails?.authorityPersonMobile) {
        //@ts-ignore
        mobile = enquiry.billingDetails?.authorityPersonMobile;
        //@ts-ignore
      } else if (enquiry.billingDetails?.employeeMobile) {
        //@ts-ignore
        mobile = enquiry.billingDetails?.employeeMobile;
      }
    }
    return mobile;
  };

  const transformQuotationData = () => {
    let _data: IQuotationItem[] = [];
    if (
      quotationData &&
      Array.isArray(quotationData) &&
      quotationData.length > 0
    ) {
      _data = quotationData.map((quotation: IGetQuotationData) => {
        const { quotationNumber, enquiries, quotationDate, quotationAmount } =
          quotation;
        const item: IQuotationItem = {
          quotationNo: quotationNumber,
          clientName: _getClientName(quotation),
          fromDestination: _getFromDestination(quotation),
          toDestination: _getToDestination(quotation),
          shiftingType: _getShiftingType(quotation),
          shiftingLuggage: quotation.shiftingLuggage,
          quotationAmount: quotationAmount,
          quotationDate: quotationDate,
          phoneNumber: _getMobile(quotation),
          id: quotation._id,
          createdOn: quotation.createdAt
        };
        return item;
      });
      // return _data;
    }
    // return [..._data].sort((a: IQuotationItem, b: IQuotationItem) =>
    //   sortItemByDate(a.quotationDate, b.quotationDate),
    // );
    return [..._data].reverse();
  };

  const handleCardClick = (quotation: IQuotationItem) => {
    const item: IGetQuotationData = quotationData?.find(
      (e: IGetQuotationData) => e._id == quotation.id,
    );
    if (item !== undefined && item.enquiries.length > 0) {
      const enquiry: IEnquiry = item.enquiries[0];
      //@ts-ignore
      navigation.jumpTo(TabRoute.EnquiryStack, {
        screen: EnquiryStackRoute.EnquiryDetails,
        params: { enquiryId: enquiry._id, item: enquiry },
      });
    }
    // const item: IGetEnquiriesData = quotationData[index]?.enquiries[0];
    // navigation.navigate(TabRoute.EnquiryStack, {
    //   screen: EnquiryStackRoute.EnquiryDetails,
    //   params: {enquiryId: item._id, item: item},
    // });
  };

  const handleEditClick = (quotation: IQuotationItem) => {
    const item: IGetQuotationData = quotationData?.find(
      (e: IGetQuotationData) => e.quotationNumber == quotation.quotationNo,
    );
    navigation.navigate(QuotationStackRoute.AddQuotation, {
      item: item,
      isEdit: true,
    });
  };

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    bottomSheetRef.current?.close();
  };

  const handleAddNew = () => {
    const docLimit: number = getDocumentLimitCount('658d3c6f585e3dde644da95b');
    console.log('docLimit--', docLimit);
    const currentDocCount: number = getTotalQuotations();
    console.log('currentDocCount--', currentDocCount);

    if (docLimit == -1 || (currentDocCount < docLimit)) {
      setShowLimitModal(false);
      navigation.navigate(QuotationStackRoute.AddQuotation);
    } else {
      setShowLimitModal(true);
    }
  };

  const _getQuotationsRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetQuotationRequest = {
        companyId: id as string,
      };
      dispatch(getQuotationsRequest(payload));
    }).catch(err => console.log(err));
  }

  const handleOnRefresh = useCallback(() => {
    _getQuotationsRequest();
  }, []);

  useEffect(() => {
    _getQuotationsRequest();
  }, []);

  useEffect(() => {
    if (
      !getQuotationTemplateHtmlRequesting &&
      getQuotationTemplateHtmlSuccess
    ) {
      if (openPreview) {
        setShowModal(true);
      } else if (openShare) {
        startShare(
          quotationTemplateHtml,
          'QuotationDocument',
          dispatch(resetGetQuotationHtmlRequest()),
        );
      }
      dispatch(resetGetQuotationHtmlRequest());
    } else if (
      !getQuotationTemplateHtmlRequesting &&
      getQuotationTemplateHtmlFailure
    ) {
      setShowModal(false);
      setOpenPreview(false);
      setOpenShare(false);
      dispatch(resetGetQuotationHtmlRequest());
    }
  }, [
    getQuotationTemplateHtmlRequesting,
    getQuotationTemplateHtmlSuccess,
    getQuotationTemplateHtmlFailure,
  ]);

  const downloadButtonStyle =
    downloadOption == ''
      ? styles.downloadDisabledButton
      : styles.downloadButton;

  const _handleShowPreview = (docId: string) => {
    setOpenPreview(true);
    setOpenShare(false);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      quotationId: docId,
    };
    dispatch(getQuotationHtmlRequest(payload));
  };

  const handleShareClick = async (docId: string) => {
    setOpenPreview(false);
    setOpenShare(true);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      quotationId: docId,
    };
    dispatch(getQuotationHtmlRequest(payload));
  };

  const _hanldeCloseShowPreviewModal = () => {
    dispatch(resetGetQuotationHtmlRequest());
    setShowModal(false);
    setOpenPreview(false);
    setOpenShare(false);
  };

  const hanldeAlertModalClose = () => {
    setShowLimitModal(false);
  }

  const handlePlanUpgrade = () => {
    setShowLimitModal(false);
    navigation.navigate("Subscription");
  }

  return (
    <View style={styles.container}>
      <Header
        label="Quotation Management"
        canGoBack={true}
        showDrawerIcon={true}
      />
      <Spacer height={4} />
      <AddNew
        countLabel="Total Quotations"
        count={getTotalQuotations().toString()}
        onPress={handleAddNew}
      />
      <Spacer height={12} />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={transformQuotationData()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={getQuotationsRequesting}
            onRefresh={handleOnRefresh}
          />
        }
        renderItem={({ item, index }) => (
          <QuotationListItem
            item={item}
            index={index}
            onPress={() => handleCardClick(item)}
            onShare={() => {
              handleShareClick(item.id);
            }}
            onDownload={presentModal}
            onPreview={() => {
              _handleShowPreview(item.id);
            }}
            onEdit={() => handleEditClick(item)}
          />
        )}
        ListEmptyComponent={() => <Text style={styles.text}>No Quotations available!</Text>}
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
            style={downloadButtonStyle}
            activeOpacity={0.6}
            disabled={downloadOption == ''}>
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </>
      </FormModal>
      <ModalHOC
        visible={showModal}
        onClose={_hanldeCloseShowPreviewModal}
        modalStyle={styles.modalStyle}
        headerStyle={styles.headerStyle}
        title="Preview">
        <View style={{ flex: 1 }}>
          <TemplateViewer html={quotationTemplateHtml} />
        </View>
      </ModalHOC>
      <AlertModal 
        visible={showLimitModal}
        icon={<LimitReachImage width={200} height={200} />}
        onClose={hanldeAlertModalClose} 
        onUpgrade={handlePlanUpgrade} 
        title='Your document create limit has been reached. Please upgrade your plan.'
        buttonText='UPGRADE'
      />
      <Spinner show={getQuotationTemplateHtmlRequesting} />
    </View>
  );
};

export default QuotationPageView;
