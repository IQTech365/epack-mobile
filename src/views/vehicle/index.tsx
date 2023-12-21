import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';
import styles from './style';
import tabOptions from '../../data/vehicleDetailTab.json';
import RightArrowIcon from '../../images/icons/right_arrow.svg';

interface IVehiclePageViewProps {
  navigation: NavigationProp<any, any>;
}

const VehiclePageView: React.FC<IVehiclePageViewProps> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const handleLanguage = () => {
    // navigation.navigate(ClientStackRoute.Language);
  };

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleItemClick = (index: number) => {
    switch (index) {
      case 0:
        return navigation.navigate('ManageDriver');
      case 1:
        return navigation.navigate('ManageVehicle');
      default:
        return navigation.navigate('VehicleManagementRoot');
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
      <Header label="Vehicle Management" canGoBack={true} />
      <Spacer height={10} />
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabOptions}
          renderItem={({item, index}) => renderListItem(item.label, index)}
        />
      </View>
      <Spacer height={10} />
      {/* {showTabItem()} */}
    </View>
  );
};

export default VehiclePageView;
