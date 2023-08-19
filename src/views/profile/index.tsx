import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList} from 'react-native';
import Button from '../../common/Button';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {ClientStackRoute} from '../../utils/constants';
import styles from './style';
import tabOptions from '../../data/profileDetailTabs.json';
import Tab from '../../common/Tab';
import BasicDetailsView from './components/basicDetails';
import AddressView from './components/address';
import RegistrationDetailsView from './components/registrationDetails';
import AccountDetailsView from './components/accountDetails';
import UPIDetailsView from './components/upiDetails';
import PackerSignatureView from './components/packerSignature';
import TermsAndConditionView from './components/termsAndConditions';

interface IProfilePageViewProps {
  navigation: NavigationProp<any, any>;
}

const ProfilePageView: React.FC<IProfilePageViewProps> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const handleLanguage = () => {
    // navigation.navigate(ClientStackRoute.Language);
  };

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const showTabItem = () => {
    switch (activeTabIndex) {
      case 0:
        return <BasicDetailsView />;
      case 1:
        return <AddressView />;
      case 2:
        return <RegistrationDetailsView />;
      case 3:
        return <AccountDetailsView />;
      case 4:
        return <UPIDetailsView />;
      case 5:
        return <PackerSignatureView />;
      case 6:
        return <TermsAndConditionView />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header label="My Profile" canGoBack={true} />
      <Spacer height={10} />
      <View style={styles.tabsContainer}>
        <FlatList
          style={{paddingHorizontal: 8}}
          data={tabOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Tab
              label={item.label}
              index={index}
              onPress={handleTabChange}
              activeIndex={activeTabIndex}
            />
          )}
        />
      </View>
      <Spacer height={10} />
      {showTabItem()}
    </View>
  );
};

export default ProfilePageView;
