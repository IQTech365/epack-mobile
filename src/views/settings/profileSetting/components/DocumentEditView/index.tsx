import React from 'react';
import {View} from 'react-native';
import Header from '../../../../../common/Header';
import Spacer from '../../../../../common/Spacer';
import {COLOR_WHITE} from '../../../../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import { IGetDocumentData } from '../../../../../interface/setting/packerProfile/document/IGetDocumentsResponse';
import DocumentFormView from '../DocumentFormView';

const DocumentEditView = (props: any) => {
  const navigation = useNavigation();
  const documentInfo: IGetDocumentData = props?.route?.params?.documentInfo;
  console.log('DocumentEditView--id--', JSON.stringify(documentInfo));
  return (
    <View style={{flex: 1, backgroundColor: COLOR_WHITE}}>
      <Header label="Document-Edit" canGoBack={true} />
      <Spacer height={10} />
      <DocumentFormView
        isEdit={true}
        documentInfo={documentInfo}
        onSuccess={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default DocumentEditView;
