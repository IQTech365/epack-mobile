import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GRAY, COLOR_WHITE } from '../../utils/colors';

const { width } = Dimensions.get('window');

export type TItem = {
  isChecked: boolean;
  name: string;
  qty: number;
}
interface SelectCheckBoxTextProps {
  items: TItem[];
  onItemSelect: (items: TItem[]) => void;
  onItemDeselect: (item: string) => void;
  reset: boolean;
  surveyItemList: []

}

const SelectCheckBoxText: React.FC<SelectCheckBoxTextProps> = ({ items, onItemSelect, onItemDeselect,reset }) => {
  const [surveyItems, setSurveyItems] = useState<TItem[]>(items);

  useEffect(() => {
    if (reset) {
      // setSelectedItems({});
      // setQuantitySelect("");
    }
  }, [reset]);

  const handleCheckboxPress = (item: TItem, isChecked: boolean) => {
    const copy = [...surveyItems];
    const itemIndex:number = copy.findIndex(it => it.name === item.name);
    console.log("itemIndex",itemIndex)
    if(itemIndex !== -1) {
      const tempItem:TItem = {
        ...item,
        isChecked: isChecked,
        qty: 1,
      }
      copy.splice(itemIndex, 1, tempItem);
      setSurveyItems(copy);
    }
    onItemSelect(surveyItems);
  };

  const handleQtyChange = (item: TItem, qty: string) => {
    const copy = [...surveyItems];
    const itemIndex:number = copy.findIndex(it => it.name === item.name);
    if(itemIndex !== -1) {
      const tempItem:TItem = {
        ...item,
        qty: parseInt(qty),
      }
      copy.splice(itemIndex, 1, tempItem);
      setSurveyItems(copy);
    }
    onItemSelect(surveyItems);
  };

  return (
    <View style={styles.container}>
      {surveyItems.map((item, index) => (
        <View style={styles.checkBoxField} key={index}>
          <View style={styles.inputContain}>
            <BouncyCheckbox
              fillColor={COLOR_BLUE}
              unfillColor="#FFFFFF"
              isChecked={item.isChecked}
              onPress={() => {
                handleCheckboxPress(item, !item.isChecked)
              }}
              disableBuiltInState={true}
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
          <TextInput
            style={styles.qtyInput}
            placeholder="1"
            value={item.qty.toString()}
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
