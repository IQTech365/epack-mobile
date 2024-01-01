import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import Spinner from '../../common/Spinner';
import {IGetEnquiriesData} from '../../interface/enquiry/IGetEnquiriesResponse';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getEnquiriesRequest} from '../../redux/slices/EnquirySlice';
import {EnquiryStackRoute} from '../../utils/constants';
import {formatDate, sortItemByDate} from '../../utils/formatter';
import EnquiryListItem, {
  IEnquiryItem,
} from './enquiryList/components/EnquiryListItem';
import styles from './style';
import useCompanyId from '../../hooks/useCompanyId';

interface IEnquiryPageViewProps {
  navigation: NavigationProp<any, any>;
}

const EnquiryPageView: React.FC<IEnquiryPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {enquiries, getEnquiriesRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  
  const {data} = enquiries || {};

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
          phoneNumber: enq.mobile,
          enquiryId: enq._id,
          enquiryDate: formatDate(enq.createdAt),
          status: enq.status,
        } as IEnquiryItem;
      })
      .sort((a: IEnquiryItem, b: IEnquiryItem) =>
        sortItemByDate(a.enquiryDate, b.enquiryDate),
      )
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

  const _getEnquiriesRequest = async () => {
    const companyId = await useCompanyId();
    dispatch(getEnquiriesRequest(companyId));
  }

  const handleOnRefresh = useCallback(() => {
    _getEnquiriesRequest();
  }, []);

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
      />
      <Spacer height={12} />
      {getEnquiriesRequesting ? (
        <Spinner show={getEnquiriesRequesting} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transformedData}
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
          ListEmptyComponent={() => <Text>No Enquiries available</Text>}
        />
      )}
    </View>
  );
};

export default EnquiryPageView;
