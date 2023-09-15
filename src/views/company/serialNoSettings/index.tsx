import React, { useReducer } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import { COMPANY_REGISTRATION_ACTION, IDocumentSerialNo, companyRegistrationReducer, initialState } from '../registrationReducer';
import { COLOR_BLACK, COLOR_GRAY, COLOR_GRAY2, COLOR_GRAY3 } from '../../../utils/colors';
import { useCompanyRegistrationContextHook } from '../../../provider/CompanyRegistrationContextProvider';

interface ICompanyLogoPageView {
  //
}

const SerialNoSettingPageView: React.FC<ICompanyLogoPageView> = ({}) => {
  // const [state, dispatch] = useReducer(
  //   companyRegistrationReducer,
  //   initialState,
  // );
  const {state, setDocumentSerialNumber} = useCompanyRegistrationContextHook();
  // console.log('state--------', JSON.stringify(state, null, ' '));

  const handleQuotationSerialNoInputTextChange = (text: string) => {
    const { documentSerialNumbers } = state;
    const tempObj = {
      ...documentSerialNumbers,
      quotation: text,
    };
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS,
    //   payload: tempObj as IDocumentSerialNo,
    // });
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleInvoiceSerialNoInputTextChange = (text: string) => {
    const { documentSerialNumbers } = state;
    const tempObj = {
      ...documentSerialNumbers,
      invoice: text,
    };
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS,
    //   payload: tempObj as IDocumentSerialNo,
    // });
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleBiltySerialNoInputTextChange = (text: string) => {
    const { documentSerialNumbers } = state;
    const tempObj = {
      ...documentSerialNumbers,
      bilty: text,
    };
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS,
    //   payload: tempObj as IDocumentSerialNo,
    // });
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleCarConditionSerialNoInputTextChange = (text: string) => {
    const { documentSerialNumbers } = state;
    const tempObj = {
      ...documentSerialNumbers,
      car_condition: text,
    };
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS,
    //   payload: tempObj as IDocumentSerialNo,
    // });
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleMoneyReceiptSerialNoInputTextChange = (text: string) => {
    const { documentSerialNumbers } = state;
    const tempObj = {
      ...documentSerialNumbers,
      money_receipt: text,
    };
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS,
    //   payload: tempObj as IDocumentSerialNo,
    // });
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  return (
    <View style={styles.container}>
      <AvoidSoftInputViewHOC>
        <>
          <Spacer />
          <Text style={styles.titleText}>
            Set serial No. for the documents.
          </Text>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Quotation Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={handleQuotationSerialNoInputTextChange}
                containerStyle={styles.inputStyle}
                placeholder="123"
                inputStyle={styles.input}
                selectionColor={COLOR_GRAY}
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Invoice Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={handleInvoiceSerialNoInputTextChange}
                containerStyle={styles.inputStyle}
                placeholder="123"
                inputStyle={styles.input}
                selectionColor={COLOR_GRAY}
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Bilty Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={handleBiltySerialNoInputTextChange}
                containerStyle={styles.inputStyle}
                placeholder="123"
                inputStyle={styles.input}
                selectionColor={COLOR_GRAY}
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Car Condition Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={handleCarConditionSerialNoInputTextChange}
                containerStyle={styles.inputStyle}
                placeholder="123"
                inputStyle={styles.input}
                selectionColor={COLOR_GRAY}
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
          <Spacer />
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Money Receipt Serial No.</Text>
          </View>
          <Spacer />
          <View style={styles.rowContainer}>
            <View style={styles.elementContainer}>
              <Input
                onChangeText={handleMoneyReceiptSerialNoInputTextChange}
                containerStyle={styles.inputStyle}
                placeholder="123"
                inputStyle={styles.input}
                selectionColor={COLOR_GRAY}
              />
            </View>
            <View style={styles.elementContainer}>
              <Button
                text="Save"
                onPress={() => {}}
                style={styles.buttonStyle}
              />
            </View>
          </View>
        </>
      </AvoidSoftInputViewHOC>
    </View>
  );
};

export default SerialNoSettingPageView;
