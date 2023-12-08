import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import Button from '../../../../../../../common/Button';
import PlusIcon from '../../../../../../../images/icons/plus_icon.svg';

interface Props {}

const OtherChargeView: React.FC<Props> = ({}) => {
  const {state} = useQuotationFormContextHook();
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  const particularsInputCompRef = useRef(null);
  const quantityInputCompRef = useRef(null);
  const partLoadRatePerItemInputCompRef = useRef(null);
  const partLoadAmountInputCompRef = useRef(null);
  const fullLoadRatePerItemInputCompRef = useRef(null);
  const fullLoadAmountInputCompRef = useRef(null);

  const _renderOtherChargePartLoadView = () => {
    if (state.freight_part_load) {
      return (
        <>
          <Spacer height={4} />
          <View style={styles.twoColumnContainer}>
            <View style={styles.compContainer}>
              <Label text="Part Load (Rate/Item)" style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // setJobType(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //   value={jobType}
                //@ts-ignore
                ref={partLoadRatePerItemInputCompRef}
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="Part Load Amount" style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // setJobType(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //   value={jobType}
                //@ts-ignore
                ref={partLoadAmountInputCompRef}
              />
            </View>
          </View>
        </>
      );
    }
    return null;
  };

  const _renderOtherChargeFullLoadView = () => {
    if (state.freight_full_load) {
      return (
        <>
          <Spacer height={4} />
          <View style={styles.twoColumnContainer}>
            <View style={styles.compContainer}>
              <Label text="Full Load (Rate/Item)" style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // setJobType(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //   value={jobType}
                //@ts-ignore
                  ref={fullLoadRatePerItemInputCompRef}
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="Full Load Amount" style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // setJobType(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //   value={jobType}
                //@ts-ignore
                ref={fullLoadAmountInputCompRef}
              />
            </View>
          </View>
        </>
      );
    }
    return null;
  };

  const toggleShouldAddItem = () => {
    setShouldAdd(!shouldAdd);
  };

  return (
    <>
      <View style={styles.fullWidhCompContainer2}>
        <Label text="OTHER CHARGES" style={styles.label} />
        <Spacer width={10} />
        <TouchableOpacity onPress={toggleShouldAddItem}>
          <PlusIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
      {shouldAdd ? (
        <>
          <View style={styles.contentContainer}>
            <View style={styles.fullWidthContainer}>
              <Label text="Particulars/Items" style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // setJobType(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //   value={jobType}
                //@ts-ignore
                ref={particularsInputCompRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.fullWidthContainer}>
              <Label text="Quantity" style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  // setJobType(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //   value={jobType}
                //@ts-ignore
                ref={quantityInputCompRef}
              />
            </View>
            {_renderOtherChargePartLoadView()}
            {_renderOtherChargeFullLoadView()}
            <Spacer height={12} />
            <View style={styles.fullWidthContainer}>
              <Button
                text="Add"
                onPress={() => {}}
                disabled={false}
                style={styles.buttonStyle}
                textStyle={styles.textStyle}
              />
            </View>
            <Spacer height={4} />
          </View>
        </>
      ) : null}
    </>
  );
};

export default OtherChargeView;
