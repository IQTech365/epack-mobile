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
import {ICompanyInfoData} from '../../../../interface/companyRegistration/IGetCompaniesResponse';

interface IBasicDetailsViewProps {}

const BasicDetailsView: React.FC<IBasicDetailsViewProps> = ({}) => {
  const {companies} = useAppSelector(state => state.Company);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {data: companiesData} = companies || {};
  console.log('companiesData----', JSON.stringify(companiesData));

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
          <EnquiryDetailListItem label="Company Name" value={firstCompany?.companyName} />
          <EnquiryDetailListItem label="Company Punch Line" value={firstCompany?.punchLine || 'Not Available'} />
          <EnquiryDetailListItem label="Contact Person" value={firstCompany?.contactPerson} />
          <EnquiryDetailListItem label="Website" value={firstCompany?.companyWebite || "Not Available"} />
          <EnquiryDetailListItem label="Email" value={firstCompany?.email} />
          <EnquiryDetailListItem label="Reg. Mobile Number" value={firstCompany?.companyMobile}  />
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
