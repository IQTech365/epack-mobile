import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Input from '../../../../../../../../../common/Input';
import {
  COLOR_BLACK,
  COLOR_GRAY4,
} from '../../../../../../../../../utils/colors';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import PlusIcon from '../../../../../../../../../images/icons/plus_icon.svg';
import {IOtherCharge} from '../../../../InvoiceReducer2';
import Button from '../../../../../../../../../common/Button';
import OtherChargeItem from './OtherChargeItem';
interface Props {}

const FreightOtherChargesView: React.FC<Props> = ({}) => {
  const {setOtherCharges} = useInvoiceFormContextHook();
  const [shouldAdd, setShouldAdd] = useState<boolean>(false);
  const [otherItems, setOtherItems] = useState<IOtherCharge[]>([]);
  const [particularName, setParticularName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [ratePerItem, setRatePerItem] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [hsnCode, setHsnCode] = useState<string>('');

  const particularNameCompRef = useRef(null);
  const quantityCompRef = useRef(null);
  const ratePerItemCompRef = useRef(null);
  const amountCompRef = useRef(null);
  const hsnCodeCompRef = useRef(null);

  const resetInputCompAndState = () => {
    if (
      particularNameCompRef &&
      quantityCompRef &&
      ratePerItemCompRef &&
      amountCompRef &&
      hsnCodeCompRef
    ) {
      //@ts-ignore
      particularNameCompRef?.current.reset();
      setParticularName('');
      //@ts-ignore
      quantityCompRef?.current.reset();
      setQuantity('');
      //@ts-ignore
      ratePerItemCompRef?.current.reset();
      setRatePerItem('');
      //@ts-ignore
      amountCompRef?.current.reset();
      setAmount('');
      //@ts-ignore
      hsnCodeCompRef?.current.reset();
      setHsnCode('');
    }
  };

  const toggleShouldAddItem = () => {
    setShouldAdd(!shouldAdd);
  };

  const handleAddItemClick = () => {
    const item: IOtherCharge = {
      particular_name: particularName,
      quantity: quantity,
      rate_per_item: ratePerItem,
      amount: amount,
      hsn_code: hsnCode,
    };
    const clone = [...otherItems];
    clone.push(item);
    setOtherItems(clone);
    setOtherCharges(clone);
    resetInputCompAndState();
  };

  const onDelete = (index: number) => {
    const clone = [...otherItems];
    clone.splice(index, 1);
    setOtherItems(clone);
    setOtherCharges(clone);
  };

  useEffect(() => {
    if(quantity && ratePerItem) {
      const quantityInt = parseInt(quantity);
      const rateInt = parseInt(ratePerItem);
      const totalPrice = quantityInt * rateInt;
      setAmount(totalPrice.toString());
    }
  }, [quantity, ratePerItem]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.fullWidhCompContainer2}>
        <Label text="OTHER CHARGES" style={styles.label2} />
        <Spacer width={10} />
        <TouchableOpacity onPress={toggleShouldAddItem}>
          <PlusIcon width={30} height={30} />
        </TouchableOpacity>
      </View>
      {shouldAdd ? (
        <>
          <View style={styles.fullWidhCompContainer}>
            <Label text="Particulars Name" style={styles.label} />
            <Input
              onChangeText={setParticularName}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter particular name"
              placeholderTextColor={COLOR_GRAY4}
              //@ts-ignore
              ref={particularNameCompRef}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.compContainer}>
              <Label text="Quantity" style={styles.label} />
              <Input
                onChangeText={setQuantity}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //@ts-ignore
                ref={quantityCompRef}
                inputType="numeric"
                placeholder="Enter quantity"
                placeholderTextColor={COLOR_GRAY4}
              />
            </View>
            <Spacer width={8} />
            <View style={styles.compContainer}>
              <Label text="Rate Per Item" style={styles.label} />
              <Input
                onChangeText={setRatePerItem}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //@ts-ignore
                ref={ratePerItemCompRef}
                inputType="numeric"
                placeholder="Rate per item"
                placeholderTextColor={COLOR_GRAY4}
              />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.compContainer}>
              <Label text="Amount" style={styles.label} />
              <Input
                onChangeText={setAmount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={amount}
                //@ts-ignore
                ref={amountCompRef}
                inputType="numeric"
                placeholder="Enter amount"
                placeholderTextColor={COLOR_GRAY4}
              />
            </View>
            <Spacer width={8} />
            <View style={styles.compContainer}>
              <Label text="HSN Code" style={styles.label} />
              <Input
                onChangeText={setHsnCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                //@ts-ignore
                ref={hsnCodeCompRef}
                placeholder="Enter HSN code"
                placeholderTextColor={COLOR_GRAY4}
              />
            </View>
          </View>
          <Spacer width={8} />
          <View style={styles.fullWidhCompContainer}>
            <Button
              text="Add"
              onPress={handleAddItemClick}
              style={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
          </View>
        </>
      ) : null}
      <Spacer height={10} />
      {otherItems.map((d: IOtherCharge, index: number) => {
        return <OtherChargeItem item={d} index={index} onDelete={onDelete} />;
      })}
    </View>
  );
};

export default FreightOtherChargesView;
