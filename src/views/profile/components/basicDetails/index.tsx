import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit.svg';
import Header from '../../../../common/Header';
import {useAppSelector} from '../../../../redux/hooks';
import ModalHOC from '../../../../common/ModalHOC';
import UpdateBasicDetailsForm from './Form/UpdateBasicDetailsForm';
import Toast from 'react-native-toast-message';

interface IBasicDetailsViewProps {}

const BasicDetailsView: React.FC<IBasicDetailsViewProps> = ({}) => {
  const {companies} = useAppSelector(state => state.Company);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {data: companiesData} = companies || {};
  console.log('companiesData----', JSON.stringify(companiesData));

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="Basic Details" canGoBack={true} />
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Basic Details</Text>
          <TouchableOpacity onPress={handleModalOpen} activeOpacity={0.6}>
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <Spacer height={8} />
        <View style={styles.elementContainer}>
          <EnquiryDetailListItem label="Company Name" value="NA" />
          <EnquiryDetailListItem label="Company Punch Line" value="NA" />
          <EnquiryDetailListItem label="Manager Name" value="NA" />
          <EnquiryDetailListItem label="Website" value="NA" />
          <EnquiryDetailListItem label="Email" value="NA" />
          <EnquiryDetailListItem label="Registered Mobile Number" value="NA" />
          <EnquiryDetailListItem label="Landline Number" value="NA" />
          <EnquiryDetailListItem label="Toll Free Number" value="NA" />
          <EnquiryDetailListItem label="Alternate Number" value="NA" />
          <EnquiryDetailListItem label="Company Profile" value="NA" />
        </View>
        <Spacer height={8} />
        <ModalHOC
          visible={openModal}
          onClose={handleModalClose}
          title="Update Company Basic Details">
          <>
            <UpdateBasicDetailsForm />
            <Toast />
          </>
        </ModalHOC>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default BasicDetailsView;
