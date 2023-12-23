import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import {MyProfileStackRoute} from '../../utils/constants';
import styles from './style';
import tabOptions from '../../data/profileDetailTabs.json';
import RightArrowIcon from '../../images/icons/right_arrow.svg';

interface IProfilePageViewProps {
  navigation: NavigationProp<any, any>;
}

const ProfilePageView: React.FC<IProfilePageViewProps> = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const handleItemClick = (index: number) => {
    switch (index) {
      case 0:
        return navigation.navigate(MyProfileStackRoute.BasicDetails);
      case 1:
        return navigation.navigate(MyProfileStackRoute.Address);
      case 2:
        return navigation.navigate(MyProfileStackRoute.RegistrationDetails);
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
          renderItem={({item, index}) => renderListItem(item.label, index)}
        />
      </View>
      <Spacer height={10} />
    </View>
  );
};

export default ProfilePageView;
