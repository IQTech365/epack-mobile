import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getQuotationHtmlRequest, getQuotationsRequest, resetGetQuotationHtmlRequest} from '../../redux/slices/QuotationSlice';
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
import {COLOR_BLACK, COLOR_BLUE} from '../../utils/colors';
import {IGetQuotationRequest} from '../../interface/quotation/IGetQuotationRequest';
import {
  IEnquiry,
  IGetQuotationData,
} from '../../interface/quotation/IGetQuotationsResponse';
import {IGetEnquiriesData} from '../../interface/enquiry/IGetEnquiriesResponse';
import useCompanyId from '../../hooks/useCompanyId';
import { sortItemByDate } from '../../utils/formatter';
import { IHtmlTemplateRequest } from '../../interface/order/templates/ITemplateResponse';
import ModalHOC from '../../common/ModalHOC';
import TemplateViewer from '../../common/TemplateViewer';
interface IQuotationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const downloadOptions = ['With Sign. & Stamp', 'Without Sign. & Stamp'];

const QuotationPageView: React.FC<IQuotationPageViewProps> = ({navigation}) => {
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
  const {data: quotationData} = quotations || {};
  const companyId = useCompanyId();
  const [showPreview, setShowPreview] = useState<boolean>(false);

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

  const _getClientName = (item:IGetQuotationData) => {
    let name:string = 'NA';
    //@ts-ignore
    const {enquiries} = item;
    if(enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry:IEnquiry = enquiries[0];
      if(enquiry?.partyName) {
        name = enquiry?.partyName;
        //@ts-ignore
      } else if(enquiry.billingDetails?.companyName) {
        //@ts-ignore
        name = enquiry.billingDetails?.companyName;
        //@ts-ignore
      } else if(enquiry.billingDetails?.authorityPersonName) {
        //@ts-ignore
        name = enquiry.billingDetails?.authorityPersonName;
        //@ts-ignore
      } else if(enquiry.billingDetails?.employeeName) {
        //@ts-ignore
        name = enquiry.billingDetails?.employeeName;
      }
    }
    return name;
  }

  const _getFromDestination = (item:IGetQuotationData) => {
    let destination:string = 'NA';
    const {enquiries} = item;
    if(enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry:IEnquiry = enquiries[0];
      if(enquiry?.pickupAddress.city) {
        destination = enquiry?.pickupAddress.city;
      }
    }
    return destination;
  }

  const _getToDestination = (item:IGetQuotationData) => {
    let destination:string = 'NA';
    const {enquiries} = item;
    if(enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry:IEnquiry = enquiries[0];
      if(enquiry?.dropAddress.city) {
        destination = enquiry?.dropAddress.city;
      }
    }
    return destination;
  }

  const _getShiftingType = (item:IGetQuotationData) => {
    let shiftingType:string = 'NA';
    const {enquiries} = item;
    if(enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry:IEnquiry = enquiries[0];
      if(enquiry?.shiftingType) {
        shiftingType = enquiry?.shiftingType;
      }
    }
    return shiftingType;
  }

  const _getMobile = (item:IGetQuotationData) => {
    let mobile:string = 'NA';
    //@ts-ignore
    const {enquiries} = item;
    if(enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry:IEnquiry = enquiries[0];
      if(enquiry?.mobile) {
        mobile = enquiry?.mobile;
        //@ts-ignore
      } else if(enquiry.billingDetails?.authority_mobile_number) {
        //@ts-ignore
        mobile = enquiry.billingDetails?.authority_mobile_number;
        //@ts-ignore
      } else if(enquiry.billingDetails?.employee_mobile_number) {
        //@ts-ignore
        mobile = enquiry.billingDetails?.employee_mobile_number;
      }
    }
    return mobile;
  }

  const transformQuotationData = () => {
    let _data: IQuotationItem[] = [];
    if (
      quotationData &&
      Array.isArray(quotationData) &&
      quotationData.length > 0
    ) {
      _data = quotationData.map((quotation: IGetQuotationData) => {
        const {quotationNumber, enquiries, quotationData, quotationAmount} =
          quotation;
        const item: IQuotationItem = {
          quotationNo: quotationNumber,
          clientName: _getClientName(quotation),
          fromDestination: _getFromDestination(quotation),
          toDestination: _getToDestination(quotation),
          shiftingType: _getShiftingType(quotation),
          quotationAmount: quotationAmount,
          quotationDate: quotationData,
          phoneNumber: _getMobile(quotation),
          id: quotation._id,
        };
        return item;
      });
      // return _data;
    }
    return [..._data].sort((a: IQuotationItem, b: IQuotationItem) =>
      sortItemByDate(a.quotationDate, b.quotationDate),
    );
  };

  const handleCardClick = (quotation: IQuotationItem) => {
    const item: IGetQuotationData = quotationData?.find((e:IGetQuotationData) => e.quotationNumber == quotation.quotationNo);
    if(item !== undefined && item.enquiries.length > 0) {
      const enquiry:IEnquiry = item.enquiries[0];
      console.log('handleCardClick--enquiry--', JSON.stringify(enquiry));
      //@ts-ignore
      navigation.jumpTo(TabRoute.EnquiryStack, {screen: EnquiryStackRoute.EnquiryDetails, params: {enquiryId: enquiry._id, item: enquiry},});
    }
    
    // const item: IGetEnquiriesData = quotationData[index]?.enquiries[0];
    // navigation.navigate(TabRoute.EnquiryStack, {
    //   screen: EnquiryStackRoute.EnquiryDetails,
    //   params: {enquiryId: item._id, item: item},
    // });
    
  };

  const handleEditClick = (quotation: IQuotationItem) => {
    const item: IGetQuotationData = quotationData?.find((e:IGetQuotationData) => e.quotationNumber == quotation.quotationNo);
    navigation.navigate(QuotationStackRoute.AddQuotation, {item: item, isEdit: true});
  };

  const presentModal = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const dismissModal = () => {
    setDownloadOption('');
    bottomSheetRef.current?.close();
  };

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  };

  const handleOnRefresh = useCallback(() => {
    const payload: IGetQuotationRequest = {
      companyId: companyId,
    };
    dispatch(getQuotationsRequest(payload));
  }, []);

  useEffect(() => {
    const payload: IGetQuotationRequest = {
      //Note: we can also pass branchId, authId, or id to get the quotation info.
      companyId: companyId,
    };
    dispatch(getQuotationsRequest(payload));
  }, []);

  useEffect(() => {
    if (
      !getQuotationTemplateHtmlRequesting &&
      getQuotationTemplateHtmlSuccess
    ) {
      // if (!showShareModal && !shouldDownload) {
      //   setShowPreview(true);
      // }
      setShowPreview(true);
      dispatch(resetGetQuotationHtmlRequest());
    } else if (
      !getQuotationTemplateHtmlRequesting &&
      getQuotationTemplateHtmlFailure
    ) {
      // if (!showShareModal && !shouldDownload) {
      //   setShowPreview(false);
      // }
      setShowPreview(false);
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

  const _handleShowPreview = (docId:string) => {
    console.log('docId----', docId);
    
    const payload: IHtmlTemplateRequest = {
      templateId: '657716243e3f2f19e00f4db4',//657716243e3f2f19e00f4db4
      docId: docId,
      // docId: '656f2dbafcf76d29998f1fae'
    };
    dispatch(getQuotationHtmlRequest(payload));
  }

  const _hanldeCloseShowPreviewModal = () => {
    setShowPreview(false);
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
        renderItem={({item, index}) => (
          <QuotationListItem
            item={item}
            index={index}
            onPress={() => handleCardClick(item)}
            onShare={() => {}}
            onDownload={presentModal}
            onPreview={() => {_handleShowPreview(item.id)}}
            onEdit={() => handleEditClick(item)}
          />
        )}
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
            style={downloadButtonStyle}
            activeOpacity={0.6}
            disabled={downloadOption == ''}>
            <Text style={styles.downloadText}>Download</Text>
          </TouchableOpacity>
        </>
      </FormModal>
      <ModalHOC
            visible={showPreview}
            onClose={_hanldeCloseShowPreviewModal}
            title="Preview">
            <View style={{flex: 1}}>
              <TemplateViewer html={quotationTemplateHtml} />
            </View>
          </ModalHOC>
    </View>
  );
};

export default QuotationPageView;
