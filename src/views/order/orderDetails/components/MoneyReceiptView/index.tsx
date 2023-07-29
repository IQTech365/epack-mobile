import React from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import paymentTypeOptions from '../../../../../data/paymentTypeOptions.json';
import receiptAgainstOptions from '../../../../../data/receiptAgainstOptions.json';
import modeOfPaymentOptions from '../../../../../data/modeOfPaymentOptions.json';


interface IMoneyReceiptViewProps {
  //
}

const MoneyReceiptView: React.FC<IMoneyReceiptViewProps> = ({}) => {
  const handleReceiptDate = (date: Date) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };

  const handleReceiptNoInputTextChange = (text: string) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.COMPANY_NAME,
    //   payload: text,
    // });
  };

  const handleTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: item.label,
    // });
  };

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
                onSelect={handleTemplate}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Payment Type" style={styles.label} />
              <DropdownComponent
                data={paymentTypeOptions}
                onSelect={handleTemplate}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Receipt Against" style={styles.label} />
                <DropdownComponent
                  data={receiptAgainstOptions}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Quotation" style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
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
                onSelect={handleTemplate}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Ref. No" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Enter Amount" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
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
                onChangeText={handleReceiptNoInputTextChange}
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
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Arrival" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default MoneyReceiptView;
