import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import Spinner from '../../common/Spinner';
import { IGetEnquiriesData } from '../../interface/enquiry/IGetEnquiriesResponse';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getEnquiriesRequest} from '../../redux/slices/EnquirySlice';
import {EnquiryStackRoute} from '../../utils/constants';
import EnquiryListItem, {
  IEnquiryItem,
} from './enquiryList/components/EnquiryListItem';
import styles from './style';

interface IEnquiryPageViewProps {
  navigation: NavigationProp<any, any>;
}

const EnquiryPageView: React.FC<IEnquiryPageViewProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {enquiries, getEnquiriesRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  const {otpData} = useAppSelector(state => state.OTP);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);

  const getCompanyId = () => {
    let id;
    const {data} = addCompanyInfo || {};
    const {data: companiesData} = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    }
    return id;
  };

  const tempItem: IEnquiryItem = {
    clientName: 'Ms. Vanshika',
    pickupAddress: 'Delhi, Munirka',
    deliveryAddress: 'Gurgaon, Sector 48',
    shiftingType: 'Domestic',
    shiftingLuggage: 'Home, car',
    phoneNumber: '9898989898',
    enquiryId: '',
  };
  const {data} = enquiries || {};

  let transformedData: IEnquiryItem[] = [tempItem];
  if (data) {
    //@ts-ignore
    transformedData = data.map(enq => {
      return {
        clientName: enq.partyName,
        pickupAddress: `${enq.pickupAddress.address}, ${enq.pickupAddress.city}, ${enq.pickupAddress.state}, ${enq.pickupAddress.pincode}`,
        deliveryAddress: `${enq.dropAddress.address}, ${enq.dropAddress.city}, ${enq.dropAddress.state}, ${enq.dropAddress.pincode}`,
        shiftingType: enq.shiftingType,
        shiftingLuggage: enq.shiftingLuggage.join(','),
        phoneNumber: enq.mobile,
        enquiryId: enq._id,
      } as IEnquiryItem;
    });
  }

  const getEnquiryDataByIndex = (index: number) => {
    if(data) return data[index];
    return [];
  }

  const handleAddNew = () => {
    navigation.navigate(EnquiryStackRoute.AddEnquiry);
  };

  const handleEnquiryDetailsClick = (id: string, item: IGetEnquiriesData) => {
    navigation.navigate(EnquiryStackRoute.EnquiryDetails, {enquiryId: id, item: item});
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(getEnquiriesRequest(getCompanyId()));
  }, []);

  useEffect(() => {
    dispatch(getEnquiriesRequest(getCompanyId()));
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
        count={data ? data.length.toString() : '0'}
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
                onPress={() => handleEnquiryDetailsClick(item.enquiryId, getEnquiryDataByIndex(index))}
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
