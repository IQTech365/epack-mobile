import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuotationStackParamList} from '../../../navigation/params/QuotationStackParamList';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Header from '../../../common/Header';
import Spacer from '../../../common/Spacer';
import {QuotationFormContextProvider} from '../../../provider/QuotationFormContextProvider';
import AddQuotationForm from './components/AddQuotationForm';
import { IGetQuotationData } from '../../../interface/quotation/IGetQuotationsResponse';

interface Props
  extends NativeStackScreenProps<QuotationStackParamList, 'AddQuotation'> {
  showHeader?: boolean;
  fromEnquiry?: boolean;
  enquiryId?: string;
}

const AddQuotationView: React.FC<Props> = ({
  showHeader = true,
  fromEnquiry = false,
  enquiryId,
  navigation,
  route,
}) => {
  const isEdit: boolean | undefined = route?.params?.isEdit;
  const item:IGetQuotationData = route?.params?.item as IGetQuotationData;
  const headerText = isEdit ? 'UPDATE QUOTATION' : 'CREATE QUOTATION';
  return (
    <QuotationFormContextProvider>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          {showHeader ? <Header label={headerText} canGoBack={true} /> : null}
          <Spacer height={4} />
          <AddQuotationForm
            fromEnquiry={fromEnquiry}
            enquiryId={enquiryId}
            navigation={navigation}
            isEdit={isEdit}
            item={item}
          />
        </View>
      </AvoidSoftInputViewHOC>
    </QuotationFormContextProvider>
  );
};

export default AddQuotationView;
