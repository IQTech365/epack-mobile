import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';
import HeaderGridBackgroundImage from '../../../../../images/header-grid.png';
import PhoneIcon from '../../../../../images/icons/phone.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import Spacer from '../../../../../common/Spacer';
import { IGetEnquiriesData } from '../../../../../interface/enquiry/IGetEnquiriesResponse';
import { formatDate } from '../../../../../utils/formatter';

interface IEnquiryInfoViewProps {
  item: IGetEnquiriesData | undefined;
}

const EnquiryInfoView: React.FC<IEnquiryInfoViewProps> = ({item}) => {

  const getEnquiryDate = () => {
    if(item && item.createdAt) {
      return formatDate(new Date(item.createdAt));
    }
    return 'NA'
  }
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        imageStyle={styles.container}
        source={HeaderGridBackgroundImage}>
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.infoContainer}>
              <View style={[styles.itemContainer]}>
                <Text style={styles.nameText}>{item?.partyName || item?.billingDetails?.authorityPersonName}</Text>
              </View>
              <View style={[styles.itemContainer]}>
                <Text style={styles.normalText}>{item?.mobile || item?.billingDetails?.authorityPersonMobile}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>From</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{item?.pickupAddress.state}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Date</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{getEnquiryDate()}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>To</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{item?.dropAddress.state}</Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Status</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{item?.status}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.iconItemContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <WhatsappIcon width={24} height={24} />
            </TouchableOpacity>
            <Spacer height={20} />
            <TouchableOpacity activeOpacity={0.6}>
              <PhoneIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EnquiryInfoView;
