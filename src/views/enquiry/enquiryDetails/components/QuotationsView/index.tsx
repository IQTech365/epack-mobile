import React, {useCallback, useState} from 'react';
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
import {getQuotationsRequest} from '../../../../../redux/slices/QuotationSlice';
import {NavigationProp} from '@react-navigation/native';
import { IGetQuotationRequest } from '../../../../../interface/quotation/IGetQuotationRequest';
import { IEnquiry, IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
import useCompanyId from '../../../../../hooks/useCompanyId';

interface IQuotationViewProps  {
  enquiryId: string;
navigation: any;
  onItemClick: (tabIndex: number) => void;
}

const QuotationView: React.FC<IQuotationViewProps> = ({
  enquiryId,
navigation,
  onItemClick,
}) => {
  const {quotations, getQuotationsRequesting} = useAppSelector(
    state => state.Quotation,
  );
  const {data: quotationData} = quotations || {};
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();

  const [showQuotationList, setShowQuotationList] = useState<boolean>(false);
  const [createNewQuotation, setCreateNewQuotation] = useState<boolean>(true);
  const [editItem, setEditItem] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);

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
          };
          return item;
        });
      return _data;
    }
    return _data;
  };

  const handleCreateNewQuotation = () => {
    setShowQuotationList(false);
    setCreateNewQuotation(true);
    setIsEdit(false);
    setEditItem(null)
  };

  const handleShowQuotationList = () => {
    setShowQuotationList(true);
    setCreateNewQuotation(false);
  };

  const handleOnRefresh = useCallback(() => {
    const payload: IGetQuotationRequest = {
      // id: enquiryId,
      companyId:companyId
    };
    dispatch(getQuotationsRequest(payload));
  }, []);

  const handleEditClick = (quotation: IQuotationItem) => {
    const item: IGetQuotationData = quotationData?.find((e:IGetQuotationData) => e.quotationNumber == quotation.quotationNo);
    setEditItem(item);
    setIsEdit(true);
    setShowQuotationList(false);
    setCreateNewQuotation(true);
  };

  const showEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Quotations Found!</Text>
      </View>
    );
  };

  const showForm = (item:any, isEdit:boolean) => {
    if (createNewQuotation) {
      //@ts-ignore
      return <AddQuotationView showHeader={false} fromEnquiry={true} enquiryId={enquiryId} itemtab={item} isEdittab ={isEdit}/>;
    }
    return null;
  };

  const showList = () => {
    if (showQuotationList) {
      return (
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
              index={1}
              onPress={() => {onItemClick(0)}}
              onDownload={() => {}}
              onEdit={() => handleEditClick(item)}
              onPreview={() => {}}
              onShare={() => {}}
            />
          )}
          ListEmptyComponent={showEmptyView()}
        />
      );
    }
    return null;
  };

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
      {showForm(editItem, isEdit)}
      {showList()}
    </>
  );
};

export default QuotationView;
