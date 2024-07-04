import React, { useEffect, useState } from 'react';
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
  onItemSelect: (item: string, qty: number, packingType: string, valueOfGoods: string) => void;
  onItemDeselect: (item: string) => void;
}

const SelectCheckBoxTextPackingList: React.FC<SelectCheckBoxTextProps> = ({ items, onItemSelect, onItemDeselect }) => {
  const [selectedItems, setSelectedItems] = useState<{ itemName: string; quantity: number; packingType: string; valueOfGoods: string }[]>([]);
  
  const { packingTypes } = useAppSelector(state => state.Common);
  const [packingType, setPackingType] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [itemsData, setItemsData] = useState<string>('');

  const handleCheckboxPress = (item: string) => {
    const existingItem = selectedItems.find(i => i.itemName === item);
    if (existingItem) {
      onItemDeselect(item);
      setSelectedItems(prevItems => prevItems.filter(i => i.itemName !== item));
    } else {
      const newItem = {
        itemName: item,
        quantity: 1,
        packingType: '',
        valueOfGoods: ''
      };
      setSelectedItems(prevItems => [...prevItems, newItem]);
      setItemsData(item);
    }
  };

  const handleQtyChange = (item: string, qty: string) => {
    const quantity = parseInt(qty) || 0;
    setSelectedItems(prevItems =>
      prevItems.map(i => i.itemName === item ? { ...i, quantity } : i)
    );
    const selectedItem = selectedItems.find(i => i.itemName === item);
    if (selectedItem) {
      onItemSelect(item, quantity, selectedItem.packingType, selectedItem.valueOfGoods);
    }
  };

  const _getPackingTypes = () => {
    let packTypes: TDropdownItem[] = [];
    const { data } = packingTypes || {};
    if (data && Array.isArray(data) && data.length > 0) {
      packTypes = data.map((d: IPackingType) => ({
        label: d.packingType,
        value: d.packingType,
      }));
    }
    return packTypes;
  };

  useEffect(() => {
    if (itemsData) {
      const newItem = {
        itemName: itemsData,
        quantity: 1,
        packingType: packingType,
        valueOfGoods: valueOfGoods
      };
      setSelectedItems(prevItems => prevItems.map(i => i.itemName === itemsData ? newItem : i));
      onItemSelect(itemsData, newItem.quantity, newItem.packingType, newItem.valueOfGoods);
    }
  }, [packingType, valueOfGoods, itemsData]);
  

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const selectedItem = selectedItems.find(i => i.itemName === item);
        return (
          <View style={styles.checkBoxField} key={index}>
            <View style={styles.inputContain}>
              <BouncyCheckbox
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                isChecked={!!selectedItem}
                onPress={() => handleCheckboxPress(item)}
              />
              <Text style={styles.itemText}>{item}</Text>
              <TextInput
                style={styles.qtyInput}
                placeholder="1"
                value={selectedItem ? selectedItem.quantity.toString() : ''}
                onChangeText={(text) => handleQtyChange(item, text)}
                keyboardType="numeric"
              />
            </View>
            {selectedItem && (
              <View style={styles.inputBox}>
                <View style={styles.itemContainer}>
                  <Label text="Packing Type" style={styles.label} />
                  <DropdownComponent
                    data={_getPackingTypes()}
                    value={selectedItem ? selectedItem.packingType.toString() : ''}
                    onSelect={(item: TDropdownItem) => setPackingType(item.label)}
                  />
                </View>
                <View style={styles.itemContainer}>
                  <Label text="Value Of goods" style={styles.label} />
                  <Input
                    onChangeText={setValueOfGoods}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    value={selectedItem ? selectedItem.valueOfGoods.toString() : ''}
                    placeholder="Enter amount"
                    inputType="numeric"
                  />
                </View>
              </View>
            )}
          </View>
        );
      })}
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
