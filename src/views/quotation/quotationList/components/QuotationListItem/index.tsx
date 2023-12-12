import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import UserIcon from '../../../../../images/icons/user.svg';
import LocationIcon from '../../../../../images/icons/location.svg';
import RupeeIcon from '../../../../../images/icons/rupee.svg';
import ShippingTypeIcon from '../../../../../images/icons/delivery-truck.svg';
import PhoneCallIcon from '../../../../../images/icons/phone-call.svg';
import Spacer from '../../../../../common/Spacer';
import DocumentActionView from '../../../../../common/DocumentActionView';
import {
  formatDate,
  formatDate2,
  formatDate3,
} from '../../../../../utils/formatter';

export interface IQuotationItem {
  quotationNo: string;
  clientName: string;
  fromDestination: string;
  toDestination: string;
  shiftingType: string;
  quotationAmount: string;
  quotationDate: string;
  phoneNumber: string;
  id:string;
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
      setLabel('HIDE DETAILS');
    } else {
      setLabel('SHOW DETAILS');
    }
  }, [show]);

  return (
    <Shadow style={styles.cardWrapper} distance={4}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.dateAndQuotationNumberContainer}>
              <View style={styles.dateContainer}>
                <Text>{formatDate(new Date(item.quotationDate))}</Text>
              </View>
              <View style={styles.quotationNumberContainer}>
                <Text>{`Quotation: ${item.quotationNo}`}</Text>
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.rowContainer}>
              <View style={styles.rowItemContainer}>
                <View style={styles.iconContainer}>
                  <UserIcon width={18} height={18} />
                </View>
                <Text style={styles.nameText}>{item.clientName}</Text>
              </View>
              <View style={styles.rowItemContainer}>
                <View style={styles.iconContainer}>
                  <RupeeIcon width={24} height={24} />
                </View>
                <Text style={styles.amountText}>{item.quotationAmount}</Text>
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.rowContainer}>
              <View style={styles.rowItemContainer}>
                <View style={styles.iconContainer}>
                  <UserIcon width={24} height={24} />
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
                  <LocationIcon width={24} height={24} />
                </View>
                <View>
                  <Text style={styles.destinationTypeText}>To</Text>
                  <Text style={styles.destinationText}>
                    {item.toDestination}
                  </Text>
                </View>
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.rowContainer}>
              <View style={styles.rowItemContainer}>
                <View style={styles.iconContainer}>
                  <ShippingTypeIcon width={18} height={18} />
                </View>
                <View>
                  <Text style={styles.destinationTypeText}>Shipping Type</Text>
                  <Text style={styles.destinationText}>
                    {item.shiftingType}
                  </Text>
                </View>
              </View>
              <View style={styles.rowItemContainer}>
                <View style={styles.iconContainer}>
                  <PhoneCallIcon width={18} height={18} />
                </View>
                <View>
                  <Text style={styles.destinationTypeText}>Call</Text>
                  <Text style={styles.destinationText}>{item.phoneNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <Spacer height={10} />
        <View style={styles.viewDetailsContainer}>
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
  );
};

export default QuotationListItem;
