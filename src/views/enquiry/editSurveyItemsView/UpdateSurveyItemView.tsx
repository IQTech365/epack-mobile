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
import {ISurveyListItem} from '../../../interface/enquiry/IAddSurveyItemRequest';
const {width} = Dimensions.get('window');

interface IProps {
  item: ISurveyListItem;
  surveyId: string;
  surveyNo: string;
  surveyDate: string;
  onUpdate: (index: number, item: ISurveyListItem) => void;
  index: number;
  isNew?:boolean;
}

const UpdateSurveyItemView: FC<IProps> = ({item, surveyId, surveyNo, surveyDate, index, onUpdate, isNew}) => {
  const datePickerCompRef = useRef(null);
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [goodsValue, setGoodsValue] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');

  useEffect(() => {
    if(item) {
      //@ts-ignore
      datePickerCompRef && datePickerCompRef?.current?.setDefaultValue(new Date(surveyDate));
      setItemName(item.itemName);
      setQuantity(item.quantity);
      setGoodsValue(item.valueOfGoods);
      setRemarks(item.remarks);
    }
  }, [!isNew]);

  const _handleOnUpdate = () => {
    const item:ISurveyListItem = {
      itemName: itemName,
      quantity: quantity,
      valueOfGoods: goodsValue,
      remarks: remarks,
    }
    onUpdate && onUpdate(index, item);
  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <View>
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Survey List No." style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Serial#"
                value={surveyNo}
                editable={false}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Date" style={styles.label} />
              <DatePickerComponent
                onDateSelect={() => {}}
                style={styles.datePicker}
                //@ts-ignore
                ref={datePickerCompRef}
                disabled={true}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Item/Particulars Name" style={styles.label} />
            <Input
              onChangeText={setItemName}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter particular/item name"
              value={itemName}
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
                placeholder="Enter quantity"
                value={quantity}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of Goods" style={styles.label} />
              <Input
                onChangeText={setGoodsValue}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter goods value"
                value={goodsValue}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Remark" style={styles.label} />
            <Input
              onChangeText={setRemarks}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter remarks"
              value={remarks}
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
