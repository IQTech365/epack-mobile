import React from 'react';
import {View, Text} from 'react-native';
import BasicDetails from './BasicDetails';
import {useQuotationFormContextHook} from '../../../../provider/QuotationFormContextProvider';

interface Props {
  fromEnquiry?: boolean;
  enquiryId?: string;
}

const AddQuotationForm: React.FC<Props> = ({fromEnquiry, enquiryId}) => {
  const {state} = useQuotationFormContextHook();
  console.log('AddQuotationForm--state--', JSON.stringify(state, null, ' '));

  return (
    <>
      <BasicDetails />
    </>
  );
};

export default AddQuotationForm;
