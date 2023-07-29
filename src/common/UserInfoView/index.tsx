import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';
import HeaderGridBackgroundImage from '../../images/header-grid.png';
import PhoneIcon from '../../images/icons/phone.svg';
import WhatsappIcon from '../../images/icons/whatsapp.svg';
import Spacer from '../Spacer';
import {IAppUser} from '../../interface/IAppUser';
import {DrawerItemList} from '@react-navigation/drawer';

interface IUserInfoViewProps {
  data: IAppUser;
  props: any;
}

const UserInfoView: React.FC<IUserInfoViewProps> = ({data, props}) => {
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        imageStyle={styles.container}
        source={HeaderGridBackgroundImage}>
        <View style={styles.innerContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <Text style={styles.nameText}>{data.companyName}</Text>
          <Text style={styles.text}>{`User ID: ${data.usesrId}`}</Text>
          <Text style={styles.text}>{`Mobile: ${data.mobile}`}</Text>
          <Text style={styles.text}>{`Email: ${data.email}`}</Text>
          <Spacer height={8} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserInfoView;
