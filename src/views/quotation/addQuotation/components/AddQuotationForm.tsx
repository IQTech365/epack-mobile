import React from 'react';
import {View, Text} from 'react-native';
import BasicDetails from './BasicDetails';
import {useQuotationFormContextHook} from '../../../../provider/QuotationFormContextProvider';
import PickupAddressView from './PickupAddressView';
import Spacer from '../../../../common/Spacer';
import DropAddressView from './DropAddressView';
import FreightDetailsView from './FreightDetailsView';

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
      <Spacer height={4} />
      <PickupAddressView />
      <Spacer height={4} />
      <DropAddressView />
      <Spacer height={4} />
      <FreightDetailsView />
    </>
  );
};

export default AddQuotationForm;
