import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_GRAY2, COLOR_WHITE } from '../../utils/colors';
import Label from '../Label';
import DropdownComponent from '../DropdownComponent';
import { TDropdownItem } from '../../type/TDropdownItem';
import { useAppSelector } from '../../redux/hooks';
import { IPackingType } from '../../interface/common/common';
import Input from '../Input';

const { width } = Dimensions.get('window');

interface SelectCheckBoxTextProps {
  items: string[];
  onItemSelect: (item: string, qty: number) => void;
  onItemDeselect: (item: string) => void;
}

const SelectCheckBoxTextPackingList: React.FC<SelectCheckBoxTextProps> = ({ items, onItemSelect, onItemDeselect }) => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [packingType, setPackingType] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');

  const { packingTypes } = useAppSelector(state => state.Common);

  const handleCheckboxPress = (item: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems[item]) {
        const { [item]: _, ...remainingItems } = prevSelectedItems;
        onItemDeselect(item);
        return remainingItems;
      } else {
        onItemSelect(item, 1);
        return { ...prevSelectedItems, [item]: 1 };
      }
    });
  };

  const _getPackingTypes = () => {
    let packTypes: TDropdownItem[] = [];
    const { data } = packingTypes || {};
    if (data && Array.isArray(data) && data.length > 0) {
      packTypes = data.map((d: IPackingType) => {
        const item: TDropdownItem = {
          label: d.packingType,
          value: d.packingType,
        };
        return item;
      });
    }
    return packTypes;
  };

  const handleQtyChange = (item: string, qty: string) => {
    const quantity = parseInt(qty) || 0;
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems[item]) {
        onItemSelect(item, quantity);
      }
      return {
        ...prevSelectedItems,
        [item]: quantity,
      };
    });
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View style={styles.checkBoxField} key={index}>
          <View style={styles.inputContain}>
            <BouncyCheckbox
              fillColor={COLOR_BLUE}
              unfillColor="#FFFFFF"
              isChecked={!!selectedItems[item]}
              onPress={() => handleCheckboxPress(item)}
            />
            <Text style={styles.itemText}>{item}</Text>
            <TextInput
              style={styles.qtyInput}
              placeholder="1"
              value={selectedItems[item] !== undefined ? selectedItems[item].toString() : ''}
              onChangeText={(text) => handleQtyChange(item, text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputBox}>
            <View style={styles.itemContainer}>
              <Label text="Packing Type" style={styles.label} />
              <DropdownComponent
                data={_getPackingTypes()}
                onSelect={(item: TDropdownItem) => {
                  setPackingType(item.label);
                }}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of goods" style={styles.label} />
              <Input
                onChangeText={setValueOfGoods}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter amount"
                inputType="numeric"
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SelectCheckBoxTextPackingList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLOR_WHITE,
    width: '100%',
  },
  checkBoxField: {
    width: width * 0.9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_BLACK,
    marginVertical: 6,
    padding: 10,
    backgroundColor: COLOR_WHITE,
  },
  inputContain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemText: {
    marginLeft: 6,
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  qtyInput: {
    width: 50,
    height: 40,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY,
    borderRadius: 2,
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
  },
  itemContainer: {
    width: '48%',
  },
});
