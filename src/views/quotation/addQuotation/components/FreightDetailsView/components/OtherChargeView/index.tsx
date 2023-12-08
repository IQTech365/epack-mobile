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
import OtherChargeListItem from './OtherChargeListItem';
import { IOtherCharge } from '../../../../quotationReducer2';

interface Props {}

const OtherChargeView: React.FC<Props> = ({}) => {
  const {state, setOtherCharges} = useQuotationFormContextHook();
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  const particularsInputCompRef = useRef(null);
  const quantityInputCompRef = useRef(null);
  const partLoadRatePerItemInputCompRef = useRef(null);
  const partLoadAmountInputCompRef = useRef(null);
  const fullLoadRatePerItemInputCompRef = useRef(null);
  const fullLoadAmountInputCompRef = useRef(null);

  const [particularName, setParticularName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [partLoadRatePerItem, setPartLoadRatePerItem] = useState<string>('');
  const [partLoadAmount, setPartLoadAmount] = useState<string>('');
  const [fullLoadRatePerItem, setFullLoadRatePerItem] = useState<string>('');
  const [fullLoadAmount, setFullLoadAmount] = useState<string>('');
  const [items, setItems] = useState<IOtherCharge[]>([]);

  const handleAddItem = () => {
    const item: IOtherCharge = {
      particular_name: particularName,
      quantity: quantity,
      part_load_rate_per_item: partLoadRatePerItem,
      part_load_amount: partLoadAmount,
      full_load_rate_per_item: fullLoadRatePerItem,
      full_load_amount: fullLoadAmount,
    };
    const copy = [...items];
    copy.push(item);
    setItems(copy);
    setOtherCharges(copy);
    resetInputs();
  };

  const handleDeleteItem = (index: number) => {
    const copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
  };

  const resetInputs = () => {
    if(particularsInputCompRef) {
      //@ts-ignore
      particularsInputCompRef?.current.reset('');
      setParticularName('');
    }
    if(quantityInputCompRef) {
      //@ts-ignore
      quantityInputCompRef?.current.reset('');
      setQuantity('');
    }
    if(state.freight_part_load && partLoadRatePerItemInputCompRef) {
      //@ts-ignore
      partLoadRatePerItemInputCompRef?.current.reset('');
      setPartLoadRatePerItem('');
    }
    if(state.freight_part_load && partLoadAmountInputCompRef) {
      //@ts-ignore
      partLoadAmountInputCompRef?.current.reset('');
      setPartLoadAmount('');
    }
    if(state.freight_full_load && fullLoadRatePerItemInputCompRef) {
      //@ts-ignore
      fullLoadRatePerItemInputCompRef?.current.reset('');
      setFullLoadRatePerItem('');
    }
    if(state.freight_full_load && fullLoadAmountInputCompRef) {
      //@ts-ignore
      fullLoadAmountInputCompRef?.current.reset('');
      setFullLoadAmount('')
    }
  }

  const _renderOtherChargePartLoadView = () => {
    if (state.freight_part_load) {
      return (
        <>
          <Spacer height={4} />
          <View style={styles.twoColumnContainer}>
            <View style={styles.compContainer}>
              <Label text="Part Load (Rate/Item)" style={styles.label} />
              <Input
                onChangeText={setPartLoadRatePerItem}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={partLoadRatePerItem}
                //@ts-ignore
                ref={partLoadRatePerItemInputCompRef}
                inputType="numeric"
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="Part Load Amount" style={styles.label} />
              <Input
                onChangeText={setPartLoadAmount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={partLoadAmount}
                //@ts-ignore
                ref={partLoadAmountInputCompRef}
                inputType="numeric"
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
                onChangeText={setFullLoadRatePerItem}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={fullLoadRatePerItem}
                //@ts-ignore
                ref={fullLoadRatePerItemInputCompRef}
                inputType="numeric"
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="Full Load Amount" style={styles.label} />
              <Input
                onChangeText={setFullLoadAmount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={fullLoadAmount}
                //@ts-ignore
                ref={fullLoadAmountInputCompRef}
                inputType="numeric"
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
                onChangeText={setParticularName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={particularName}
                //@ts-ignore
                ref={particularsInputCompRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.fullWidthContainer}>
              <Label text="Quantity" style={styles.label} />
              <Input
                onChangeText={setQuantity}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={quantity}
                //@ts-ignore
                ref={quantityInputCompRef}
                inputType="numeric"
              />
            </View>
            {_renderOtherChargePartLoadView()}
            {_renderOtherChargeFullLoadView()}
            <Spacer height={12} />
            <View style={styles.fullWidthContainer}>
              <Button
                text="Add"
                onPress={handleAddItem}
                disabled={false}
                style={styles.buttonStyle}
                textStyle={styles.textStyle}
              />
            </View>
            <Spacer height={12} />
            {items.map((item: IOtherCharge, index) => (
              <OtherChargeListItem data={item} index={index} onDelete={handleDeleteItem} />
            ))}
          </View>
        </>
      ) : null}
    </>
  );
};

export default OtherChargeView;
