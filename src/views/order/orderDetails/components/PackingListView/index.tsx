import React, { useReducer, useCallback, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import { COLOR_BLACK } from '../../../../../utils/colors';
import styles from './style';
import receiptAgainstOptions from '../../../../../data/receiptAgainstOptions.json';

import { formatDate, formatDate3 } from '../../../../../utils/formatter';
import Button from '../../../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import Spinner from '../../../../../common/Spinner';
import Toast from 'react-native-toast-message';
import useCompanyId from '../../../../../hooks/useCompanyId';

interface IPackingListViewProps {
  
}

const PackingListView: React.FC<IPackingListViewProps> = ({ }) => {
  const companyId = useCompanyId();
  const dispatch2 = useAppDispatch();
  const handleReceiptDate = (date: Date) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_DATE,
    //   payload: formatDate(date),
    // });
  };

  const handlePackingNoInputTextChange = (text: string) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
    //   payload: text,
    // });
  };

  const handleParticularNameInputTextChange = (text: string) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
    //   payload: text,
    // });
  };

  const handleQuantityInputTextChange = (text: string) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
    //   payload: text,
    // });
  };

  const handleProductCodeInputTextChange = (text: string) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
    //   payload: text,
    // });
  };

  const handleGoodsInputTextChange = (text: string) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
    //   payload: text,
    // });
  };

  const handleDescriptionInputTextChange = (text: string) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
    //   payload: text,
    // });
  };
  const handleTemplateDesign = (item: TDropdownItem) => {
    // dispatch({
    //   type: MONEYRECEIPT_FORM_ACTION.MONEY_RECEIPT_DESIGNS,
    //   payload: item.value,
    // });
  };

  const handleCreate = () => {
  };

  useEffect(() => {
   
  });

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <Label text="Item / Particular Name" style={styles.labelHeading} />
        <Spacer height={4} />
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Packing List No." style={styles.label} />
                <Input
                  onChangeText={handlePackingNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  placeholder='HR 55 hY 2259'
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Item/Particulars Name" style={styles.label} />
              <Input
                  onChangeText={handleParticularNameInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
              <Label text="Quantity" style={styles.label} />
                <Input
                  onChangeText={handleQuantityInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
              <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={receiptAgainstOptions}
                  onSelect={handleTemplateDesign}
                />
                
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
              <Label text="Product Code" style={styles.label} />
                <Input
                  onChangeText={handleProductCodeInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
              <Label text="Value Of goods" style={styles.label} />
              <Input
                  onChangeText={handleGoodsInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  placeholder='2000'
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Description" style={styles.label} />
              <Input
                onChangeText={handleDescriptionInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        
        <Spacer height={12} />
        <Button
          text="Add item/Particular"
          onPress={handleCreate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        {/* <Spinner show={createMoneyReceiptRequesting} /> */}
      </View>
    </AvoidSoftInputViewHOC>
  );
};
export default PackingListView;
