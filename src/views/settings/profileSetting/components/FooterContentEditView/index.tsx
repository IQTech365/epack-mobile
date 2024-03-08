import React from 'react';
import {View} from 'react-native';
import Header from '../../../../../common/Header';
import Spacer from '../../../../../common/Spacer';
import {COLOR_WHITE} from '../../../../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import FooterContentUpdateView from '../FooterContentFormView';
import { IGetFooterContentData } from '../../../../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';

const FooterContentEditView = (props: any) => {
  const navigation = useNavigation();
  const footerInfo: IGetFooterContentData = props?.route?.params?.footerInfo;
  console.log('FooterContentEditView--id--', JSON.stringify(footerInfo));
  return (
    <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
      <Header label="Footer Content-Edit" canGoBack={true} />
      <Spacer height={10} />
      <FooterContentUpdateView
        isEdit={true}
        footerInfo={footerInfo}
        onSuccess={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default FooterContentEditView;
