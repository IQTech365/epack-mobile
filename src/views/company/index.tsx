import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { QuotationStackRoute } from '../../utils/constants';
import styles from './style';
import RegisterCompanyView from './registerCompany';

interface IRegistrationPageViewProps {
  navigation: NavigationProp<any, any>;
}

const RegistrationPageView: React.FC<IRegistrationPageViewProps> = ({navigation}) => {

  const handleAddNew = () => {
    navigation.navigate(QuotationStackRoute.AddQuotation);
  }

  return (
    <View style={styles.container}>
      <Header label="Company Registration" canGoBack={true} showDrawerIcon={false} />
      <Spacer height={4} />
      <RegisterCompanyView />
    </View>
  );
};

export default RegistrationPageView;
