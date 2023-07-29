import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import AddNew from '../../common/AddNew';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { QuotationStackRoute } from '../../utils/constants';
import AddQuotationView from './addQuotation';
import QuotationListItem, {
  IQuotationItem,
} from './quotationList/components/QuotationListItem';
import styles from './style';

interface IQuotationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const QuotationPageView: React.FC<IQuotationPageViewProps> = ({navigation}) => {
  const tempItem: IQuotationItem = {
    quotationNo: '#9877654',
    clientName: 'Ms. Vanshika',
    fromDestination: 'Delhi',
    toDestination: 'Gurgaon',
    shiftingType: 'Home',
    quotationAmount: '12000.00',
    quotationDate: '14-07-2023',
    phoneNumber: '9898989898',
  };

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  }

  return (
    <View style={styles.container}>
      <Header label="Quotation Management" canGoBack={true} showDrawerIcon={true} />
      <Spacer height={4} />
      <AddNew countLabel='Total Quotations' count='200' onPress={handleAddNew} />
      <Spacer height={12} />
      <QuotationListItem item={tempItem} index={1} onPress={() => {}} />
      {/* <AddQuotationView /> */}
    </View>
  );
};

export default QuotationPageView;
