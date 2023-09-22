import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import Input from '../../../common/Input';
import Button from '../../../common/Button';
import {
  IDocumentSerialNo,
} from '../registrationReducer';
import {
  COLOR_GRAY,
} from '../../../utils/colors';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import Header from '../../../common/Header';

interface ISerialNoSettingPageViewProps {
  
}

const SerialNoSettingPageView: React.FC<ISerialNoSettingPageViewProps> = ({
  
}) => {
  const {state, setDocumentSerialNumber} = useCompanyRegistrationContextHook();
  // console.log('state--------', JSON.stringify(state, null, ' '));

  const handleQuotationSerialNoInputTextChange = (text: string) => {
    const {documentSerialNumbers} = state;
    const tempObj = {
      ...documentSerialNumbers,
      quotation: text,
    };
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleInvoiceSerialNoInputTextChange = (text: string) => {
    const {documentSerialNumbers} = state;
    const tempObj = {
      ...documentSerialNumbers,
      invoice: text,
    };
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleBiltySerialNoInputTextChange = (text: string) => {
    const {documentSerialNumbers} = state;
    const tempObj = {
      ...documentSerialNumbers,
      bilty: text,
    };
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleCarConditionSerialNoInputTextChange = (text: string) => {
    const {documentSerialNumbers} = state;
    const tempObj = {
      ...documentSerialNumbers,
      car_condition: text,
    };
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handleMoneyReceiptSerialNoInputTextChange = (text: string) => {
    const {documentSerialNumbers} = state;
    const tempObj = {
      ...documentSerialNumbers,
      money_receipt: text,
    };
    setDocumentSerialNumber(tempObj as IDocumentSerialNo);
  };

  const handlePreviousClick = useCallback(() => {
    // if (currentStep > 1) {
    //   setCurrentStep(currentStep - 1);
    // }
  }, []);

  const handleNextClick = useCallback(() => {
    // if (currentStep >= 1 && currentStep < 5) {
    //   // validateRegistrationForm();
    //   setCurrentStep(currentStep + 1);
    // }
  }, [state]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
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
                  value={state.documentSerialNumbers?.quotation}
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
                  value={state.documentSerialNumbers?.invoice}
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
                  value={state.documentSerialNumbers?.bilty}
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
                  value={state.documentSerialNumbers?.car_condition}
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
                  value={state.documentSerialNumbers?.money_receipt}
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
    </View>
  );
};

export default SerialNoSettingPageView;
