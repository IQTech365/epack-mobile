import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_WHITE,
} from '../../utils/colors';
import Label from '../Label';
import DropdownComponent from '../DropdownComponent';
import {TDropdownItem} from '../../type/TDropdownItem';
import {useAppSelector} from '../../redux/hooks';
import Input from '../Input';

const {width} = Dimensions.get('window');

interface SelectCheckBoxTextProps {
  items: string[];
  onItemSelect: (
    itemCollection: {
      itemName: string;
      quantity: number;
      packingType: string;
      valueOfGoods: string;
    }[],
  ) => void;
  onItemDeselect: (item: string) => void;
  initialValues: {
    itemName: string;
    quantity: number;
    packingType: string;
    valueOfGoods: string;
  }[];
  initialPackingList: boolean
}

const SelectCheckBoxTextPackingList: React.FC<SelectCheckBoxTextProps> = ({
  items,
  onItemSelect,
  onItemDeselect,
  initialValues,
  initialPackingList
}) => {
  const [selectedItems, setSelectedItems] = useState<
    {
      itemName: string;
      quantity: number;
      packingType: string;
      valueOfGoods: string;
    }[]
  >([]);
  const {packingTypes} = useAppSelector(state => state.Common);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
  const [itemCollection, setItemCollection] = useState<any[]>([]);
  const [manualQuantity,setManualQuantity] = useState<string>("")



  useEffect(() => {
    if(initialPackingList){
      setSelectedItems(initialValues);
      setItemCollection(initialValues);
    }
  }, [initialValues]);

  const handleCheckboxPress = (item: string, index: number) => {
    setCurrentItemIndex(index);
    const isSelected = selectedItems.some(i => i.itemName === item);
    if (isSelected) {
      const newSelectedItems = selectedItems.filter(i => i.itemName !== item);
      setSelectedItems(newSelectedItems);
      onItemDeselect(item);
    } else {
      const newItem = {
        itemName: item,
        quantity: 1,
        packingType: 'Bag',
        valueOfGoods: '',
      };
      setSelectedItems([...selectedItems, newItem]);
      setItemCollection([...itemCollection, newItem]);
    }
  };

  const handleQtyChange = (qty: string, index: number) => {
    const updatedCollection = itemCollection.map((item, idx) =>
      idx === index ? {...item, quantity: parseInt(qty) || 1} : item,
    );
    console.log("updatedCollection",updatedCollection)
    setItemCollection(updatedCollection);
    setManualQuantity(qty)
    onItemSelect(updatedCollection);
  };

  const handlePackingTypeChange = (packingType: string, index: number) => {
    const updatedCollection = itemCollection.map((item, idx) =>
      idx === index ? {...item, packingType} : item,
    );
    setItemCollection(updatedCollection);
    onItemSelect(updatedCollection);
  };

  const handleValueofGoods = (valueOfGoods: string, index: number) => {
    const updatedCollection = itemCollection.map((item, idx) =>
      idx === index ? {...item, valueOfGoods} : item,
    );
    setItemCollection(updatedCollection);
    onItemSelect(updatedCollection);
  };

  const _getPackingTypes = () => {
    let packTypes: TDropdownItem[] = [];
    const {data} = packingTypes || {};
    if (data && Array.isArray(data) && data.length > 0) {
      packTypes = data.map(d => ({
        label: d.packingType,
        value: d.packingType,
      }));
    }
    return packTypes;
  };

  useEffect(() => {
    _getPackingTypes();
  }, []);

  console.log("manualQuantity",manualQuantity)

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
                isChecked={selectedItem?.itemName}
                onPress={() => handleCheckboxPress(item, index)}
                disableBuiltInState={true}
              />
              <Text style={styles.itemText}>{item}</Text>
              <TextInput
                style={styles.qtyInput}
                placeholder="1"
                // value={selectedItem ? selectedItem.quantity.toString() : ''}
                onChangeText={text => handleQtyChange(text, index)}
                keyboardType="numeric"
                // value={selectedItem ? selectedItem.quantity.toString()}
              />
            </View>
            {currentItemIndex === index && (
              <>
                <View style={styles.inputBox}>
                  <View style={styles.itemContainer}>
                    <Label text="Packing Type" style={styles.label} />
                    <DropdownComponent
                      data={_getPackingTypes()}
                      // defaultValue="Bag"
                      // value={selectedItem ? selectedItem.packingType : ''}
                      onSelect={dropdownItem =>
                        handlePackingTypeChange(dropdownItem.label, index)
                      }
                    />
                  </View>
                  <View style={styles.itemContainer}>
                    <Label text="Value Of Goods" style={styles.label} />
                    <Input
                      onChangeText={text => handleValueofGoods(text, index)}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor="#000000"
                      value={selectedItem ? selectedItem.valueOfGoods : ''}
                      placeholder="Enter amount"
                      inputType="numeric"
                    />
                  </View>
                </View>
              </>
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
