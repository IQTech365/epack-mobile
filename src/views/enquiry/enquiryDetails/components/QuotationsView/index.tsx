import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import AddQuotationView from '../../../../quotation/addQuotation';
import QuotationListItem, {
  IQuotationItem,
} from '../../../../quotation/quotationList/components/QuotationListItem';
import styles from './style';
import {
  getQuotationHtmlRequest,
  getQuotationsRequest,
  resetGetQuotationHtmlRequest,
} from '../../../../../redux/slices/QuotationSlice';
import {IGetQuotationRequest} from '../../../../../interface/quotation/IGetQuotationRequest';
import {
  IEnquiry,
  IGetQuotationData,
} from '../../../../../interface/quotation/IGetQuotationsResponse';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import ModalHOC from '../../../../../common/ModalHOC';
import TemplateViewer from '../../../../../common/TemplateViewer';
import useTemplateIdHook from '../../../../../hooks/useTemplateIdHook';
import {IHtmlTemplateRequest} from '../../../../../interface/order/templates/ITemplateResponse';
import {startShare} from '../../../../../utils/utility';
import Spinner from '../../../../../common/Spinner';
import ActionHeaderView from '../../../../../common/ActionHeaderView';
import AlertModal from '../../../../../common/AlertModal';
import LimitReachImage from '../../../../../images/icons/limit_reach.svg';
import useUtilityHook from '../../../../../hooks/useUtilityHook';

interface IQuotationViewProps {
  enquiryId: string;
  navigation: any;
  onItemClick: (tabIndex: number) => void;
  isOrder?: boolean;
  route?: any;
  item?: IEnquiry;
}

const QuotationView: React.FC<IQuotationViewProps> = ({
  enquiryId,
  navigation,
  onItemClick,
  isOrder = false,
  route,
  item,
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

  const dispatch = useAppDispatch();
  const [showQuotationList, setShowQuotationList] = useState<boolean>(false);
  const [createNewQuotation, setCreateNewQuotation] = useState<boolean>(true);
  const [showFormInEditMode, setShowFormInEditMode] = useState<boolean>(false);
  const [quotationToEdit, setQuotationToEdit] = useState<IGetQuotationData>();
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const [addNewQuotation, setAddNewQuotation] = useState<boolean>(false);
  const templateId = useTemplateIdHook('658d3c6f585e3dde644da95b');
  const {totalDocuments, hasSubscription, getTotalDocumentCount} =
    useUtilityHook();

  const _getClientName = (item: IGetQuotationData) => {
    let name: string = 'NA';
    const {enquiries} = item;
    if (enquiries && Array.isArray(enquiries) && enquiries.length > 0) {
      const enquiry: IEnquiry = enquiries[0];
      if (enquiry?.partyName) {
        name = enquiry?.partyName;
      } else if (enquiry.billingDetails?.companyName) {
        name = enquiry.billingDetails?.companyName;
      } else if (enquiry.billingDetails?.authorityPersonName) {
        name = enquiry.billingDetails?.authorityPersonName;
      } else if (enquiry.billingDetails?.employeeName) {
        name = enquiry.billingDetails?.employeeName;
      }
    }
    return name;
  };

  const _getFromDestination = (item: IGetQuotationData) => {
    let destination: string = 'NA';
    const {enquiries} = item;
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
    const {enquiries} = item;
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
    const {enquiries} = item;
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
    const {enquiries} = item;
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
      _data = quotationData
        .filter((e: IGetQuotationData) => e.enquiryId == enquiryId)
        .map((quotation: IGetQuotationData) => {
          const {quotationNumber, quotationDate, quotationAmount} = quotation;
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
            createdOn: quotation.createdAt,
          };
          return item;
        });
    }
    return _data;
  };

  const handleCreateNewQuotation = () => {
    if (totalDocuments < 10 || hasSubscription) {
      setShowQuotationList(false);
      setShowFormInEditMode(true);
      setShowLimitModal(false);
      setAddNewQuotation(true);
      // setCreateNewQuotation(true);
    } else if (totalDocuments >= 10 && !hasSubscription) {
      setShowLimitModal(true);
    }
  };

  const handleShowQuotationList = () => {
    setCreateNewQuotation(false);
    setShowFormInEditMode(false);
    setShowLimitModal(false);
    setAddNewQuotation(false);
    setShowQuotationList(true);
  };

  const handleOnRefresh = useCallback(() => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetQuotationRequest = {
          companyId: id as string,
        };
        dispatch(getQuotationsRequest(payload));
      })
      .catch(err => console.log(err));
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
    setQuotationToEdit(item);
    setShowQuotationList(false);
    setAddNewQuotation(false);
    setShowFormInEditMode(true);
  };

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

  const hanldeAlertModalClose = () => {
    setShowLimitModal(false);
  };

  const handlePlanUpgrade = () => {
    setShowLimitModal(false);
    navigation.navigate('Subscription');
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text}>No Quotations Found!</Text>
      </View>
    );
  };

  /**
   * This Callback will be fired from Enquiry section if either new quotation created or updated
   */
  const _handleOnSuccess = () => {
    setShowQuotationList(true);
    setCreateNewQuotation(false);
    setShowFormInEditMode(false);
    setShowLimitModal(false);
  };

  // const showForm = () => {
  //   if (createNewQuotation) {
  //     //@ts-ignore
  //     return (
  //       <AddQuotationView
  //         showHeader={false}
  //         fromEnquiry={true}
  //         enquiryId={enquiryId}
  //         enquiryData={item}
  //         navigation={navigation}
  //         route={route}
  //       />
  //     );
  //   }
  //   return null;
  // };

  const showEditForm = () => {
    if (showFormInEditMode) {
      //@ts-ignore
      return (
        <AddQuotationView
          showHeader={false}
          fromEnquiry={true}
          enquiryId={enquiryId}
          itemFromEnquiry={quotationToEdit}
          onSuccess={_handleOnSuccess}
          navigation={navigation}
          enquiryData={item}
          route={route}
          isNewQuotation={addNewQuotation}
        />
      );
    }
    return null;
  };

  const showList = () => {
    if (showQuotationList) {
      return (
        <FlatList
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
              isOrder={isOrder}
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
      );
    }
    return null;
  };

  const _getQuotationsRequest = () => {
    const enquiryQuotationFilters = ['COMPLETED', 'APPROVED'];
    const orderQuotationFilters = ['COMPLETED'];

    getCurrentCompanyId()
      .then(id => {
        const payload: IGetQuotationRequest = {
          companyId: id as string,
          notstatus: isOrder ? orderQuotationFilters : enquiryQuotationFilters,
        };
        dispatch(getQuotationsRequest(payload));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (isOrder) {
      setShowQuotationList(true);
    }
    getTotalDocumentCount();
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

  return (
    <View style={{alignItems: 'center'}}>
      {!isOrder ? (
        <ActionHeaderView
          count={transformQuotationData().length}
          onShow={handleShowQuotationList}
          onCreate={handleCreateNewQuotation}
        />
      ) : null}
      {/* {!isOrder ? showForm() : null} */}
      {showList()}
      {!isOrder ? showEditForm() : null}
      <Spinner show={getQuotationTemplateHtmlRequesting} />
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
      <AlertModal
        visible={showLimitModal}
        icon={<LimitReachImage width={200} height={200} />}
        onClose={hanldeAlertModalClose}
        onUpgrade={handlePlanUpgrade}
        title="Your document create limit has been reached. Please upgrade your plan."
        buttonText="UPGRADE"
      />
    </View>
  );
};

export default QuotationView;
