import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import MoreIcon from '../../../../../images/icons/dots-vertical.svg';
import Spacer from '../../../../../common/Spacer';
import enquiryStatusOptions from '../../../../../data/enquiryStatusOptions.json';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { COLOR_BLACK } from '../../../../../utils/colors';

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

  const handleStatus = () =>{
    const data = enquiryStatusOptions.map((item,index)=>{
      return(
        {item}
      )
    })
    console.log(data);

  }

  return (
    <>
      <View style={styles.badgeWrapper}>
        <View style={styles.bageContainer}>
          <Text style={styles.badgeText}>{index + 1}</Text>
        </View>
        <Text style={styles.enquiryDateText}>{item.enquiryDate}</Text>
      </View>
      <Shadow style={styles.cardWrapper} distance={2}>
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
              <TouchableOpacity 
              onPress={()=>handleStatus()}
              activeOpacity={0.4}>
                <Menu>
                  <MenuTrigger>
                  <MoreIcon width={24} height={24} />
                    </MenuTrigger>
                    <MenuOptions>
                    {enquiryStatusOptions.map((option, index) => {
                          const isLastIndex = index == enquiryStatusOptions.length -1;
                          const lastItemStyle = isLastIndex ? {
                            optionWrapper: {borderBottomWidth: 0, marginHorizontal: 5,},
                            optionText: {
                              paddingVertical: 8,
                              color: COLOR_BLACK,
                              fontFamily: 'WorkSans-Regular'
                            }
                          } : undefined;
                          return <MenuOption customStyles={lastItemStyle} key={`${index}`}
                          onSelect={() => {
                            handleEnquiryStatusChange(option);
                          }} text={option} />
                        })}
                    </MenuOptions>
                </Menu>
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Shifting Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.shiftingType}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Pickup Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.pickupAddress}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Delivery Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.deliveryAddress}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={[styles.rowItemContainer, {borderBottomLeftRadius: 5,}]}>
              <Text style={styles.labelText}>Shifting Luggage</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderBottomRightRadius: 5,}]}>
              <Text style={styles.valueText}>{item.shiftingLuggage}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    </>
  );
};

export default EnquiryListItem;
