import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import MoreIcon from '../../../../../images/icons/dots-vertical.svg';

import Spacer from '../../../../../common/Spacer';

export interface IEnquiryItem {
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  shiftingType: string;
  shiftingLuggage: string;
  phoneNumber: string;
  enquiryId: string;
  enquiryDate?: string;
  status: string;
}

interface IEnquiryListItemProps {
  item: IEnquiryItem;
  index: number;
  onPress: () => void;
  onWhatsappPress?: () => void;
  onPhonePress?: () => void;
  onMorePress?: () => void;
}

const EnquiryListItem: React.FC<IEnquiryListItemProps> = ({
  item,
  index,
  onPress,
}) => {

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${item.phoneNumber}`);
  }

  const handleWhatsappCall = () => {
    Linking.openURL(`whatsapp://send?phone=+91${item.phoneNumber}`);
  }
  return (
    <>
      <View style={styles.badgeWrapper}>
        <View style={styles.bageContainer}>
          <Text style={styles.badgeText}>{index + 1}</Text>
        </View>
        <Text style={styles.enquiryDateText}>{item.enquiryDate}</Text>
      </View>
      <Shadow style={styles.cardWrapper}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={onPress}>
          <View style={styles.dateAndQuotationNumberContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{item.clientName}</Text>
            </View>
            <View style={styles.contactOptionsContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={handleWhatsappCall} >
                <WhatsappIcon width={24} height={24} />
              </TouchableOpacity>
              <Spacer width={12} height={0} />
              <TouchableOpacity activeOpacity={0.6} onPress={handlePhoneCall}>
                <PhoneBlueIcon width={24} height={24} />
              </TouchableOpacity>
              <Spacer width={12} height={0} />
              <TouchableOpacity activeOpacity={0.4}>
                <MoreIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={6} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Shifting Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.shiftingType}</Text>
            </View>
          </View>
          <Spacer height={2} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Pickup Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.pickupAddress}</Text>
            </View>
          </View>
          <Spacer height={2} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Delivery Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.deliveryAddress}</Text>
            </View>
          </View>
          <Spacer height={2} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Shifting Luggage</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.shiftingLuggage}</Text>
            </View>
          </View>
          <Spacer height={6} />
        </TouchableOpacity>
      </Shadow>
    </>
  );
};

export default EnquiryListItem;
