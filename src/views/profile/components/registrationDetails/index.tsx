import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import EnquiryDetailListItem from '../../../enquiry/enquiryDetails/components/EnquiryDetailListItem';
import styles from './style';
import Header from '../../../../common/Header';
import { useAppSelector } from '../../../../redux/hooks';
import { ICompanyInfoData } from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import { getCurrentCompanyId } from '../../../../utils/storage';

interface IRegistrationDetailsViewProps {}

const RegistrationDetailsView: React.FC<IRegistrationDetailsViewProps> = ({}) => {
  const [company, setCompany] = useState<ICompanyInfoData>();
  const {companies} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};

  const _getCompany = () => {
    getCurrentCompanyId().then(id => {
      if(companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
        const company = companiesData.find((d:ICompanyInfoData) => d._id == id as string);
        setCompany(company);
      }
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _getCompany();
  }, []);

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
          <EnquiryDetailListItem  label='GST No' value={company?.govRegdDetails.companyGST}/>
          <EnquiryDetailListItem  label='PAN No' value={company?.govRegdDetails.companyPAN}/>
          <EnquiryDetailListItem  label='IBA No' value={company?.govRegdDetails.IBAcode}/>
          <EnquiryDetailListItem  label='CIN No' value={company?.govRegdDetails.incorporationNumber}/>
          <EnquiryDetailListItem  label='Company Type' value={company?.govRegdDetails.companyType}/>
        </View>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default RegistrationDetailsView;
