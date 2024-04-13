import React from 'react';
import {View} from 'react-native';
import Header from '../../../../../common/Header';
import Spacer from '../../../../../common/Spacer';
import {COLOR_WHITE} from '../../../../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import ContactDetailUpdateView from '../ContactFormView';
import { IContactListItem } from '../ContactView/components/ContactDetailListItem';

const ContactEditView = (props: any) => {
  const navigation = useNavigation();
  const contactInfo: IContactListItem = props?.route?.params?.contactInfo;
  return (
    <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
      <Header label="Contact-Edit" canGoBack={true} />
      <Spacer height={10} />
      <ContactDetailUpdateView
        isEdit={true}
        contactInfo={contactInfo}
        onSuccess={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ContactEditView;
