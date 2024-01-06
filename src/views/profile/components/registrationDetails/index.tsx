import React from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import Header from '../../../../common/Header';
import { useAppSelector } from '../../../../redux/hooks';
import { ICompanyInfoData } from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import useCompanyId from '../../../../hooks/useCompanyId';

interface IRegistrationDetailsViewProps {}

const RegistrationDetailsView: React.FC<IRegistrationDetailsViewProps> = ({}) => {
  const {companies} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};
  const companyId = useCompanyId();

  const getCompany = () => {
    let company:ICompanyInfoData | null  = null;
    if(companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
      company = companiesData.find((d:ICompanyInfoData) => d._id == companyId);
    }
    return company;
  }

  const firstCompany = getCompany();

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
      <Header label="Registration Details" canGoBack={true} />
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Registration Details</Text>
        </View>
        <Spacer height={8} />
        <View style={styles.elementContainer}>
          <EnquiryDetailListItem  label='GST No' value={firstCompany?.govRegdDetails.companyGST}/>
          <EnquiryDetailListItem  label='PAN No' value={firstCompany?.govRegdDetails.companyPAN}/>
          <EnquiryDetailListItem  label='Iba No' value={firstCompany?.govRegdDetails.IBAcode}/>
          <EnquiryDetailListItem  label='Cin No' value={firstCompany?.govRegdDetails.incorporationNumber}/>
          <EnquiryDetailListItem  label='Company Type' value={firstCompany?.govRegdDetails.companyType}/>
        </View>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default RegistrationDetailsView;
