import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {ClientStackRoute} from '../../utils/constants';
import ClientListItem, {
  IClientItem,
} from './clientDetails/components/ClientListItem';
import styles from './style';

interface IClientPageViewProps {
  navigation: NavigationProp<any, any>;
}

const ClientPageView: React.FC<IClientPageViewProps> = ({navigation}) => {
  const tempItem: IClientItem = {
    clientName: 'Ms. Vanshika',
    pickupAddress: 'Delhi, Munirka',
    deliveryAddress: 'Gurgaon, Sector 48',
    shiftingType: 'Domestic',
    shiftingLuggage: 'Home, car',
    phoneNumber: '0124-987654',
    clientId: '65678',
    registrationDate: '27-07-2023',
    mobile: '9876545678',
    email: 'gayatri@gmail.com',
    companyName: 'Gatyatari Packers & Movers'
  };

  const handleEnquiryDetailsClick = () => {
    navigation.navigate(ClientStackRoute.ClientDetails);
  };

  return (
    <View style={styles.container}>
      <Header label="Clients" canGoBack={true} showDrawerIcon={true} />
      <Spacer height={4} />
      {/* <AddNew countLabel="Total Orders" count="1200" onPress={handleAddNew} /> */}
      <Spacer height={12} />
      <ClientListItem
        item={tempItem}
        index={1}
        onPress={handleEnquiryDetailsClick}
      />
    </View>
  );
};

export default ClientPageView;
