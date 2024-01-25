import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import AddQuotationView from '../../../../quotation/addQuotation';
import QuotationListItem, {
  IQuotationItem,
} from '../../../../quotation/quotationList/components/QuotationListItem';
import styles from './style';
import ListViewIcon from '../../../../../images/icons/list_view_icon.svg';
import ListViewIcon2 from '../../../../../images/icons/list_view_icon2.svg';
import CreateIcon from '../../../../../images/icons/create_icon.svg';
import CreateIcon2 from '../../../../../images/icons/create_icon2.svg';
import Spacer from '../../../../../common/Spacer';
import {getQuotationHtmlRequest, getQuotationsRequest, resetGetQuotationHtmlRequest} from '../../../../../redux/slices/QuotationSlice';
import { IGetQuotationRequest } from '../../../../../interface/quotation/IGetQuotationRequest';
import { IEnquiry, IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import { IHtmlTemplateRequest } from '../../../../../interface/order/templates/ITemplateResponse';
import { QuotationStackRoute } from '../../../../../utils/constants';
import { startShare } from '../../../../../utils/utility';

interface IQuotationViewProps {
  enquiryId: string;
  navigation: any;
  onItemClick: (tabIndex: number) => void;
}

const QuotationView: React.FC<IQuotationViewProps> = ({
  enquiryId,
  navigation,
  onItemClick,
}) => {
  const {
    quotations,
    getQuotationsRequesting,
    quotationTemplateHtml,
    getQuotationTemplateHtmlRequesting,
    getQuotationTemplateHtmlSuccess,
    getQuotationTemplateHtmlFailure,
  } = useAppSelector(state => state.Quotation);
  const {data: quotationData} = quotations || {};
  console.log('quotationData----', JSON.stringify(quotationData));
  
  const dispatch = useAppDispatch();
  const [showQuotationList, setShowQuotationList] = useState<boolean>(false);
  const [createNewQuotation, setCreateNewQuotation] = useState<boolean>(true);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3c6f585e3dde644da95b');

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
      _data = quotationData
        .filter((e: IGetQuotationData) => e.enquiryId == enquiryId)
        .map((quotation: IGetQuotationData) => {
          const {quotationNumber, quotationData, quotationAmount} = quotation;
          const item: IQuotationItem = {
            quotationNo: quotationNumber,
            clientName: _getClientName(quotation),
            fromDestination: _getFromDestination(quotation),
            toDestination: _getToDestination(quotation),
            shiftingType: _getShiftingType(quotation),
            quotationAmount: quotationAmount,
            quotationDate: quotationData,
            phoneNumber: _getMobile(quotation),
            id: '',
          };
          console.log('item--------', JSON.stringify(item));
          
          return item;
        });
    }
    console.log('quotation--_data---', JSON.stringify(_data));
    return _data;
  };

  const handleCreateNewQuotation = () => {
    setShowQuotationList(false);
    setCreateNewQuotation(true);
  };

  const handleShowQuotationList = () => {
    setShowQuotationList(true);
    setCreateNewQuotation(false);
  };

  const handleOnRefresh = useCallback(() => {
    getCurrentCompanyId().then(id => {
      const payload: IGetQuotationRequest = {
        // id: enquiryId,
        companyId:id as string
      };
      dispatch(getQuotationsRequest(payload));
    }).catch(err => console.log(err));
  }, []);

  const _hanldeCloseShowPreviewModal = () => {
    dispatch(resetGetQuotationHtmlRequest());
    setShowModal(false);
    setOpenPreview(false);
    setOpenShare(false);
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

  const _handleShowPreview = (docId: string) => {
    setOpenPreview(true);
    setOpenShare(false);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      docId: docId,
    };
    dispatch(getQuotationHtmlRequest(payload));
  };

  const handleShareClick = async (docId: string) => {
    setOpenPreview(false);
    setOpenShare(true);
    const payload: IHtmlTemplateRequest = {
      templateId: templateId,
      docId: docId,
    };
    dispatch(getQuotationHtmlRequest(payload));
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Quotations Found!</Text>
      </View>
    );
  };

  const showForm = () => {
    if (createNewQuotation) {
      //@ts-ignore
      return <AddQuotationView showHeader={false} fromEnquiry={true} enquiryId={enquiryId} />;
    }
    return null;
  };

  const showList = () => {
    if (showQuotationList) {
      return (
        <>
          <FlatList
            contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}
            data={transformQuotationData()}
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
                onPress={() => {
                  onItemClick(0);
                }}
                onShare={() => {
                  handleShareClick(item.id);
                }}
                onDownload={() => {}}
                onPreview={() => {
                  _handleShowPreview(item.id);
                }}
                onEdit={() => handleEditClick(item)}
              />
            )}
            ListEmptyComponent={showEmptyView()}
          />
          <ModalHOC
        visible={showModal}
        onClose={_hanldeCloseShowPreviewModal}
        modalStyle={styles.modalStyle}
        headerStyle={styles.headerStyle}
        title="Preview">
        <View style={{flex: 1}}>
          <TemplateViewer html={quotationTemplateHtml} />
        </View>
      </ModalHOC>
        </>
      );
    }
    return null;
  };

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

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleShowQuotationList} activeOpacity={0.4}>
          {showQuotationList ? (
            <ListViewIcon2 width={30} height={30} />
          ) : (
            <ListViewIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity
          onPress={handleCreateNewQuotation}
          activeOpacity={0.4}>
          {createNewQuotation ? (
            <CreateIcon2 width={30} height={30} />
          ) : (
            <CreateIcon width={30} height={30} />
          )}
        </TouchableOpacity>
        <Spacer width={10} />
      </View>
      {showForm()}
      {showList()}
    </>
  );
};

export default QuotationView;
