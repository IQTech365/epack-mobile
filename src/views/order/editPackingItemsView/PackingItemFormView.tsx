import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_WHITE,
} from '../../../utils/colors';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Label from '../../../common/Label';
import Input from '../../../common/Input';
import DatePickerComponent from '../../../common/DatePickerComponent';
import Spacer from '../../../common/Spacer';
import Button from '../../../common/Button';
import { IPackingItem } from '../../../interface/order/IPackingMaterialResponse';
import { useAppSelector } from '../../../redux/hooks';
import { TDropdownItem } from '../../../type/TDropdownItem';
import { IPackingType } from '../../../interface/common/common';
import DropdownComponent from '../../../common/DropdownComponent';
const {width} = Dimensions.get('window');

interface IProps {
  item: IPackingItem;
  packingListId: string;
  packingListNo: string;
  packingDate: string;
  onUpdate: (index: number, item: IPackingItem) => void;
  index: number;
  isNew?:boolean;
}

const UpdateSurveyItemView: FC<IProps> = ({
  item,
  packingListId,
  packingListNo,
  packingDate,
  index,
  onUpdate,
  isNew = false,
}) => {
  const datePickerCompRef = useRef(null);
  const {packingTypes} = useAppSelector(state => state.Common);
  const [particularName, setParticularName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [packingType, setPackingType] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const _getPackingTypes = () => {
    let packTypes: TDropdownItem[] = [];
    const {data} = packingTypes || {};
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

  useEffect(() => {
    if (item) {
      //@ts-ignore
      datePickerCompRef && datePickerCompRef?.current?.setDefaultValue(new Date(packingDate));
      setParticularName(item.itemName);
      setQuantity(item.quantity);
      setProductCode(item.productCode);
      setValueOfGoods(item.valueOfGoods);
      setDescription(item.description);
    }
  }, [!isNew]);

  const _handleOnUpdate = () => {
    const item: IPackingItem = {
      itemName: particularName,
      packingType: packingType,
      quantity: quantity,
      productCode: productCode,
      valueOfGoods: valueOfGoods,
      description: description,
    };
    onUpdate && onUpdate(index, item);
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <View>
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Packing List No." style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // dispatch({
                  //   type: ACTION.PACKING_NO,
                  //   payload: text,
                  // });
                }}
                editable={false}
                value={packingListNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Serial#"
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Date" style={styles.label} />
              <DatePickerComponent
                onDateSelect={(date: Date) => {
                  // dispatch({
                  //   type: ACTION.PACKING_DATE,
                  //   payload: formatDate4(date),
                  // });
                }}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Item/Particulars Name" style={styles.label} />
            <Input
              onChangeText={setParticularName}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={particularName}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Quantity" style={styles.label} />
              <Input
                onChangeText={setQuantity}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={quantity}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Packing Type" style={styles.label} />
              <DropdownComponent
                data={_getPackingTypes()}
                onSelect={(item: TDropdownItem) => {
                  setPackingType(item.label);
                }}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Product Code" style={styles.label} />
              <Input
                onChangeText={setProductCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={productCode}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of goods" style={styles.label} />
              <Input
                onChangeText={setValueOfGoods}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="2000"
                value={valueOfGoods}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Description" style={styles.label} />
            <Input
              onChangeText={setDescription}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={description}
            />
          </View>
        </View>
        <Spacer height={12} />
        <Button
          text="Update"
          onPress={_handleOnUpdate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default UpdateSurveyItemView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementContainer: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  elementContainer2: {
    width: width * 0.8,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width * 0.38,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_BLACK,
    borderWidth: 0.5,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  textStyle: {
    color: COLOR_WHITE,
    fontFamily: 'WorkSans-Regular',
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
    width: width * 0.7,
  },
  datePicker: {
    width: width * 0.38,
  },
});
