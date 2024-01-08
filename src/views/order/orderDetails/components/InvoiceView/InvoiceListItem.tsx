import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {IInvoice} from '../../../../../interface/order/IGetInvoiceListResponse';
import {formatDate4} from '../../../../../utils/formatter';
import DocumentActionView from '../../../../../common/DocumentActionView';

interface IProps {
  item: IInvoice;
  index: number;
  onPress: () => void;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

const InvoiceListItem: FC<IProps> = ({
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

  return (
    <View style={styles.itemMainWrapper} key={`${index}`}>
      <View style={styles.itemContentContainer}>
        <View style={[styles.labelContainer, {borderTopLeftRadius: 5}]}>
          <Text style={styles.label}>Invoice#:</Text>
        </View>
        <View style={[styles.valueContainer, {borderTopRightRadius: 5}]}>
          <Text style={styles.value}>{item.serialNo}</Text>
        </View>
      </View>
      <View style={styles.itemContentContainer}>
        <View style={[styles.labelContainer]}>
          <Text style={styles.label}>Invoice Date:</Text>
        </View>
        <View style={[styles.valueContainer]}>
          <Text style={styles.value}>
            {formatDate4(new Date(item.invoiceData))}
          </Text>
        </View>
      </View>
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
  );
};

export default InvoiceListItem;
