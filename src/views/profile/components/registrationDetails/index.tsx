import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import EditIcon from '../../../../images/icons/edit.svg';
import Header from '../../../../common/Header';
import { useAppSelector } from '../../../../redux/hooks';
import { ICompanyInfoData } from '../../../../interface/companyRegistration/IGetCompaniesResponse';

interface IRegistrationDetailsViewProps {}

const RegistrationDetailsView: React.FC<IRegistrationDetailsViewProps> = ({}) => {
  const {companies, getCompaniesRequesting} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};

  const getFirstCompany = () => {
    let company:ICompanyInfoData | null  = null;
    if(companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
      company = companiesData[0];
    }
    return company;
  }

  const firstCompany = getFirstCompany();

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
          <EnquiryDetailListItem  label='GST No'/>
          <EnquiryDetailListItem  label='Iba No' value={firstCompany?.ibaApprovalCode}/>
          <EnquiryDetailListItem  label='Cin No' value={firstCompany?.CINNumber}/>
          <EnquiryDetailListItem  label='Company Type'/>
        </View>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default RegistrationDetailsView;
