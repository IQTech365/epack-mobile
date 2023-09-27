import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import Spinner from '../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getEnquiriesRequest} from '../../redux/slices/EnquirySlice';
import { COLOR_WHITE } from '../../utils/colors';
import {EnquiryStackRoute, QuotationStackRoute} from '../../utils/constants';
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
  const tempItem: IEnquiryItem = {
    clientName: 'Ms. Vanshika',
    pickupAddress: 'Delhi, Munirka',
    deliveryAddress: 'Gurgaon, Sector 48',
    shiftingType: 'Domestic',
    shiftingLuggage: 'Home, car',
    phoneNumber: '9898989898',
    enquiryId: '',
  };
  console.log('Enquiries--', JSON.stringify(enquiries));
  const {data} = enquiries || {};

  let transformedData: IEnquiryItem[] = [tempItem];
  if (data) {
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

  

  const handleAddNew = () => {
    navigation.navigate(EnquiryStackRoute.AddEnquiry);
  };

  const handleEnquiryDetailsClick = (id: string) => {
    navigation.navigate(EnquiryStackRoute.EnquiryDetails, {enquiryId: id});
  };

  useEffect(() => {
    dispatch(getEnquiriesRequest('6511695bad8a273529a2a59a'));
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
          renderItem={({item, index}) => (
            <View style={{padding: 10}}>
              <EnquiryListItem
              item={item}
              index={index}
              onPress={() => handleEnquiryDetailsClick(item.enquiryId)}
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
