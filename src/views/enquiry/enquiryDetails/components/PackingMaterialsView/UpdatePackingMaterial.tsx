import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions, Button} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import {COLOR_BLACK, COLOR_GRAY2} from '../../../../../utils/colors';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import useAuthId from '../../../../../hooks/useAuthId';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import PlusIcon from '../../../../../images/icons/plus_icon.svg';
import MinusIcon from '../../../../../images/icons/minus_icon.svg';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {IPackingMaterial} from '../../../../../interface/enquiry/IAddPackingMaterialRequest';
import {IMaterial} from '../../../../../interface/enquiry/IPackingMaterialsResponse';

interface IProps {
  item: IMaterial;
  onUpdate: (index: number, item: IMaterial) => void;
}

const UpdatePackingMaterialView: React.FC<IProps> = ({item, onUpdate}) => {
  const authId = useAuthId();
  const navigation = useNavigation();
  const {unitType} = useAppSelector(state => state.Setting);
  const dropdownCompRef = useRef(null);

  const {updatePackingMaterialRequesting} = useAppSelector(
    state => state.Enquiry,
  );
  const dispatch = useAppDispatch();

  const _getUnitTypeList = () => {
    let _data: TDropdownItem[] = [];
    const {data} = unitType || {};
    if (data && Array.isArray(data) && data.length > 0) {
      _data = data.map((item: any) => {
        const _item: TDropdownItem = {
          label: item?.unitType,
          value: item?.unitType,
        };
        return _item;
      });
    }
    return _data;
  };

  const _onDecrement = () => {
    // if (parseInt(quantity) !== 0) {
    //   const copy = parseInt(quantity);
    //   setQuantity(`${copy - 1}`);
    // }
  };

  useEffect(() => {
    if (unitType && _getUnitTypeList().length > 0) {
      const firstItem: TDropdownItem = _getUnitTypeList()[0];
      //   setUnitOfMeasure(firstItem.value);
    }
  }, [unitType]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.wrapper}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Item:</Text>
          <Text style={styles.valueText}>{` ${item.name}`}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Quantity:</Text>
          <Text style={styles.valueText}>{` ${item.quantity}`}</Text>
        </View>
        <View style={styles.manageCountContainer}>
          <TouchableOpacity
            style={styles.countActionContainer}
            onPress={_onDecrement}
            activeOpacity={0.4}>
            <MinusIcon width={28} height={28} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text: string) => {
                // setQuantity(text);
              }}
              style={styles.input}
              inputMode="numeric"
              //   value={quantity}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <TouchableOpacity
            style={styles.countActionContainer}
            // onPress={_onIncrement}
            activeOpacity={0.4}>
            <PlusIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default UpdatePackingMaterialView;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  labelContainer: {
    width: width * 0.92,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  labelText: {
    color: COLOR_BLACK,
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
  },
  valueText: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
  },
  manageCountContainer: {
    width: width * 0.9,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countActionContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '40%',
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
});
