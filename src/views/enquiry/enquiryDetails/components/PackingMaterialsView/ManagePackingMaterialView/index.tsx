import React, {FC, useEffect, useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import styles from './style';
import PlusIcon from '../../../../../../images/icons/plus_icon.svg';
import MinusIcon from '../../../../../../images/icons/minus_icon.svg';
import EpackDropdown from '../../../../../../common/DropdownComponent2';
import Label from '../../../../../../common/Label';
import { useAppSelector } from '../../../../../../redux/hooks';
import { EPackingMaterialType } from '../PackingMaterialTypeEnum';
import { IPackingItem } from '../utils';

interface IProps {
  title: string;
  unitRequired?: boolean;
  materialType: EPackingMaterialType;
  index: number;
  onChange:(item:IPackingItem, index: number) => void;
}

const ManagePackingMaterialView: FC<IProps> = ({title, unitRequired = true, materialType, onChange, index}) => {
  const [quantity, setQuantity] = useState<string>('0');
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>('');
  const {unitType} = useAppSelector(state => state.Setting);

  const _getUnitTypeList = () => {
    let _data: any[] = [];
    const {data} = unitType || {};
    if (data && Array.isArray(data) && data.length > 0) {
      _data = data.map((item: {unitType: any}) => item.unitType);
    }
    return _data;
  };

  const _onDecrement = () => {
    if (parseInt(quantity) !== 0) {
      const copy = parseInt(quantity);
      setQuantity(`${copy - 1}`);
    }
  };

  const _onIncrement = () => {
    const copy = parseInt(quantity);
    setQuantity(`${copy + 1}`);
  };

  const _handleUnitChange = (unit: string) => {
    setUnitOfMeasure(unit);
  }

  useEffect(() => {
    const item:IPackingItem = {
        name: title,
        quantity: quantity,
        type: unitOfMeasure,
    }
    onChange && onChange(item, index);
  }, [quantity, unitOfMeasure]);


  return (
    <View style={styles.wrapper} key={`${index}`}>
        <View style={styles.labelContainer}>
            <Label text={title} style={styles.label} />
        </View>
      <View style={styles.container}>
        <View style={styles.manageCountContainer}>
          <TouchableOpacity
            style={styles.countActionContainer}
            onPress={_onDecrement}
            activeOpacity={0.4}>
            <MinusIcon width={28} height={28} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              inputMode="numeric"
              value={quantity}
            />
          </View>
          <TouchableOpacity
            style={styles.countActionContainer}
            onPress={_onIncrement}
            activeOpacity={0.4}>
            <PlusIcon width={32} height={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.unitContainer}>
          <EpackDropdown
            data={_getUnitTypeList()}
            placeholder={'Select Unit'}
            hanldeData={_handleUnitChange}
            wrapperStyle={styles.dropDownWrapperStyle}
            disabled={!unitRequired}
          />
        </View>
      </View>
    </View>
  );
};

export default ManagePackingMaterialView;
