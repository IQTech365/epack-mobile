import React, { useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit.svg';
import Header from '../../../../common/Header';
import ModalHOC from '../../../../common/ModalHOC';
import Toast from 'react-native-toast-message';
import UpdateComanyAddressForm from './Form/UpdateComanyAddressForm';
interface IAddressViewProps {
  showEditIcon?: boolean;
}

const AddressView: React.FC<IAddressViewProps> = ({showEditIcon = true}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
      <Header label="Address Details" canGoBack={true} />
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Address</Text>
          <TouchableOpacity onPress={handleModalOpen} activeOpacity={0.6}>
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <Spacer height={8} />
        <View style={styles.elementContainer}>
          <EnquiryDetailListItem label='Street' value='NA' />
          <EnquiryDetailListItem label='Landmark' value='NA' />
          <EnquiryDetailListItem label='State' value='NA' />
          <EnquiryDetailListItem label='City' value='NA' />
          <EnquiryDetailListItem label='District' value='NA' />
          <EnquiryDetailListItem label='Pincode' value='NA' />
          <EnquiryDetailListItem label='Country' value='India' />
          <EnquiryDetailListItem label='Post Office' value='NA' />
        </View>
        <Spacer height={8} />
        <ModalHOC
          visible={openModal}
          onClose={handleModalClose}
          title="Update Company Address">
          <>
            <UpdateComanyAddressForm />
            <Toast />
          </>
        </ModalHOC>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddressView;
