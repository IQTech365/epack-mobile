import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import WhatsAppIcon from '../../images/icons/whatsapp.svg';
import PhoneIcon from '../../images/icons/phone_call2.svg';
import EmailIcon from '../../images/icons/email_icon.svg';
import YouTubeIcon from '../../images/icons/youtube_icon.svg';
import Spacer from '../../common/Spacer';
import { openInbox } from 'react-native-email-link'

const HelpCenterView = props => {
  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Help Center" />
      <Spacer height={20} />
      <Text style={styles.contactUsText}>Contact Us</Text>
      <Spacer height={20} />
      <TouchableOpacity
        style={styles.contactContainer}
        activeOpacity={0.4}
        onPress={() => {
          Linking.openURL(`whatsapp://send?phone=+919355771100`);
        }}>
        <WhatsAppIcon width={30} height={30} />
        <Text style={styles.callText}>Whatsapp</Text>
        <Text style={styles.emailText}>+91 93 5577 1100</Text>
      </TouchableOpacity>
      <Spacer height={20} />
      <TouchableOpacity
        style={styles.contactContainer}
        activeOpacity={0.4}
        onPress={() => {
          Linking.openURL(`tel:9355771100`);
        }}>
        <PhoneIcon width={30} height={30} />
        <Text style={styles.callText}>Customer Support</Text>
        <Text style={styles.emailText}>+91 93 5577 1100</Text>
      </TouchableOpacity>
      <Spacer height={20} />
      <TouchableOpacity
        style={styles.contactContainer}
        activeOpacity={0.4}
        onPress={() => {
            openInbox();
        }}>
        <EmailIcon width={30} height={30} />
        <Text style={styles.callText}>Email</Text>
        <Text style={styles.emailText}>info@epackbook.in</Text>
      </TouchableOpacity>
      <Spacer height={20} />
      <TouchableOpacity
        style={styles.contactContainer}
        activeOpacity={0.4}
        onPress={() => {
          Linking.canOpenURL('vnd.youtube://channel/UCi96-La6N4ScfSaoWXtNN-w').then(
            supported => {
              if (supported) {
                return Linking.openURL('vnd.youtube://channel/UCi96-La6N4ScfSaoWXtNN-w');
              } else {
                return Linking.openURL(
                  'https://www.youtube.com/@ePackBook/channel/UCi96-La6N4ScfSaoWXtNN-w',
                );
              }
            },
          );
        }}>
        <YouTubeIcon width={30} height={30} />
        <Text style={styles.callText}>YouTube Channel</Text>
        <Text style={styles.emailText}>https://www.youtube.com/@ePackBook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpCenterView;
