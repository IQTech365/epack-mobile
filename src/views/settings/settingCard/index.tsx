import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import { COLOR_WHITE } from '../../../utils/colors';
import styles from './style';
import ProfileIcon from '../../../images/icons/card_user_icon.svg';
import SerialNoIcon from '../../../images/icons/card_serial_no_icon.svg';
import TemplateIcon from '../../../images/icons/card_template_icon.svg';
import RoleIcon from '../../../images/icons/card_role_icon.svg';

import GearIcon1 from '../../../images/icons/gear_icon1.svg';
import GearIcon2 from '../../../images/icons/gear_icon2.svg';
import GearIcon3 from '../../../images/icons/gear_icon3.svg';
import GearIcon4 from '../../../images/icons/gear_icon4.svg';


interface ISettingCardProps {
  item: string;
  onPress: () => void;
  cardName: string;
}

const SettingCard: React.FC<ISettingCardProps> = ({
  item,
  onPress,
  cardName,
}) => {
  const getCardBackgroundColor = () => {
    let bgColor = {};
    switch (cardName) {
      case 'Profile':
        bgColor = {backgroundColor: COLOR_WHITE};
        break;
      case 'SerialNo':
        bgColor = {backgroundColor: COLOR_WHITE};
        break;
      case 'Template':
        bgColor = {backgroundColor: COLOR_WHITE};
        break;
      case 'Role':
        bgColor = {backgroundColor: COLOR_WHITE};
        break;
      default:
        break;
    }
    return bgColor;
  };

  const getCardIcon = () => {
    switch (cardName) {
      case 'Profile':
        return <ProfileIcon width={72} height={72} />;
      case 'SerialNo':
        return <SerialNoIcon width={72} height={72} />;
      case 'Template':
        return <TemplateIcon width={72} height={72} />;
      case 'Role':
        return <RoleIcon width={72} height={72} />;
      default:
        return null;
    }
  };

  const getCardIconStyle = () => {
    switch (cardName) {
      case 'Profile':
      case 'Template':
        return {left: 20, bottom: 20};
      case 'SerialNo':
      case 'Role':
        return {right: 20, bottom: 20};
      default:
        return null;
    }
  };

  const getGearIcon = () => {
    switch (cardName) {
      case 'Profile':
        return <GearIcon1 width={72} height={72} />;
      case 'SerialNo':
        return <GearIcon2 width={72} height={72} />;
      case 'Template':
        return <GearIcon3 width={72} height={72} />;
      case 'Role':
        return <GearIcon4 width={72} height={72} />;
      default:
        return null;
    }
  };

  const getGearIconStyle = () => {
    switch (cardName) {
      case 'Profile':
        return {right: 0, bottom: 0};
      case 'SerialNo':
        return {left: 0, bottom: 0};
      case 'Template':
        return {top: 0, right: 0};
      case 'Role':
        return {top: 0, left: 0};
      default:
        return null;
    }
  };

  const _getCardText = ():string => {
    let cardText:string = item;
    if(item == "Role Management") {
      cardText = `${item}\n Coming Soon`
    }
    return cardText;
  }

  return (
    <Shadow style={[styles.cardWrapper, getCardBackgroundColor()]} distance={1} startColor="#D9D9D9">
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        disabled={item == "Role Management"}
        onPress={onPress}>
        <Text style={styles.cardTitleText}>{_getCardText()}</Text>
        <View style={[styles.iconContainer, getCardIconStyle()]}>
          {getCardIcon()}
        </View>
        <View style={[styles.gearContainer, getGearIconStyle()]}>
          {getGearIcon()}
        </View>
      </TouchableOpacity>
    </Shadow>
  );
};

export default SettingCard;
