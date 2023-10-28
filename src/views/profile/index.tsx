import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Button from '../../common/Button';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import { ClientStackRoute, MyProfileStackRoute } from '../../utils/constants';
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
import RightArrowIcon from '../../images/icons/right_arrow.svg';

interface IProfilePageViewProps {
  navigation: NavigationProp<any, any>;
}

const ProfilePageView: React.FC<IProfilePageViewProps> = ({ navigation }) => {
  const { t, i18n } = useTranslation();
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

  const handleItemClick = (index: number) => {
    switch (index) {
      case 0:
        return navigation.navigate(MyProfileStackRoute.BasicDetails);
      case 1:
        return navigation.navigate(MyProfileStackRoute.Address);
      case 2:
        return navigation.navigate(MyProfileStackRoute.RegistrationDetails);
      case 3:
        return navigation.navigate(MyProfileStackRoute.AccountDetails);
      case 4:
        return navigation.navigate(MyProfileStackRoute.UPIDetails);
      case 5:
        return navigation.navigate(MyProfileStackRoute.AddBranch);
      case 6:
        return navigation.navigate(MyProfileStackRoute.AddFranchise);
      default:
        return navigation.navigate(MyProfileStackRoute.ProfileRoot);
    }
  };

  const renderListItem = (item: string, index: number) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        activeOpacity={0.4}
        onPress={() => handleItemClick(index)}>
        <Text style={styles.text}>{item}</Text>
        <RightArrowIcon width={18} height={18} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header label="My Profile" canGoBack={true} />
      <Spacer height={10} />
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabOptions}
          renderItem={({ item, index }) => renderListItem(item.label, index)}
        />
      </View>
      <Spacer height={10} />
      {/* {showTabItem()} */}
    </View>
  );
};

export default ProfilePageView;
