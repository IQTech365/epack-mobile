import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

interface IOrderDetailListItemProps {
  label?: string;
  value?: string;
  isLast?: boolean;
}

const OrderDetailListItem: React.FC<IOrderDetailListItemProps> = ({
  label,
  value,
  isLast = false,
}) => {
  const lastItemStyle = isLast ? styles.lastItemBorderStyle : {};
  return (
    <View style={styles.container}>
      <View style={[styles.labelContainer, lastItemStyle]}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={[styles.valueContainer, lastItemStyle]}>
        <Text style={styles.valueText}>{value ? value : 'Not Available'}</Text>
      </View>
    </View>
  );
};

export default OrderDetailListItem;
