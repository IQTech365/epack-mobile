import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Shadow} from 'react-native-shadow-2';
import Spacer from '../../../../../common/Spacer';
import DocumentActionView from '../../../../../common/DocumentActionView';
import {formatDate4} from '../../../../../utils/formatter';
import {ICarCondition} from './ICarCondition';

interface Props {
  item: ICarCondition;
  index: number;
  onPress: () => void;
  onDownload: () => void;
  onShare: () => void;
  onEdit: () => void;
  onPreview: () => void;
}

const CarConditionListItem: React.FC<Props> = ({
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
      <Shadow distance={4}>
        <View style={styles.listItemMainContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.text2}>{`Entry Date: ${formatDate4(
              new Date(item.created_date),
            )}`}</Text>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>V. Condtion#:</Text>
            </View>
            <View style={styles.valueContainer}>
            <Text style={styles.value}>{item.vehicle_condition_no}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Condition Date:</Text>
            </View>
            <View style={styles.valueContainer}>
            <Text style={styles.value}>{item.vehicle_condition_no}</Text>
              <Text style={styles.value}>
                {formatDate4(new Date(item.car_condition_date))}
              </Text>
            </View>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Vehicle Model:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.model}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Vehicle KM:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.running_km}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Vehicle Reg. No:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{item.registration_no}</Text>
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
      </Shadow>
      <Spacer height={20} />
    </View>
  );
};

export default CarConditionListItem;
