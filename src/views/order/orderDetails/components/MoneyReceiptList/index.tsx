import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import DocumentActionView from '../../../../../common/DocumentActionView';
import { formatDate4 } from '../../../../../utils/formatter';

export interface IAddMoneyReceiptItem {
  receiptNumber: string;
  receiptDate: string;
  arivalDate: string;
  receiptAgainst: string;
  billNumber: string;
  quotationNumber: string;
  numbersOfArticles: string;
  paymentAmount: string;
  referenceNumber: string;
  consignmentNumber:string;
}

interface IAddMoneyReceiptListItemProps {
  item: IAddMoneyReceiptItem;
  index: number;
  onPress: () => void;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

const AddMoneyReceiptListItem: React.FC<IAddMoneyReceiptListItemProps> = ({
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

  return (
    <View style={styles.mainWrapper}>
      <Shadow style={styles.cardWrapper} distance={1.5}>
        <TouchableOpacity style={styles.container} activeOpacity={0.6}>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer, {borderTopLeftRadius: 5}]}>
              <Text style={styles.labelText}>Receipt Number</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderTopRightRadius: 5}]}>
              <Text style={styles.valueText}>{item.receiptNumber}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Receipt Date</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{formatDate4(new Date(item.receiptDate))}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Receipt Against</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.receiptAgainst}</Text>
            </View>
          </View>
          {item.receiptAgainst == "Bill" ? <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Bill Number</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.billNumber}</Text>
            </View>
          </View> : null}
          {item.receiptAgainst == "Quotation" ? <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Quotation Number</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.quotationNumber}</Text>
            </View>
          </View> : null}
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Payment Amount</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{`₹ ${item.paymentAmount}.00`}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>CN / Bilty / LR No.</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.consignmentNumber}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Numbers Of Articles</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.numbersOfArticles}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Arival Date</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{formatDate4(new Date(item.arivalDate))}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
      </Shadow>
      <Spacer height={20} />
    </View>
  );
};

export default AddMoneyReceiptListItem;
