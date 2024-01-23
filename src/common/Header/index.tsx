import {useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import ArrowLeftIcon from '../../images/icons/arrow-left.svg';
import HamburgerIcon from '../../images/icons/hamburger.svg';
import BellIcon from '../../images/icons/bell.svg';
import Spacer from '../Spacer';
import styles from './styles';
import {useAppSelector} from '../../redux/hooks';
import {ICompanyInfoData} from '../../interface/companyRegistration/IGetCompaniesResponse';
import { getCurrentCompanyId } from '../../utils/storage';

interface IHeaderProps {
  label?: string;
  onMorePress?: () => void;
  canGoBack?: boolean;
  showDrawerIcon?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  canGoBack,
  onMorePress,
  label,
  showDrawerIcon = false,
}) => {
  const navigation = useNavigation();

  const {companies} = useAppSelector(state => state.Company);
  const {data: companiesData} = companies || {};
  const [company, setCompany] = useState<ICompanyInfoData>();

  const _getCompany = () => {
    getCurrentCompanyId().then(id => {
      if (
        companiesData &&
        Array.isArray(companiesData) &&
        companiesData.length > 0
      ) {
        const _company = companiesData.find((d:ICompanyInfoData) => d._id == id);
        setCompany(_company);
      } else if (companiesData && companiesData.hasOwnProperty('authId')) {
        setCompany(companiesData);
      }
    }).catch(err => console.log('storage-err', err));
  };

  const _getCompanyNameOrLogo = () => {
    const {companyLogo, companyName} = company || {};
    if (companyLogo) {
      return (
        <Image
          source={{uri: companyLogo}}
          resizeMode="contain"
          style={styles.avatar}
        />
      );
    } else {
      if(!companyName) return null;
      return (
        <View style={styles.avatar}>
          <Text style={styles.nameText2}>{companyName?.substring(0, 1).toUpperCase()}</Text>
        </View>
      );
    }
  };

  const handleGoBack = () => {
    if (showDrawerIcon) {
      //@ts-ignore
      navigation.toggleDrawer();
    } else {
      navigation.goBack();
    }
  };

  const handleProfileClick = () => {
    //@ts-ignore
    navigation.navigate('Profile');
  };

  useEffect(() => {
    _getCompany();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {canGoBack && (
          <TouchableOpacity style={styles.logo} onPress={handleGoBack}>
            {showDrawerIcon ? (
              <HamburgerIcon width={24} height={24} />
            ) : (
              <ArrowLeftIcon width={24} height={24} />
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{label?.toLocaleUpperCase()}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={handleProfileClick}>
          <View style={styles.avtarContainer}>
            {_getCompanyNameOrLogo()}
          </View>
        </TouchableOpacity>
        <Spacer width={15} />
        <TouchableOpacity style={styles.icon} onPress={onMorePress}>
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
