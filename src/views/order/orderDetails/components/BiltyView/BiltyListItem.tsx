import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Shadow} from 'react-native-shadow-2';
import Spacer from '../../../../../common/Spacer';
import DocumentActionView from '../../../../../common/DocumentActionView';
import {IBiltyItem} from './IBiltyItem';
import {formatDate4} from '../../../../../utils/formatter';

interface Props {
  item: IBiltyItem;
  index: number;
  onPress: () => void;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

const BiltyListItem: React.FC<Props> = ({
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
      setLabel('Hide');
    } else {
      setLabel('MORE...');
    }
  }, [show]);
  console.log("itemData",item)  
  return (
    <View style={styles.mainWrapper}>
      <Shadow distance={4}>
        <View style={styles.listItemMainContainer}>
          <View style={styles.datecontainer}>
            <Text style={styles.text2}>{`Entry Date: ${formatDate4(
              new Date(item.enter_date),
            )}`}</Text>
          </View>
          <Spacer height={5} />
          <View style={[styles.rowContainer, styles.padding]}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Bilty Date:</Text>
              <Text style={styles.value}>
                {formatDate4(new Date(item.bilty_date))}
              </Text>
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Bilty/LR/CN#:</Text>
              <Text style={styles.value}>{item.bilty_no}</Text>
            </View>
          </View>
          <Spacer height={3} />
          <View style={[styles.rowContainer, styles.padding]}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Billing By:</Text>
              <Text style={styles.value}>{item.billing_by}</Text>
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Moving Type:</Text>
              <Text style={styles.value}>{item.moving_type}</Text>
            </View>
          </View>
          <Spacer height={3} />
          <View style={[styles.rowContainer, styles.padding]}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>From:</Text>
              <Text style={styles.value}>{item.from_location}</Text>
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>To:</Text>
              <Text style={styles.value}>{item.to_location}</Text>
            </View>
          </View>
          <Spacer height={3} />
          <View style={[styles.rowContainer, styles.padding]}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Transit Days:</Text>
              <Text style={styles.value}>{item.transit_days}</Text>
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Risk Type:</Text>
              <Text style={styles.value}>{item.risk_type}</Text>
            </View>
          </View>
          <Spacer height={3} />
          <View style={[styles.rowContainer, styles.padding]}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Tax Liability:</Text>
              <Text style={styles.value}>{item.tax_liability}</Text>
            </View>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>Billing Type:</Text>
              <Text style={styles.value}>{item.billing_type}</Text>
            </View>
          </View>
          <Spacer height={3} />
          <View style={[styles.rowContainer, styles.padding]}>
            <Text style={styles.label}>Expected Date of Delivery:</Text>
            <Text style={styles.value}>
              {formatDate4(new Date(item.expected_date_of_delivery))}
            </Text>
          </View>
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
      <Spacer height={20} />
    </View>
  );
};

export default BiltyListItem;
