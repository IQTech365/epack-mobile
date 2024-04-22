import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input, { InputMethods } from '../../../../../../../common/Input';
import DropdownComponent, { IDropdownHandler } from '../../../../../../../common/DropdownComponent';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {payTypeOptions} from '../MaterialDetails/utils';
import packingOptions from '../../../../../../../data/packingOptions.json';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import { IBilty } from '../../../../../../../interface/order/IGetBiltyListResponse';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface IProps {
  item?:IBilty;
  isEdit?:boolean;
}

const FreightDetails: React.FC<IProps> = ({item, isEdit}) => {

  const freightInputRef = useRef<InputMethods>(null);
  const pickupDropCompRef = useRef<IDropdownHandler>(null);
  const pickupInputRef = useRef<InputMethods>(null);
  const doorDeliveryDropCompRef = useRef<IDropdownHandler>(null);
  const doorDeliveryInputRef = useRef<InputMethods>(null);
  const packingDropCompRef = useRef<IDropdownHandler>(null);
  const packingInputRef = useRef<InputMethods>(null);
  const packingMaterialDropCompRef = useRef<IDropdownHandler>(null);
  const packingMaterialInputRef = useRef<InputMethods>(null);
  const unPackingDropCompRef = useRef<IDropdownHandler>(null);
  const unPackingInputRef = useRef<InputMethods>(null);
  const loadingDropCompRef = useRef<IDropdownHandler>(null);
  const loadingInputRef = useRef<InputMethods>(null);
  const unloadingDropCompRef = useRef<IDropdownHandler>(null);
  const unloadingInputRef = useRef<InputMethods>(null);
  const advanceAmountInputRef = useRef<InputMethods>(null);
  const balanceAmountInputRef = useRef<InputMethods>(null);
  const remarksAtPODRef = useRef<InputMethods>(null);
  const remarksAtLoadingRef = useRef<InputMethods>(null)



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
    setRemark,
    setRemarksAtPOD
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
    if(isEdit && item) {
      setFreightType(item.freightDetails.billingStatus);
      freightInputRef.current?.setValue(item.freightDetails.freightCharges);
      setFreightCharge(item.freightDetails.freightCharges)
      if(item.pickupCharges.status) {
        setPickupChargeAmount(item.pickupCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.pickupCharges.status) as TDropdownItem;
        if(pickupOption) {
          pickupDropCompRef.current?.setDefaultValue(pickupOption);
          setPickupCharge(item.pickupCharges.status);
        }
      }
      if(item.doorDeliveryCharges.status) {
        setDoorDeliveryChargeAmount(item.doorDeliveryCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.doorDeliveryCharges.status) as TDropdownItem;
        if(pickupOption) {
          doorDeliveryDropCompRef.current?.setDefaultValue(pickupOption);
          setDoorDeliveryCharge(item.doorDeliveryCharges.status);
        }
      }

      if(item.packingCharges.status) {
        setPackingChargeAmount(item.packingCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.packingCharges.status) as TDropdownItem;
        if(pickupOption) {
          packingDropCompRef.current?.setDefaultValue(pickupOption);
          setPackingCharge(item.doorDeliveryCharges.status);
        }
      }

      if(item.packingMaterialCharges.status) {
        setPackingMaterialChargeAmount(item.packingMaterialCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.packingMaterialCharges.status) as TDropdownItem;
        if(pickupOption) {
          packingMaterialDropCompRef.current?.setDefaultValue(pickupOption);
          setPackingMaterialCharge(item.doorDeliveryCharges.status);
        }
      }


      if(item.packingMaterialCharges.status) {
        setPackingMaterialChargeAmount(item.packingMaterialCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.packingMaterialCharges.status) as TDropdownItem;
        if(pickupOption) {
          packingMaterialDropCompRef.current?.setDefaultValue(pickupOption);
          setPackingMaterialCharge(item.doorDeliveryCharges.status);
        }
      }

      if(item.unPackingCharges.status) {
        setUnpackingChargeAmount(item.unPackingCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.unPackingCharges.status) as TDropdownItem;
        if(pickupOption) {
          unPackingDropCompRef.current?.setDefaultValue(pickupOption);
          setUnpackingCharge(item.doorDeliveryCharges.status);
        }
      }

      if(item.loadingCharges.status) {
        setLoadingChargeAmount(item.loadingCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.loadingCharges.status) as TDropdownItem;
        if(pickupOption) {
          loadingDropCompRef.current?.setDefaultValue(pickupOption);
          setLoadingCharge(item.doorDeliveryCharges.status);
        }
      }
      if(item.unLoadingCharges.status) {
        setUnloadingChargeAmount(item.unLoadingCharges.charge);
        const pickupOption:TDropdownItem = packingOptions.find((d:TDropdownItem) => d.label === item.unLoadingCharges.status) as TDropdownItem;
        if(pickupOption) {
          unloadingDropCompRef.current?.setDefaultValue(pickupOption);
          setUnloadingCharge(item.doorDeliveryCharges.status);
        }
      }
      advanceAmountInputRef.current?.setValue(item.freightDetails.advanceAmount);
      setAdvanceAmount(item.freightDetails.advanceAmount)
      balanceAmountInputRef.current?.setValue(item.freightDetails.balanceAmount);
      setBalanceAmount(item.freightDetails.balanceAmount);
      remarksAtLoadingRef.current?.setValue(item.remarks);
      remarksAtPODRef.current?.setValue(item.remarksAtPOD);
    }
  }, [isEdit, item]);

  useEffect(() => {
    calculateBalanceAmount();
  }, [state.advance_amount]);

  return (
    <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer}>
          {payTypeOptions.map((option: string, index: number) => (
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
                setFreightType(option);
              }}
              isChecked={state.freight_type == option}
              disableBuiltInState={true}
            />
          ))}
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
            ref={freightInputRef}
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
              ref={pickupDropCompRef}
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
              ref={pickupInputRef}
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
              ref={doorDeliveryDropCompRef}
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
              ref={doorDeliveryInputRef}
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
              ref={packingDropCompRef}
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
              editable={state.packing_charge == 'Additional from Freight'}
              ref={packingInputRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Packing Mat. Charges" style={styles.label} />
            <DropdownComponent
              data={packingOptions}
              onSelect={(item: TDropdownItem) => {
                setPackingMaterialCharge(item.label);
              }}
              ref={packingMaterialDropCompRef}
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
              ref={packingMaterialInputRef}
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
              ref={unPackingDropCompRef}
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
              ref={unPackingInputRef}
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
              ref={loadingDropCompRef}
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
              ref={loadingInputRef}
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
              ref={unloadingDropCompRef}
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
              ref={unloadingInputRef}
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
              value={state.advance_amount}
              ref={advanceAmountInputRef}
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
              ref={balanceAmountInputRef}
            />
          </View>
          <Spacer height={12} />
          <View style={styles.elementContainer2}>
            <Label text="Remark at Loading" style={styles.label} />
            <Input
              onChangeText={setRemark}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={state.remark}
              ref={remarksAtLoadingRef}
            />
          </View>
          <View style={styles.elementContainer2}>
            <Label text="Remark at POD" style={styles.label} />
            <Input
              onChangeText={setRemarksAtPOD}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={state.remarksAtPOD}
              selectionColor={COLOR_BLACK}
              ref={remarksAtPODRef}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default FreightDetails;
