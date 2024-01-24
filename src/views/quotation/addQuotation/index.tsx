import React, { useEffect } from 'react';
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
import { getCurrentCompanyId } from '../../../utils/storage';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getSerialNoRequest, resetGetSerialNoRequest } from '../../../redux/slices/SerialNoSettingSlice';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../interface/setting/serialNo/serialNo';
import { getSingleQuotationRequest } from '../../../redux/slices/QuotationSlice';
import useInitialValueHook from '../../../hooks/useInitialValueHook';

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
  const dispatch = useAppDispatch();
  const {initialValue, prefix} = useInitialValueHook('658d3c6f585e3dde644da95b');

  const _getSerialNoRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetSerialNoRequest = {
        document: DOCUMENT_TYPE.QUOTATION,
        payload: {
          activeCount: initialValue,
          companyId: id as string,
          isAuto: true,
          isHeadOffice: true,
        }
      }
      dispatch(getSerialNoRequest(payload));
    }).catch(err => console.log('err--', err));
  }

  useEffect(() => {
    if(isEdit) {
      dispatch(getSingleQuotationRequest(item._id));
    } else {
      dispatch(resetGetSerialNoRequest());
      _getSerialNoRequest();
    }
  }, []);
  
  return (
    <QuotationFormContextProvider>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          {showHeader ? <Header label={headerText} canGoBack={true} /> : null}
          <Spacer height={4} />
          <AddQuotationForm
            fromEnquiry={fromEnquiry}
            enquiryId={enquiryId || item?.enquiryId}
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
