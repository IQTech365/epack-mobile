import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';

import Spacer from '../../../../../common/Spacer';

export interface IClientItem {
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  shiftingType: string;
  shiftingLuggage: string;
  phoneNumber: string;
  clientId: string;
  registrationDate: string;
  companyName: string;
  email: string;
  mobile: string;
}

interface IClientListItemProps {
  item: IClientItem;
  index: number;
  onPress: () => void;
  onWhatsappPress?: () => void;
  onPhonePress?: () => void;
  onMorePress?: () => void;
}

const ClientListItem: React.FC<IClientListItemProps> = ({item, index, onPress}) => {
    return (
    <Shadow style={styles.cardWrapper} distance={4}>
      <TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={onPress}>
        <View style={styles.dateAndQuotationNumberContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.partyName}</Text>
          </View>
          <View style={styles.contactOptionsContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <WhatsappIcon width={24} height={24} />
            </TouchableOpacity>
            <Spacer width={20} height={0} />
            <TouchableOpacity activeOpacity={0.6}>
              <PhoneBlueIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Spacer height={6} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Customer ID</Text>
          </View>
          <View style={styles.colonContainer}><Text>:</Text></View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.companyId}</Text>
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Reg. Date</Text>
          </View>
          <View style={styles.colonContainer}><Text>:</Text></View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.createdAt}</Text>
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Email</Text>
          </View>
          <View style={styles.colonContainer}><Text>:</Text></View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.email}</Text>
          </View>
        </View>
        <Spacer height={2} />
        <View style={styles.rowContainer}>
          <View style={styles.rowItemContainer}>
            <Text style={styles.labelText}>Company Name</Text>
          </View>
          <View style={styles.colonContainer}><Text>:</Text></View>
          <View style={styles.rowItemContainer2}>
            <Text style={styles.valueText}>{item.partyCompanyName}</Text>
          </View>
        </View>
        <Spacer height={6} />
      </TouchableOpacity>
    </Shadow>
  );
};

export default ClientListItem;
