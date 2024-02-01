import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {
  gstOptions,
  gstPaidByOptions,
  gstPercentOptions,
  gstTypeOptions,
} from '../../../../utils';
import {COLOR_BLUE} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import DropdownComponent from '../../../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../../../type/TDropdownItem';

interface Props {}

const FreightGSTView: React.FC<Props> = ({}) => {
  const {state, setGSTOnInvoice, setGSTPercent, setGSTType, setGSTPaidBy} =
    useInvoiceFormContextHook();

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.labelText}>GST</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {gstOptions.map((option: string, index: number) => (
          <BouncyCheckbox
            key={`${index}`}
            size={25}
            unfillColor="#FFFFFF"
            text={option}
            fillColor={COLOR_BLUE}
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            style={styles.style}
            textContainerStyle={styles.textContainerStyle}
            onPress={(isChecked: boolean) => {
              setGSTOnInvoice(option);
            }}
            isChecked={state.gst_on_invoice == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      {state.gst_on_invoice == gstOptions[0] ? (
        <>
          <Spacer height={10} />
          <View style={styles.fullWidthContainer}>
            <View style={styles.compContainer}>
              <DropdownComponent
                data={gstPercentOptions}
                onSelect={(item: TDropdownItem) => {
                  setGSTPercent(item.label);
                }}
              />
            </View>
            <View style={styles.compContainer}>
              <DropdownComponent
                data={gstTypeOptions}
                onSelect={(item: TDropdownItem) => {
                  setGSTType(item.label);
                }}
              />
            </View>
          </View>
        </>
      ) : null}
      <Spacer height={15} />
      <View style={styles.container}>
        <Text style={styles.labelText}>GST paid by</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {gstPaidByOptions.map((option: string, index: number) => (
          <BouncyCheckbox
            key={`${index}`}
            size={25}
            unfillColor="#FFFFFF"
            text={option}
            fillColor={COLOR_BLUE}
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            style={styles.style}
            textContainerStyle={styles.textContainerStyle}
            onPress={(isChecked: boolean) => {
              setGSTPaidBy(option);
            }}
            isChecked={state.gst_paid_by == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
    </View>
  );
};

export default FreightGSTView;
