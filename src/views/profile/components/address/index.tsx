import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit_icon.svg';
import Header from '../../../../common/Header';
import ModalHOC from '../../../../common/ModalHOC';
import Toast from 'react-native-toast-message';
import UpdateComanyAddressForm from './Form/UpdateComanyAddressForm';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { ICompanyInfoData } from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import Spinner from '../../../../common/Spinner';
import { getCompaniesRequest } from '../../../../redux/slices/CompanySlice';
import { getCurrentCompanyId } from '../../../../utils/storage';
interface IAddressViewProps {
  showEditIcon?: boolean;
}

const AddressView: React.FC<IAddressViewProps> = ({showEditIcon = true}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [company, setCompany] = useState<ICompanyInfoData>();
  const {companies, getCompaniesRequesting} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};
  const dispatch = useAppDispatch();

  const _getCompany = () => {
    getCurrentCompanyId().then(id => {
      if(companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
        const company = companiesData.find((d:ICompanyInfoData) => d._id == id as string);
        setCompany(company);
      }
    }).catch(err => console.log(err));
  }

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const _getCompanesRequest = () => {
    getCurrentCompanyId().then(id => {
    if(companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
      const company:ICompanyInfoData = companiesData.find((d:ICompanyInfoData) => d._id == id as string);
      dispatch(getCompaniesRequest(company?.authId as string));
    }
    }).catch(err => console.log(err));
  }

  const handleModalClose = () => {
    setOpenModal(false);
    _getCompanesRequest();
  };
  useEffect(() => {
    _getCompany();
    _getCompanesRequest();
  }, []);

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
          <EnquiryDetailListItem label='Pincode' value={company?.pincode} />
          <EnquiryDetailListItem label='State' value={company?.state} />
          <EnquiryDetailListItem label='City' value={company?.city} />
          <EnquiryDetailListItem label='Locality' value={company?.companyAddress} />
          <EnquiryDetailListItem label='Landmark' value={company?.companyAddress} />
          <EnquiryDetailListItem label='Address' value={company?.companyAddress} />
          <EnquiryDetailListItem label='Country' value='India' />
        </View>
        <Spacer height={8} />
        <ModalHOC
          visible={openModal}
          onClose={handleModalClose}
          title="UPDATE COMPANY ADDRESS">
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
