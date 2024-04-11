import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit_icon.svg';
import Header from '../../../../common/Header';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import ModalHOC from '../../../../common/ModalHOC';
import UpdateBasicDetailsForm from './Form/UpdateBasicDetailsForm';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {ICompanyInfoData} from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import {getCompaniesRequest} from '../../../../redux/slices/CompanySlice';
import Spinner from '../../../../common/Spinner';
import {COLOR_BLACK, COLOR_GREEN} from '../../../../utils/colors';
import Label from '../../../../common/Label';
import {getCurrentCompanyId} from '../../../../utils/storage';
import useAuthId from '../../../../hooks/useAuthId';

interface IBasicDetailsViewProps {}

const BasicDetailsView: React.FC<IBasicDetailsViewProps> = ({}) => {
  const {companies, getCompaniesRequesting} = useAppSelector(
    state => state.Company,
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [company, setCompany] = useState<ICompanyInfoData>();
  const {data: companiesData} = companies || {};
  const authId = useAuthId();
  
  const dispatch = useAppDispatch();

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: COLOR_GREEN}}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: '300',
          color: COLOR_BLACK,
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: '300',
          color: COLOR_BLACK,
        }}
      />
    ),
  };

  const _getCompany = () => {
    getCurrentCompanyId()
      .then(id => {
        if (
          companiesData &&
          Array.isArray(companiesData) &&
          companiesData.length > 0
        ) {
          const _company = companiesData.find(
            (d: ICompanyInfoData) => d._id == id,
          );
          setCompany(_company);
        } else if (companiesData && companiesData.hasOwnProperty('authId')) {
          setCompany(companiesData);
        }
      })
      .catch(err => console.log('storage-err', err));
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(getCompaniesRequest(authId));
  };

  useEffect(() => {
    dispatch(getCompaniesRequest(authId));
  }, [dispatch]);

  useEffect(() => {
    if (companies) {
      _getCompany();
    }
  }, [companies]);

  return (
    <>
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
            <EnquiryDetailListItem
              label="Company Name"
              value={company?.companyName}
            />
            <EnquiryDetailListItem
              label="Punch Line"
              value={company?.punchLine || 'Not Available'}
            />
            <EnquiryDetailListItem
              label="Contact Person"
              value={company?.contactPerson}
            />
            <EnquiryDetailListItem
              label="Website"
              value={company?.companyWebsite || 'Not Available'}
            />
            <EnquiryDetailListItem label="Email" value={company?.email} />
            <EnquiryDetailListItem
              label="Reg. Mobile No."
              value={company?.companyMobile}
            />
          </View>
          <Spacer height={8} />
          <Label text="Company Logo" style={styles.labelText2} />
          <View style={styles.companyLogoContainer}>
            {company?.companyLogo ? (
              <Image
                source={{uri: company?.companyLogo}}
                style={{width: '100%', height: 100, resizeMode: 'contain'}}
              />
            ) : null}
          </View>
          <Spacer height={8} />
          <Label text="Admin Signature" style={styles.labelText2} />
          <View style={styles.companyLogoContainer}>
            {company?.companySignature ? (
              <Image
                source={{uri: company?.companySignature}}
                style={{width: '100%', height: 100, resizeMode: 'contain'}}
              />
            ) : null}
          </View>
          <Spacer height={8} />
          <ModalHOC
            visible={openModal}
            onClose={handleModalClose}
            modalStyle={styles.modalWrapper}
            title="UPDATE COMPANY BASIC DETAILS">
            <View style={styles.modalStyle}>
              <UpdateBasicDetailsForm onClose={handleModalClose} />
              <Toast config={toastConfig} />
              <Spacer height={10} />
            </View>
          </ModalHOC>
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner show={getCompaniesRequesting} />
    </>
  );
};

export default BasicDetailsView;
