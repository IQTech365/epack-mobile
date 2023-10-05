import React, { useReducer, useCallback, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import { COLOR_BLACK } from '../../../../../utils/colors';
import styles from './style';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import paymentTypeOptions from '../../../../../data/paymentTypeOptions.json';
import receiptAgainstOptions from '../../../../../data/receiptAgainstOptions.json';
import modeOfPaymentOptions from '../../../../../data/modeOfPaymentOptions.json';
import {
  MONEYRECEIPT_FORM_ACTION,
  initialState,
  moneyReceiptReducer,
} from './moneyReceiptReducer';
import { formatDate } from '../../../../../utils/formatter';
import Button from '../../../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { ICreateMoneyReceiptRequest } from '../../../../../interface/order/ICreateMoneyReceiptRequest';
import { createMoneyReceiptRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';

interface IMoneyReceiptViewProps {
  //
}

const MoneyReceiptView: React.FC<IMoneyReceiptViewProps> = ({ }) => {
  const [reducerState, dispatch] = useReducer(moneyReceiptReducer, initialState,);
  const {
    createMoneyReceiptRequesting,
    createMoneyReceiptSuccess,
    createMoneyReceiptError,
    createMoneyReceiptFailure,
  } = useAppSelector(state => state.Order);
  console.log('reducerState----', JSON.stringify(reducerState, null, ' '));
  
  const dispatch2 = useAppDispatch();
  const handleReceiptDate = (date: Date) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.RECEIPT_DATE,
      payload: formatDate(date),
    });
  };

  const handleReceiptNoInputTextChange = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.RECEIPT_NO,
      payload: text,
    });
  };

  const handleBillQuotation = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.BILL_QUOTATION_NO,
      payload: text,
    });
  };
  const handleTemplateDesign = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.MONEY_RECEIPT_DESIGNS,
      payload: item.value,
    });
  };
  const handlePaymentType = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.PAYMENT_TYPE,
      payload: item.value,
    });
  };
  const handleReceiptAgainst = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.RECEIPT_AGAINST,
      payload: item.value,
    });
  };

  const handlePaymentMode = (item: TDropdownItem) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.MODE_OF_PAYMENTS,
      payload: item.value,
    });
  };
  const handleRefNo = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.REF_NO,
      payload: text,
    });
  };
  const handleEnterAmount = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.ENTER_AMOUNT,
      payload: text,
    });
  };
  const handleBiltyLrNo = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.CN_BILTY_LR_NO,
      payload: text,
    });
  };
  const handleNoOfArticles = (text: string) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.NO_OF_ARTICLES,
      payload: text,
    });
  };
  const handleArivalDate = (date: Date) => {
    dispatch({
      type: MONEYRECEIPT_FORM_ACTION.DATE_OF_ARRIVAL,
      payload: formatDate(date),
    });
  };
  const handleTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: item.label,
    // });
  };

  const handleCreate = useCallback(() => {
    // const payload: ICreateMoneyReceiptRequest = reducerState;
    // console.log(payload, 'payload create money');
    // dispatch2(createMoneyReceiptRequest(payload));
  }, []);

  useEffect(() => {
    if (!createMoneyReceiptRequesting && createMoneyReceiptSuccess) {
      //pdf  stuff here
    } else if (!createMoneyReceiptRequesting && createMoneyReceiptError) {
      Alert.alert('Something went wrong. Please try again!');
    }
  }, [
    createMoneyReceiptRequesting,
    createMoneyReceiptSuccess,
    createMoneyReceiptFailure,
  ]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="MONEY RECEIPT DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Receipt No." style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Receipt Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Money Receipt Designs" style={styles.label} />
              <DropdownComponent
                data={shiftingLuggages}
                onSelect={handleTemplateDesign}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Payment Type" style={styles.label} />
              <DropdownComponent
                data={paymentTypeOptions}
                onSelect={handlePaymentType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Receipt Against" style={styles.label} />
                <DropdownComponent
                  data={receiptAgainstOptions}
                  onSelect={handleReceiptAgainst}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Quotation" style={styles.label} />
                <Input
                  onChangeText={handleBillQuotation}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Mode Of Payments" style={styles.label} />
              <DropdownComponent
                data={modeOfPaymentOptions}
                onSelect={handlePaymentMode}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Ref. No" style={styles.label} />
              <Input
                onChangeText={handleRefNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Enter Amount" style={styles.label} />
              <Input
                onChangeText={handleEnterAmount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="OTHER DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="CN / Bilty / LR No." style={styles.label} />
              <Input
                onChangeText={handleBiltyLrNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="No. of Articles" style={styles.label} />
                <Input
                  onChangeText={handleNoOfArticles}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Arrival" style={styles.label} />
                <DatePickerComponent onDateSelect={handleArivalDate} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text="CREATE"
          onPress={handleCreate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        <Spinner show={createMoneyReceiptRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};
export default MoneyReceiptView;
