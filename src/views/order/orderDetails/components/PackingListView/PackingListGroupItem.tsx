import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
} from '../../../../../utils/colors';
import {TSurveyMaterialCategory} from '../../../../enquiry/enquiryDetails/utility';
import Label from '../../../../../common/Label';
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {useAppSelector} from '../../../../../redux/hooks';
import {TDropdownItem} from '../../../../../type/TDropdownItem';

type PackingListGroupItemProps = {
  data: TSurveyMaterialCategory;
  onSelect: (isRequired: boolean, itemName: string, packingType: string, amount: string, cft: string, qty: string) => void;
};

const PackingListGroupItem: React.FC<PackingListGroupItemProps> = ({data, onSelect}) => {
  const {packingTypes} = useAppSelector(state => state.Common);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [packingType, setPackingType] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [cftValue, setCftValue] = useState<string>('0');
  const packingTypeCompRef = useRef<IDropdownHandler>(null);

  const toggle = () => {
    setIsRequired(!isRequired);
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
    const item:TDropdownItem = _getPackingTypes().find(it => it.label === 'NA') as TDropdownItem;
    if(item) {
        packingTypeCompRef?.current?.setDefaultValue(item);
    }
  }, []);

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={25}
        unfillColor="#FFFFFF"
        text={data.surveyMaterialItem}
        fillColor={COLOR_BLUE}
        iconStyle={styles.iconStyle}
        innerIconStyle={styles.innerIconStyle}
        textStyle={styles.textStyle}
        style={styles.style}
        textContainerStyle={styles.textContainerStyle}
        onPress={(isChecked: boolean) => {
          toggle();
        }}
        isChecked={isRequired}
        disableBuiltInState={true}
      />
      {isRequired ? (
        <>
          <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
              <Label text="Packing Type" style={styles.label} />
              <DropdownComponent
                data={_getPackingTypes()}
                ref={packingTypeCompRef}
                onSelect={dropdownItem => {
                  if(isRequired) {
                    setPackingType(dropdownItem.value);
                    onSelect(isRequired, data.surveyMaterialItem ,dropdownItem.value, valueOfGoods, cftValue, quantity);
                  } else {
                    onSelect(false, data.surveyMaterialItem , 'NA', '0', '0', '0');
                  }
                }}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of Goods" style={styles.label} />
              <Input
                onChangeText={text => {
                    if(isRequired) {
                        setValueOfGoods(text);
                        onSelect(isRequired, data.surveyMaterialItem , packingType, text, cftValue, quantity);
                    } else {
                        onSelect(false, data.surveyMaterialItem , 'NA', '0', '0', '0');
                    }
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor="#000000"
                value={valueOfGoods}
                placeholder="Enter amount"
                inputType="numeric"
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.itemContainer}>
              <Label text="CFT" style={styles.label} />
              <Input
                onChangeText={text => {
                    if(isRequired) {
                        setCftValue(text);
                        onSelect(isRequired, data.surveyMaterialItem , packingType, valueOfGoods, text, quantity);
                    } else {
                        onSelect(false, data.surveyMaterialItem , 'NA', '0', '0', '0');
                    }
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor="#000000"
                value={cftValue}
                placeholder="Enter CFT"
                inputType="numeric"
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Unit/Quantity" style={styles.label} />
              <Input
                onChangeText={text => {
                    if(isRequired) {
                        setQuantity(text);
                        onSelect(isRequired, data.surveyMaterialItem , packingType, valueOfGoods, cftValue, text);
                    } else {
                        onSelect(false, data.surveyMaterialItem , 'NA', '0', '0', '0');
                    }
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor="#000000"
                value={quantity}
                placeholder="Enter quantity"
                inputType="numeric"
              />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default PackingListGroupItem;
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
    borderRadius: 5,
    padding: 8,
  },
  style: {
    marginRight: 20,
    marginVertical: 5,
  },
  textContainerStyle: {
    paddingLeft: 0,
    marginLeft: 5,
  },
  iconStyle: {
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  textStyle: {
    fontFamily: 'WorkSans-Medium',
    color: COLOR_BLACK,
    textDecorationLine: 'none',
    fontSize: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
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
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
});
