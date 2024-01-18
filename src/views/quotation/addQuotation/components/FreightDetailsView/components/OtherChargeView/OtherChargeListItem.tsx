import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_GRAY2,
} from '../../../../../../../utils/colors';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import {Shadow} from 'react-native-shadow-2';
import {IOtherCharge} from '../../../../quotationReducer2';
import Spacer from '../../../../../../../common/Spacer';

interface Props {
  data: IOtherCharge;
  index: number;
  onDelete: (index: number) => void;
}

const OtherChargeListItem: React.FC<Props> = ({data, index, onDelete}) => {
  return (
    <>
      <Shadow distance={1} key={`${index}`}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.labelText}>Item Name:</Text>
              <Text style={styles.valueText}>{data.particular_name}</Text>
            </View>
            {data.quantity ? (
              <>
                <View style={styles.rowContainer}>
                  <Text style={styles.labelText}>Quantity:</Text>
                  <Text style={styles.valueText}>{data.quantity}</Text>
                </View>
              </>
            ) : null}
            {data.part_load_rate_per_item ? (
              <>
                <View style={styles.rowContainer}>
                  <Text style={styles.labelText}>Rate/Item (PL):</Text>
                  <Text style={styles.valueText}>
                    {data.part_load_rate_per_item}
                  </Text>
                </View>
              </>
            ) : null}
            {data.part_load_amount ? (
              <>
                <View style={styles.rowContainer}>
                  <Text style={styles.labelText}>Amount (PL):</Text>
                  <Text style={styles.valueText}>{data.part_load_amount}</Text>
                </View>
              </>
            ) : null}
            {data.full_load_rate_per_item ? (
              <>
                <View style={styles.rowContainer}>
                  <Text style={styles.labelText}>Rate/Item (FL):</Text>
                  <Text style={styles.valueText}>
                    {data.full_load_rate_per_item}
                  </Text>
                </View>
              </>
            ) : null}
            {data.full_load_amount ? (
              <>
                <View style={styles.rowContainer}>
                  <Text style={styles.labelText}>Amount (FL):</Text>
                  <Text style={styles.valueText}>{data.full_load_amount}</Text>
                </View>
              </>
            ) : null}
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => {
                onDelete(index);
              }}>
              <DeleteIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>
      <Spacer height={6} />
    </>
  );
};

export default OtherChargeListItem;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY2,
    padding: 5,
    // marginBottom: 10,
  },
  contentContainer: {
    width: '85%',
  },
  actionContainer: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontWeight: '400',
    marginRight: 10,
  },
  valueText: {
    color: COLOR_GRAY,
    fontSize: 14,
  },
});
