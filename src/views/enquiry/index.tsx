import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import Spinner from '../../common/Spinner';
import {IGetEnquiriesData} from '../../interface/enquiry/IGetEnquiriesResponse';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getEnquiriesRequest} from '../../redux/slices/EnquirySlice';
import {EnquiryStackRoute} from '../../utils/constants';
import {formatDate5} from '../../utils/formatter';
import EnquiryListItem, {
  IEnquiryItem,
} from './enquiryList/components/EnquiryListItem';
import styles from './style';
import { getCurrentCompanyId } from '../../utils/storage';
import SendIcon from '../../images/icons/send_icon.svg'


interface IEnquiryPageViewProps {
  navigation: NavigationProp<any, any>;
}

const EnquiryPageView: React.FC<IEnquiryPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {enquiries, getEnquiriesRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  
  const {data} = enquiries || {};
  
  const getPhoneNumber = (item:any) => {
    let phoneNumber = '';
    if (item.billingBy == 'by Individual') {
      phoneNumber = item.mobile;
    } else if (item.billingBy == 'by Company') {
      const billingInfo = item.billingDetails;
      if(billingInfo && Object.keys(billingInfo).length > 0) {
        if(billingInfo?.authorityPersonMobile) {
          phoneNumber = billingInfo?.authorityPersonMobile;
        } else if(billingInfo?.employeeMobile) {
          phoneNumber = billingInfo?.employeeMobile;
        }
      }
    }
    return phoneNumber;
  };

  let transformedData: IEnquiryItem[] = [];
  if (data) {
    //@ts-ignore
    transformedData = data
      .map((enq: any) => {
        return {
          clientName: enq.partyName || enq?.billingDetails?.companyName,
          pickupAddress: `${enq.pickupAddress.address}, ${enq.pickupAddress.city}, ${enq.pickupAddress.state}, ${enq.pickupAddress.pincode}`,
          deliveryAddress: `${enq.dropAddress.address}, ${enq.dropAddress.city}, ${enq.dropAddress.state}, ${enq.dropAddress.pincode}`,
          shiftingType: enq.shiftingType,
          shiftingLuggage: enq.shiftingLuggage.join(','),
          phoneNumber: getPhoneNumber(enq),
          enquiryId: enq._id,
          enquiryDate: formatDate5(enq.createdAt),
          status: enq.status,
        } as IEnquiryItem;
      })
      .filter(
        (e: IEnquiryItem) =>
          e.status.toLowerCase() == 'new' ||
          e.status.toLowerCase() == 'in followup' ||
          e.status.toLowerCase() == 'survey done' ||
          e.status.toLowerCase() == 'pending' ||
          e.status.toLowerCase() == 'cancelled',
      );
  }

  const getEnquiryDataById = (enquiryId: string) => {
    let enquiry: IGetEnquiriesData | null = null;
    if (data && Array.isArray(data) && data.length > 0) {
      enquiry = data.find(e => e._id == enquiryId);
    }
    return enquiry;
  };

  const handleAddNew = () => {
    navigation.navigate(EnquiryStackRoute.AddEnquiry);
  };

  const handleEnquiryDetailsClick = (
    id: string,
    item: IGetEnquiriesData | null,
  ) => {
    navigation.navigate(EnquiryStackRoute.EnquiryDetails, {
      enquiryId: id,
      item: item,
    });
  };

  const _getEnquiriesRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getEnquiriesRequest(id as string));
    }).catch(err => console.log(err));
  }

  const handleOnRefresh = useCallback(() => {
    _getEnquiriesRequest();
  }, []);

  const handleEnquiryDetailNavigation = () => {
    navigation.navigate('AddEnquiry');
  };

  useEffect(() => {
    _getEnquiriesRequest();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        label="Enquiry Management"
        canGoBack={true}
        showDrawerIcon={true}
      />
      <Spacer height={4} />
      <AddNew
        countLabel="Total Enquiries"
        count={transformedData.length.toString()}
        onPress={handleAddNew}
        text={'ENQUIRY'}
      />
      <Spacer height={12} />
      {getEnquiriesRequesting ? (
        <Spinner show={getEnquiriesRequesting} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[...transformedData].reverse()}
          refreshControl={
            <RefreshControl
              refreshing={getEnquiriesRequesting}
              onRefresh={handleOnRefresh}
            />
          }
          renderItem={({item, index}) => (
            <View style={{padding: 10}}>
              <EnquiryListItem
                item={item}
                index={index}
                onPress={() =>
                  handleEnquiryDetailsClick(
                    item.enquiryId,
                    getEnquiryDataById(item.enquiryId),
                  )
                }
              />
            </View>
          )}
          ListEmptyComponent={() => 
            <View style={styles.mainContainer}>
            <Text style={styles.title}>Do the Following Task:</Text>
            <TouchableOpacity onPress={handleEnquiryDetailNavigation}>
              <Spacer height={10}/>
            <View style={styles.itemContainer}>
              <SendIcon width={20} height={24}  />
              <Text style={styles.item}>Customer Details</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnquiryDetailNavigation}>
            <View style={styles.itemContainer}>
              <SendIcon width={20} height={24}  />
              <Text style={styles.item}>Quotation Create/Share</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnquiryDetailNavigation}>
            <View style={styles.itemContainer}>
              <SendIcon width={20} height={24}  />
              <Text style={styles.item}>Set Followup Date and Time</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnquiryDetailNavigation}>
            <View style={styles.itemContainer}>
              <SendIcon width={20} height={24} />
              <Text style={styles.item}>Set Survey Date and Time</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnquiryDetailNavigation}>
            <View style={styles.itemContainer}>
              <SendIcon width={20} height={24} />
              <Text style={styles.item}>Survey List Create/Share</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEnquiryDetailNavigation}>
            <View style={styles.itemContainer}>
              <SendIcon width={20} height={24} />
              <Text style={styles.item}>Create Packing Materials List</Text>
            </View>
            </TouchableOpacity>

          </View>
           
          }
        />
      )}
    </View>
  );
};

export default EnquiryPageView;
