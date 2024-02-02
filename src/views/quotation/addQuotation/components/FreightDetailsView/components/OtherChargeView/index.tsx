import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import Button from '../../../../../../../common/Button';
import PlusIcon from '../../../../../../../images/icons/plus_icon.svg';
import MinusIcon from '../../../../../../../images/icons/minus_red.svg';
import OtherChargeListItem from './OtherChargeListItem';
import {IOtherCharge} from '../../../../quotationReducer2';
import {Shadow} from 'react-native-shadow-2';
import { particularOptions } from '../utils';
import { ToastType, showToast } from '../../../../../../../utils/utility';
import * as SQuotation from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
import DropdownWithTextInput from '../../../../../../../common/DropdownWithTextInput';

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

  const [particularName, setParticularName] = useState<string>(particularOptions[0]);
  const [quantity, setQuantity] = useState<string>('');
  const [partLoadRatePerItem, setPartLoadRatePerItem] = useState<string>('');
  const [partLoadAmount, setPartLoadAmount] = useState<string>('');
  const [fullLoadRatePerItem, setFullLoadRatePerItem] = useState<string>('');
  const [fullLoadAmount, setFullLoadAmount] = useState<string>('');
  const [items, setItems] = useState<IOtherCharge[]>([]);
  const [isPartLoadAmountEditable, setIsPartLoadAmountEditable] = useState<boolean>(true);
  const [isFullLoadAmountEditable, setIsFullLoadAmountEditable] = useState<boolean>(true);

  const _calculatePartLoadAmount = () => {
    let amount:string = '0';
    if(quantity && partLoadRatePerItem) {
      amount = (parseInt(quantity) * parseInt(partLoadRatePerItem)).toString();
    } else {
      amount = partLoadAmount;
    }
    return amount;
  }

  const _calculateFullLoadAmount = () => {
    let amount:string = '0';
    if(quantity && fullLoadRatePerItem) {
      amount = (parseInt(quantity) * parseInt(fullLoadRatePerItem)).toString();
    } else {
      amount = fullLoadAmount;
    }
    return amount;
  }

  const handleAddItem = () => {
    if(!particularName) {
      return showToast('Please Select or Enter particular name', ToastType.ERROR);
    } else if(state.freight_part_load && state.freight_full_load) {
      if(!_calculatePartLoadAmount() && !_calculateFullLoadAmount()) {
        return showToast('Please enter Part & Full Load amount', ToastType.ERROR);
      } else if(!_calculatePartLoadAmount()) {
        return showToast('Please enter Full Load amount', ToastType.ERROR);
      } else if(!_calculateFullLoadAmount()) {
        return showToast('Please enter Full Load amount', ToastType.ERROR);
      }
    } else if(state.freight_part_load && !_calculatePartLoadAmount()) {
      return showToast('Please enter Part Load amount', ToastType.ERROR);
    } else if(state.freight_full_load && !_calculateFullLoadAmount()) {
      return showToast('Please enter Full Load amount', ToastType.ERROR);
    }
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
    if (particularsInputCompRef) {
      //@ts-ignore
      particularsInputCompRef?.current.setValue('');
      setParticularName('');
    }
    if (quantityInputCompRef) {
      //@ts-ignore
      quantityInputCompRef?.current.reset('');
      setQuantity('');
    }
    if (state.freight_part_load && partLoadRatePerItemInputCompRef) {
      //@ts-ignore
      partLoadRatePerItemInputCompRef?.current.reset('');
      setPartLoadRatePerItem('');
    }
    if (state.freight_part_load && partLoadAmountInputCompRef) {
      //@ts-ignore
      partLoadAmountInputCompRef?.current.reset('');
      setPartLoadAmount('');
    }
    if (state.freight_full_load && fullLoadRatePerItemInputCompRef) {
      //@ts-ignore
      fullLoadRatePerItemInputCompRef?.current.reset('');
      setFullLoadRatePerItem('');
    }
    if (state.freight_full_load && fullLoadAmountInputCompRef) {
      //@ts-ignore
      fullLoadAmountInputCompRef?.current.reset('');
      setFullLoadAmount('');
    }
  };

  useEffect(() => {
    if(!partLoadRatePerItem && state.freight_part_load && shouldAdd) {
        //@ts-ignore
        partLoadAmountInputCompRef && partLoadAmountInputCompRef?.current.reset('');
        setIsPartLoadAmountEditable(true);
        setPartLoadAmount('');
    } else if(partLoadRatePerItem && state.freight_part_load && shouldAdd) {
      setIsPartLoadAmountEditable(false);
    }
  }, [partLoadRatePerItem]);

  useEffect(() => {
    if(!fullLoadRatePerItem && state.freight_full_load && shouldAdd) {
        //@ts-ignore
        fullLoadAmountInputCompRef && fullLoadAmountInputCompRef?.current.reset('');
        setIsFullLoadAmountEditable(true);
        setFullLoadAmount('');
    } else if(fullLoadRatePerItem && state.freight_full_load && shouldAdd) {
      setIsFullLoadAmountEditable(false);
    }
  }, [fullLoadRatePerItem]);

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
                placeholder='Enter rate'
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
                value={_calculatePartLoadAmount()}
                placeholder='Enter amount'
                //@ts-ignore
                ref={partLoadAmountInputCompRef}
                inputType="numeric"
                editable={isPartLoadAmountEditable}
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
                placeholder='Enter rate'
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
                value={_calculateFullLoadAmount()}
                placeholder='Enter amount'
                //@ts-ignore
                ref={fullLoadAmountInputCompRef}
                inputType="numeric"
                editable={isFullLoadAmountEditable}
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

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:SQuotation.IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          const otherCharges:SQuotation.IOtherCharge[] = quotationfreight.otherCharges;
          if(otherCharges && otherCharges.length > 0) {
            let localOtherCharges:IOtherCharge[] = otherCharges?.map((d: SQuotation.IOtherCharge) => {
              const item:IOtherCharge = {
                particular_name: d.jobType,
                quantity: d.qty,
                part_load_rate_per_item: d.partLoad.ratePerItem,
                part_load_amount: d.partLoad.amount,
                full_load_rate_per_item: d.fullLoad.ratePerItem,
                full_load_amount: d.fullLoad.amount,
              }
              return item;
            });
            setOtherCharges(localOtherCharges);
            setItems(localOtherCharges);
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  return (
    <>
      <View style={styles.fullWidhCompContainer2}>
        <Label text="OTHER CHARGES" style={styles.label} />
        <Spacer width={10} />
        <TouchableOpacity
          onPress={toggleShouldAddItem}
          style={styles.iconContainer}>
          {shouldAdd ? (
            <MinusIcon width={25} height={25} />
          ) : (
            <PlusIcon width={30} height={30} />
          )}
        </TouchableOpacity>
      </View>
      {shouldAdd ? (
        <>
          <Shadow distance={1}>
            <View style={styles.contentContainer}>
              <View style={styles.fullWidthContainer}>
                <Label text="Particulars/Items" style={styles.label} />
                <DropdownWithTextInput
                  options={particularOptions}
                  onSelect={setParticularName}
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
                  placeholder={'Enter quantity'}
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
                <OtherChargeListItem
                  data={item}
                  index={index}
                  onDelete={handleDeleteItem}
                />
              ))}
            </View>
          </Shadow>
        </>
      ) : null}
    </>
  );
};

export default OtherChargeView;
