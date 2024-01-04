import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import Header from '../../../common/Header';
import {NavigationProp} from '@react-navigation/native';
import AddEnquiryFormView from './components/AddEnquiryFormView';
import {EnquiryFormContextProvider} from '../../../provider/EnquiryFormContextProvider';

interface IAddEnquiryViewProps {
  navigation: NavigationProp<any, any>;
}

const AddEnquiryView: React.FC<IAddEnquiryViewProps> = ({navigation}) => {
  return (
    <EnquiryFormContextProvider>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <Header label="ADD ENQUIRY " canGoBack={true} />
          <Spacer height={4} />
          <AddEnquiryFormView navigation={navigation} />
        </View>
      </AvoidSoftInputViewHOC>
    </EnquiryFormContextProvider>
  );
};

export default AddEnquiryView;
