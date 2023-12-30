import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Linking} from 'react-native';
import styles from './style';
import HeaderGridBackgroundImage from '../../../../../images/header-grid.png';
import PhoneIcon from '../../../../../images/icons/phone-call.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import Spacer from '../../../../../common/Spacer';
import {
  ICustomer,
  ICustomerBillingInfo,
} from '../../../../../interface/customer/customer';
import {formatDate5} from '../../../../../utils/formatter';

interface IClientInfoViewProps {
  item: ICustomer;
}

const ClientInfoView: React.FC<IClientInfoViewProps> = ({item}) => {
  const _getClientOrCompanyName = (): string => {
    let name: string = '';
    if (item.billingBy == 'by Individual') {
      name = item.partyName;
    } else {
      const billingInfo: ICustomerBillingInfo =
        item.billingDetails as ICustomerBillingInfo;
      name = billingInfo.companyName;
    }
    return name;
  };

  const handlePhoneCall = () => {
    let phoneNumber:string = '';
    if(item.billingBy == 'by Individual') {
      phoneNumber = item.mobile;
    } else {
      const billingInfo:ICustomerBillingInfo = item.billingDetails as ICustomerBillingInfo;
      if(billingInfo.authorityPersonMobile) {
        phoneNumber = billingInfo.authorityPersonMobile;
      } else if(billingInfo.employeeMobile) {
        phoneNumber = billingInfo.employeeMobile;
      }
    }
    if(phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  }

  const handleWhatsappCall = () => {
    let phoneNumber:string = '';
    if(item.billingBy == 'by Individual') {
      phoneNumber = item.mobile;
    } else {
      const billingInfo:ICustomerBillingInfo = item.billingDetails as ICustomerBillingInfo;
      if(billingInfo.authorityPersonMobile) {
        phoneNumber = billingInfo.authorityPersonMobile;
      } else if(billingInfo.employeeMobile) {
        phoneNumber = billingInfo.employeeMobile;
      }
    }
    if(phoneNumber) {
      Linking.openURL(`whatsapp://send?phone=+91${phoneNumber}`);
    }
  }

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        imageStyle={styles.container}
        source={HeaderGridBackgroundImage}>
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.infoContainer}>
              <View style={[styles.labelContainer]}>
                <Text style={styles.nameText}>Client Name</Text>
              </View>
              <View style={styles.hyphenContainer}>
                <Text style={styles.hyphenText}>-</Text>
              </View>
              <View style={[styles.valueContainer]}>
                <Text style={styles.normalText}>
                  {_getClientOrCompanyName()}
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.nameText}>Client ID</Text>
              </View>
              <View style={styles.hyphenContainer}>
                <Text style={styles.hyphenText}>-</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{item._id}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.nameText}>Regd. Date</Text>
              </View>
              <View style={styles.hyphenContainer}>
                <Text style={styles.hyphenText}>-</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>
                  {formatDate5(new Date(item.createdAt))}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.iconItemContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleWhatsappCall}>
              <WhatsappIcon width={24} height={24} />
            </TouchableOpacity>
            <Spacer height={20} />
            <TouchableOpacity activeOpacity={0.6} onPress={handlePhoneCall}>
              <PhoneIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ClientInfoView;
