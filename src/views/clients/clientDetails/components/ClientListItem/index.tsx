import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import Spacer from '../../../../../common/Spacer';
import {
  ICustomer,
  ICustomerBillingInfo,
} from '../../../../../interface/customer/customer';
import { formatDate5 } from '../../../../../utils/formatter';

interface IClientListItemProps {
  item: ICustomer;
  index: number;
  onPress: () => void;
  onWhatsappPress?: () => void;
  onPhonePress?: () => void;
  onMorePress?: () => void;
}

const ClientListItem: React.FC<IClientListItemProps> = ({
  item,
  index,
  onPress,
}) => {

  const _getContactNo = () => {
    let contact: string = '';
    if (item.billingBy == 'by Individual') {
      contact = item.mobile;
    } else {
      const billingInfo: ICustomerBillingInfo =
        item.billingDetails as ICustomerBillingInfo;
      contact = billingInfo.authorityPersonMobile || billingInfo.employeeMobile;
    }
    return contact;
  };

  const _getClientName = () => {
    let name:string = '';
    if(item.billingBy == 'by Individual') {
      name = item.partyName;
    } else {
      const billingInfo: ICustomerBillingInfo =
        item.billingDetails as ICustomerBillingInfo;
        name = billingInfo.companyName || billingInfo.authorityPersonName || billingInfo.employeeName;
    }
    return name;
  }

  const _getCompanyOrPartyName = () => {
    let name:string = '';
    if(item.billingBy == 'by Individual') {
      name = item.partyName;
    } else {
      const billingInfo: ICustomerBillingInfo =
        item.billingDetails as ICustomerBillingInfo;
        name = billingInfo.companyName;
    }
    return name;
  }

  const _getCompanyOrPartyNameLabel = () => {
    let name:string = '';
    if(item.billingBy == 'by Individual') {
      name = 'Party Name';
    } else {
        name = 'Company Name';
    }
    return name;
  }

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
    <View style={styles.wrapper} key={`${index}`}>
      <Shadow style={styles.cardWrapper} distance={1.5}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={onPress}>
          <View style={styles.dateAndQuotationNumberContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{_getClientName()}</Text>
            </View>
            <View style={styles.contactOptionsContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={handleWhatsappCall}>
                <WhatsappIcon width={24} height={24} />
              </TouchableOpacity>
              <Spacer width={20} height={0} />
              <TouchableOpacity activeOpacity={0.6} onPress={handlePhoneCall}>
                <PhoneBlueIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Customer ID</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item._id}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Reg. Date</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{formatDate5(new Date(item.createdAt))}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Mobile</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{_getContactNo()}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer, {borderBottomLeftRadius: 5}]}>
              <Text style={styles.labelText}>{_getCompanyOrPartyNameLabel()}</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderBottomRightRadius: 5}]}>
              <Text style={styles.valueText}>{_getCompanyOrPartyName()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    </View>
  );
};

export default ClientListItem;
