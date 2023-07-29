import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import ArrowLeftIcon from '../../images/icons/arrow-left.svg';
import HamburgerIcon from '../../images/icons/hamburger.svg';
import MoreIcon from '../../images/icons/more-vertical.svg';
import styles from './styles';

interface IHeaderProps {
  label?: string;
  onMorePress?: () => void;
  canGoBack?: boolean;
  hasMoreOptions?: boolean;
  showDrawerIcon?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  canGoBack,
  hasMoreOptions,
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
        <TouchableOpacity style={styles.icon} onPress={onMorePress}>
          <MoreIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
