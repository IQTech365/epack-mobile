import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import ArrowLeftIcon from '../../images/icons/arrow-left.svg';
import MoreIcon from '../../images/icons/more-vertical.svg';
import styles from './styles';

interface IHeaderProps {
  label?: string;
  onMorePress?: () => void;
  canGoBack?: boolean;
  hasMoreOptions?: boolean;
}

const Header:React.FC<IHeaderProps> = ({canGoBack, hasMoreOptions, onMorePress, label}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {canGoBack && <TouchableOpacity style={styles.logo} onPress={handleGoBack}>
          <ArrowLeftIcon width={24} height={24} />
        </TouchableOpacity>}
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
