import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_WHITE } from '../../utils/colors';

const { width } = Dimensions.get('window');

interface SelectCheckBoxTextProps {
  items: string[];
  onItemSelect: (item: string, qty: number) => void;
  onItemDeselect: (item: string) => void;
  reset: boolean;

}

const SelectCheckBoxText: React.FC<SelectCheckBoxTextProps> = ({ items, onItemSelect, onItemDeselect,reset }) => {
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number }>({});
  const [quantitySelect,setQuantitySelect] = useState<string>("")

  useEffect(() => {
    if (reset) {
      setSelectedItems({});
      setQuantitySelect("");
    }
  }, [reset]);

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

  const handleQtyChange = (item: string, qty: string) => {
    const quantity = parseInt(qty) || 0;
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems[item]) {
        onItemSelect(item, quantity);
      }
      setQuantitySelect(quantity)

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
              disableBuiltInState={true}
            />
            <Text style={styles.itemText}>{item}</Text>
          </View>
          <TextInput
            style={styles.qtyInput}
            placeholder="1"
            value={quantitySelect}
            onChangeText={(text) => handleQtyChange(item, text)}
            keyboardType="numeric"
          />
        </View>
      ))}
    </View>
  );
};

export default SelectCheckBoxText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  checkBoxField: {
    width: width * 0.9,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLOR_BLACK,
    marginVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: COLOR_WHITE,
  },
  inputContain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 6,
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  qtyInput: {
    width: 50,
    height: 50,
    borderLeftWidth: 0.5,
    borderColor: COLOR_GRAY,
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    fontSize: 16,
  },
});
