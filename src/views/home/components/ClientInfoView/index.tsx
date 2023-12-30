import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {Shadow} from 'react-native-shadow-2';
import { useAppSelector } from '../../../../redux/hooks';
import { ICompanyInfoData } from '../../../../interface/companyRegistration/IGetCompaniesResponse';

const ClientInfoView = () => {
  const {companies} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};

  const getFirstCompany = () => {
    let company: ICompanyInfoData | null = null;
    if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      company = companiesData[0];
    } else if (companiesData && companiesData.hasOwnProperty('authId')) {
      company = companiesData;
    }
    return company;
  };

  const firstCompany = getFirstCompany();

  const _getCompanyNameOrLogo = () => {
    const {companyLogo, companyName} = firstCompany || {};
    if (companyLogo) {
      return (
        <Image
          source={{uri: firstCompany?.companyLogo}}
          resizeMode="contain"
          style={styles.logo}
        />
      );
    } else {
      if(!companyName) return null;
      return (
        <View style={styles.logo}>
          <Text style={styles.nameText2}>{companyName?.substring(0, 1).toUpperCase()}</Text>
        </View>
      );
    }
  };

  return (
    <Shadow style={styles.cardWrapper} distance={6}>
      <View style={styles.clientInfoContainer}>
        <View style={styles.clientLogoContainer}>
          <View style={styles.logoContainer}>
          {_getCompanyNameOrLogo()}
          </View>
        </View>
        <View style={styles.clientDetailContainer}>
          <Text style={styles.nameText}>{firstCompany?.companyName}</Text>
          <Text style={styles.idText}>{`Cust ID: ${firstCompany?._id}`}</Text>
        </View>
      </View>
    </Shadow>
  );
};

export default ClientInfoView;
