import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../../../common/Label';
import Input from '../../../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../../../utils/colors';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import PlusIcon from '../../../../../../../../../images/icons/plus_icon.svg';
import {IOtherCharge} from '../../../../InvoiceReducer2';
import Button from '../../../../../../../../../common/Button';
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
    const item:IOtherCharge = {
      particular_name: particularName,
      quantity: quantity,
      rate_per_item: ratePerItem,
      amount: amount,
      hsn_code: hsnCode,
    }
    const clone = [...otherItems];
    clone.push(item);
    setOtherItems(clone);
    setOtherCharges(clone);
    resetInputCompAndState();
  }

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
                //@ts-ignore
                ref={amountCompRef}
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
    </View>
  );
};

export default FreightOtherChargesView;
