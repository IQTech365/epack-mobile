import React from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';

import Header from '../../../common/Header';
import {NavigationProp} from '@react-navigation/native';

import {OrderFormContextProvider} from '../../../provider/OrderFormContextProvider';
import AddOrderFormView from './components/AddOrderFormView';

interface IAddOrderViewProps {
  navigation: NavigationProp<any, any>;
}

const AddOrderView: React.FC<IAddOrderViewProps> = ({navigation}) => {
  return (
    <OrderFormContextProvider>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <Header label="ADD ORDER" canGoBack={true} />
          <Spacer height={4} />
          <AddOrderFormView navigation={navigation} />
          <Spacer height={4} />
        </View>
      </AvoidSoftInputViewHOC>
    </OrderFormContextProvider>
  );
};

export default AddOrderView;
