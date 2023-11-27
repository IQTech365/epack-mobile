import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { ICompanyInfoData } from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import Spinner from '../../../../common/Spinner';
import { getCompaniesRequest } from '../../../../redux/slices/CompanySlice';
interface IAddressViewProps {
  showEditIcon?: boolean;
}

const AddressView: React.FC<IAddressViewProps> = ({showEditIcon = true}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {companies, getCompaniesRequesting} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};
  const dispatch = useAppDispatch();

  const getFirstCompany = () => {
    let company:ICompanyInfoData | null  = null;
    if(companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
      company = companiesData[0];
    }
    return company;
  }

  const firstCompany = getFirstCompany();

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(getCompaniesRequest(firstCompany?.authId as string));
  };
  useEffect(() => {
    dispatch(getCompaniesRequest(firstCompany?.authId as string));
  }, [dispatch]);

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
          <EnquiryDetailListItem label='Pincode' value={firstCompany?.pincode} />
          <EnquiryDetailListItem label='State' value={firstCompany?.state} />
          <EnquiryDetailListItem label='City' value={firstCompany?.city} />
          <EnquiryDetailListItem label='Locality' value={firstCompany?.companyAddress || "Not Available"} />
          <EnquiryDetailListItem label='Landmark' value={firstCompany?.companyAddress || "Not Available"} />
          <EnquiryDetailListItem label='Address' value={firstCompany?.companyAddress} />
          <EnquiryDetailListItem label='Country' value='India' />
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
        <Spinner show={getCompaniesRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddressView;
