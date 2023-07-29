import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import ArrowLeftIcon from '../../images/icons/arrow-left.svg';
import HamburgerIcon from '../../images/icons/hamburger.svg';
import BellIcon from '../../images/icons/bell.svg';
import Spacer from '../Spacer';
import styles from './styles';

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
    navigation.navigate("Profile");
  }
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
        <Text style={styles.text}>{label}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={handleProfileClick}>
          <View style={styles.avtarContainer}>
            <View style={styles.avatar} />
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
