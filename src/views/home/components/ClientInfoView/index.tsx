import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './style';
import {Shadow} from 'react-native-shadow-2';
import {useAppSelector} from '../../../../redux/hooks';
import {ICompanyInfoData} from '../../../../interface/companyRegistration/IGetCompaniesResponse';
import {getCurrentCompanyId} from '../../../../utils/storage';

const ClientInfoView = () => {
  const {companies} = useAppSelector(state => state.Company);
  const [company, setCompany] = useState<ICompanyInfoData>();

  const _getCompany = () => {
    getCurrentCompanyId()
      .then(id => {
        console.log('currentCompanyId-', id);
        const {data} = companies || {};
        console.log('companiesData-rrr-', JSON.stringify(data));
        if (data && Array.isArray(data) && data.length > 0) {
          const _company = data.find((d: ICompanyInfoData) => d._id == id);
          setCompany(_company);
        } else if (data && data.hasOwnProperty('authId')) {
          setCompany(data);
        }
      })
      .catch(err => console.log('storage-err', err));
  };

  const _getCompanyNameOrLogo = () => {
    const {companyLogo, companyName} = company || {};
    if (companyLogo) {
      return (
        <Image
          source={{uri: company?.companyLogo}}
          resizeMode="contain"
          style={styles.logo}
        />
      );
    } else {
      if (!companyName) return null;
      return (
        <View style={styles.logo}>
          <Text style={styles.nameText2}>
            {companyName?.substring(0, 1).toUpperCase()}
          </Text>
        </View>
      );
    }
  };

  useEffect(() => {
    _getCompany();
  }, [companies]);

  return (
    <Shadow style={styles.cardWrapper} distance={6}>
      <View style={styles.clientInfoContainer}>
        <View style={styles.clientLogoContainer}>
          <View style={styles.logoContainer}>{_getCompanyNameOrLogo()}</View>
        </View>
        <View style={styles.clientDetailContainer}>
          <Text style={styles.nameText}>{company?.companyName}</Text>
          <Text style={styles.idText}>{`Cust ID: ${company?._id}`}</Text>
        </View>
      </View>
    </Shadow>
  );
};

export default ClientInfoView;
