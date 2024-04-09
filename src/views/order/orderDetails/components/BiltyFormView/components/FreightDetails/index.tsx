import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {payTypeOptions} from '../MaterialDetails/utils';
import packingOptions from '../../../../../../../data/packingOptions.json';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
const FreightDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setBalanceAmount,
    setFreightType,
    setFreightCharge,
    setPickupCharge,
    setPickupChargeAmount,
    setDoorDeliveryCharge,
    setDoorDeliveryChargeAmount,
    setPackingCharge,
    setPackingChargeAmount,
    setPackingMaterialCharge,
    setPackingMaterialChargeAmount,
    setUnpackingCharge,
    setUnpackingChargeAmount,
    setLoadingCharge,
    setLoadingChargeAmount,
    setUnloadingCharge,
    setUnloadingChargeAmount,
    setAdvanceAmount,
    setTotalAmount,
  } = useBiltyFormContextHook();

  const calculateMaterialTotalAmount = () => {
    const {
      freight_charge,
      pickup_charge_amount,
      packing_charge_amount,
      door_delivery_charge_amount,
      packing_material_charge_amount,
      unpacking_charge_amount,
      loading_charge_amount,
      unloading_charge_amount,
    } = state;
    let totalAmount = 0;

    if (freight_charge) {
      totalAmount += parseInt(freight_charge);
    }
    if (pickup_charge_amount) {
      totalAmount += parseInt(pickup_charge_amount);
    }
    if (packing_charge_amount) {
      totalAmount += parseInt(packing_charge_amount);
    }
    if (door_delivery_charge_amount) {
      totalAmount += parseInt(door_delivery_charge_amount);
    }
    if (packing_material_charge_amount) {
      totalAmount += parseInt(packing_material_charge_amount);
    }
    if (unpacking_charge_amount) {
      totalAmount += parseInt(unpacking_charge_amount);
    }
    if (loading_charge_amount) {
      totalAmount += parseInt(loading_charge_amount);
    }
    if (unloading_charge_amount) {
      totalAmount += parseInt(unloading_charge_amount);
    }
    return totalAmount;
  };

  const calculateBalanceAmount = () => {
    const totalAmount = calculateMaterialTotalAmount();
    const {advance_amount} = state;
    if (advance_amount) {
      const balanceAmount = totalAmount - parseInt(advance_amount);
      setBalanceAmount(`${balanceAmount}`);
    } else {
      setBalanceAmount(`${calculateMaterialTotalAmount()}`);
    }
  };

  useEffect(() => {
    calculateBalanceAmount();
  }, [state.advance_amount]);

  return (
    <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer}>
          <BouncyCheckboxGroup
            data={payTypeOptions}
            onChange={(selectedItem: ICheckboxButton) => {
              setFreightType(selectedItem.text as string);
            }}
          />
        </View>
        <Spacer height={12} />
        <View style={styles.elementContainer2}>
          <Label text="Freight Charges" style={styles.label} />
          <Input
            onChangeText={setFreightCharge}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            value={state.freight_charge}
            selectionColor={COLOR_BLACK}
            inputType="numeric"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Pickup Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setPickupCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setPickupChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.pickup_charge_amount}
              editable={state.pickup_charge == 'Additional from Freight'}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Door Delivery Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setDoorDeliveryCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setDoorDeliveryChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.door_delivery_charge_amount}
              editable={state.door_delivery_charge == 'Additional from Freight'}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Packing Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setPackingCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setPackingChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.packing_charge_amount}
              editable={
                state.packing_charge_amount == 'Additional from Freight'
              }
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Packing Material Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setPackingMaterialCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setPackingMaterialChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.packing_material_charge_amount}
              editable={
                state.packing_material_charge == 'Additional from Freight'
              }
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Unpacking Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setUnpackingCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setUnpackingChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.unpacking_charge_amount}
              editable={state.unpacking_charge == 'Additional from Freight'}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Loading Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setLoadingCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setLoadingChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.loading_charge_amount}
              editable={state.loading_charge == 'Additional from Freight'}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Unloading Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setUnloadingCharge(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              onChangeText={setUnloadingChargeAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              value={state.unloading_charge_amount}
              editable={state.unloading_charge == 'Additional from Freight'}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label
            text={`Total Amount = ${calculateMaterialTotalAmount()}.00 /-`}
            style={styles.label2}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Advance Amount" style={styles.label} />
            <Input
              onChangeText={setAdvanceAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Balance Amount" style={styles.label} />
            <Input
              onChangeText={setBalanceAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={state.balance_amount}
              editable={false}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default FreightDetails;
