import React from 'react';
import {View, Text} from 'react-native';
import BasicDetails from './BasicDetails';
import {useQuotationFormContextHook} from '../../../../provider/QuotationFormContextProvider';
import PickupAddressView from './PickupAddressView';
import Spacer from '../../../../common/Spacer';
import DropAddressView from './DropAddressView';
import FreightDetailsView from './FreightDetailsView';
import InsuranceDetailsView from './InsuranceDetailsView';
import StorageChargesView from './StorageChargesView';
import OtherDetailsView from './OtherDetailsView';
import Button from '../../../../common/Button';
import styles from '../style';

interface Props {
  fromEnquiry?: boolean;
  enquiryId?: string;
}

const AddQuotationForm: React.FC<Props> = ({fromEnquiry, enquiryId}) => {
  const {state} = useQuotationFormContextHook();
  console.log('AddQuotationForm--state--', JSON.stringify(state, null, ' '));

  const hanldeSubmit = () => {};

  return (
    <>
      <BasicDetails />
      <Spacer height={4} />
      <PickupAddressView />
      <Spacer height={4} />
      <DropAddressView />
      <Spacer height={4} />
      <FreightDetailsView />
      <Spacer height={4} />
      <InsuranceDetailsView />
      <Spacer height={4} />
      <StorageChargesView />
      <Spacer height={4} />
      <OtherDetailsView />
      <Spacer height={12} />
      <Button
        text="PREVIEW"
        onPress={hanldeSubmit}
        disabled={false}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={12} />
    </>
  );
};

export default AddQuotationForm;
