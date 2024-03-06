import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import LocationIcon from '../../../../../images/icons/location2.svg';
import RupeeIcon from '../../../../../images/icons/rupee2.svg';
import ShippingTypeIcon from '../../../../../images/icons/delivery-truck2.svg';
import PhoneCallIcon from '../../../../../images/icons/phone_call2.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp_black_icon.svg';

import DocumentActionView from '../../../../../common/DocumentActionView';
import {formatDate, formatDate5} from '../../../../../utils/formatter';

export interface IQuotationItem {
  quotationNo: string;
  clientName: string;
  fromDestination: string;
  toDestination: string;
  shiftingType: string;
  shiftingLuggage:string;
  quotationAmount: string;
  quotationDate: string;
  phoneNumber: string;
  id: string;
  createdOn:string;
}

interface IQuotationListItemProps {
  item: IQuotationItem;
  index: number;
  onPress: () => void;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

const QuotationListItem: React.FC<IQuotationListItemProps> = ({
  item,
  index,
  onPress,
  onDownload,
  onShare,
  onEdit,
  onPreview,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('VIEW DETAILS');

  const handleShowDetail = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (show) {
      setLabel('HIDE');
    } else {
      setLabel('MORE...');
    }
  }, [show]);

  const bottomViewStyle = show
    ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0}
    : {borderBottomLeftRadius: 8, borderBottomRightRadius: 8};

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
        <Text style={styles.enquiryDateText}>
          {formatDate5(new Date(item.createdOn))}
        </Text>
      </View>
      <Shadow style={styles.cardWrapper} distance={1}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View style={styles.container}>
              <View style={styles.dateAndQuotationNumberContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{item.clientName}</Text>
                </View>
                <View style={styles.quotationNumberContainer}>
                  <Text
                    style={
                      styles.nameText
                    }>{`Quotation#: ${item.quotationNo}`}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.rowItemContainer}>
                  <View style={styles.iconContainer}>
                    <LocationIcon width={18} height={18} />
                  </View>
                  <View>
                    <Text style={styles.destinationTypeText}>From</Text>
                    <Text style={styles.destinationText}>
                      {item.fromDestination}
                    </Text>
                  </View>
                </View>
                <View style={styles.rowItemContainer}>
                  <View style={styles.iconContainer}>
                    <LocationIcon width={18} height={18} />
                  </View>
                  <View>
                    <Text style={styles.destinationTypeText}>To</Text>
                    <Text style={styles.destinationText}>
                      {item.toDestination}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.rowItemContainer}>
                  <View style={styles.iconContainer}>
                    <ShippingTypeIcon width={18} height={18} />
                  </View>
                  <View>
                    <Text style={styles.destinationTypeText}>
                      Shipping Type
                    </Text>
                    <Text style={styles.destinationText}>
                      {item.shiftingType}
                    </Text>
                  </View>
                </View>
                <View style={styles.rowItemContainer}>
                  <View style={styles.iconContainer}>
                    <ShippingTypeIcon width={18} height={18} />
                  </View>
                  <View>
                    <Text style={styles.destinationTypeText}>Shifting Luggage</Text>
                    <Text style={styles.destinationText}>
                      {item.shiftingLuggage}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  style={[styles.rowItemContainer, {borderBottomWidth: 0}]}
                  onPress={handleWhatsappCall}
                  activeOpacity={0.4}>
                  <View style={styles.iconContainer}>
                    <WhatsappIcon width={18} height={18} />
                  </View>
                  <View>
                    <Text style={styles.destinationTypeText}>Whatsapp</Text>
                    <Text style={styles.destinationText}>
                      {item.phoneNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rowItemContainer, {borderBottomWidth: 0}]}
                  onPress={handlePhoneCall}
                  activeOpacity={0.4}>
                  <View style={styles.iconContainer}>
                    <PhoneCallIcon width={18} height={18} />
                  </View>
                  <View>
                    <Text style={styles.destinationTypeText}>Call</Text>
                    <Text style={styles.destinationText}>
                      {item.phoneNumber}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.viewDetailsContainer, bottomViewStyle]}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleShowDetail}>
              <Text style={styles.viewDetailsText}>{label}</Text>
            </TouchableOpacity>
          </View>
          <DocumentActionView
            onShare={onShare}
            onDownload={onDownload}
            onPreview={onPreview}
            onEdit={onEdit}
            show={show}
          />
        </View>
      </Shadow>
    </>
  );
};

export default QuotationListItem;
