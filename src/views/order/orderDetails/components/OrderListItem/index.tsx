import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import MoreIcon from '../../../../../images/icons/dots-vertical.svg';

import Spacer from '../../../../../common/Spacer';

export interface IOrderItem {
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  shiftingType: string;
  shiftingLuggage: string;
  phoneNumber: string;
}

interface IOrderListItemProps {
  item: IOrderItem;
  index: number;
  onPress: () => void;
  onWhatsappPress?: () => void;
  onPhonePress?: () => void;
  onMorePress?: () => void;
}

const OrderListItem: React.FC<IOrderListItemProps> = ({item, index, onPress}) => {
  return (
    <Shadow style={styles.cardWrapper} distance={4}>
      <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onPress}>
        <View style={styles.dateAndQuotationNumberContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.clientName}</Text>
          </View>
          <View style={styles.contactOptionsContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <WhatsappIcon width={24} height={24} />
            </TouchableOpacity>
            <Spacer width={12} height={0} />
            <TouchableOpacity activeOpacity={0.6}>
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
          <View style={styles.rowItemContainer}>
            <Text style={styles.valueText}>{item.shiftingType}</Text>
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Pickup Address</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.valueText}>{item.pickupAddress}</Text>
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Delivery Address</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.valueText}>{item.deliveryAddress}</Text>
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Shifting Luggage</Text>
          </View>
          <View style={styles.rowItemContainer}>
            <Text style={styles.valueText}>{item.shiftingLuggage}</Text>
          </View>
        </View>
        <Spacer height={6} />
      </TouchableOpacity>
    </Shadow>
  );
};

export default OrderListItem;
