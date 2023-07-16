import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {EnquiryStackRoute, QuotationStackRoute} from '../../utils/constants';
import EnquiryListItem, {
  IEnquiryItem,
} from './enquiryList/components/EnquiryListItem';
import styles from './style';

interface IEnquiryPageViewProps {
  navigation: NavigationProp<any, any>;
}

const EnquiryPageView: React.FC<IEnquiryPageViewProps> = ({navigation}) => {
  const tempItem: IEnquiryItem = {
    clientName: 'Ms. Vanshika',
    pickupAddress: 'Delhi, Munirka',
    deliveryAddress: 'Gurgaon, Sector 48',
    shiftingType: 'Domestic',
    shiftingLuggage: 'Home, car',
    phoneNumber: '9898989898',
  };

  const handleAddNew = () => {
    navigation.navigate(EnquiryStackRoute.AddEnquiry);
  };

  const handleEnquiryDetailsClick = () => {
    navigation.navigate(EnquiryStackRoute.EnquiryDetails);
  }

  return (
    <View style={styles.container}>
      <Header label="Enquiry Management"/>
      <Spacer height={4} />
      <AddNew
        countLabel="Total Enquiries"
        count="200"
        onPress={handleAddNew}
      />
      <Spacer height={12} />
      <EnquiryListItem item={tempItem} index={1} onPress={handleEnquiryDetailsClick} />
    </View>
  );
};

export default EnquiryPageView;
