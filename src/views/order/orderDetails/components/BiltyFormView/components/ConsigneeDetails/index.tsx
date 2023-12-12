import React, { useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';

const ConsigneeDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setDeliveryAddress,
    setDeliveryPincode,
    setDeliveryState,
    setDeliveryCity,
    setConsigneeName,
    setConsigneeGst,
    setConsigneeMobileNo,
    setConsigneeAddress,
    setConsigneePincode,
    setConsigneeState,
    setConsigneeCity,
    setIsDeliveryAddressSameAsConsignee,
  } = useBiltyFormContextHook();

  const stateDropdwonCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const deliveryStateDropdwonCompRef = useRef(null);
  const deliveryCityDropdownCompRef = useRef(null);

  const renderDeliveryAddressView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setDeliveryAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={setDeliveryPincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select State'}
              hanldeData={setDeliveryState}
              //@ts-ignore
              ref={deliveryStateDropdwonCompRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select City'}
              hanldeData={setDeliveryCity}
              //@ts-ignore
              ref={deliveryCityDropdownCompRef}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <CollapsibleView title="CONSIGNEE DETAILS" collapsed={true}>
      <View>
      <View style={styles.elementContainer}>
          <BouncyCheckbox
            size={25}
            fillColor={COLOR_BLUE}
            unfillColor="#FFFFFF"
            text="Consignee Address same as Client"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
                setIsDeliveryAddressSameAsConsignee(!state.consignee_address_same_as_client);
            }}
            isChecked={state.consignee_address_same_as_client}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Consignee Name" style={styles.label} />
          <Input
            onChangeText={setConsigneeName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Consignee GST" style={styles.label} />
            <Input
              onChangeText={setConsigneeGst}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Consignee Mobile No." style={styles.label} />
            <Input
              onChangeText={setConsigneeMobileNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setConsigneeAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={setConsigneePincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select State'}
              hanldeData={setConsigneeState}
              //@ts-ignore
              ref={stateDropdwonCompRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select City'}
              hanldeData={setConsigneeCity}
              //@ts-ignore
              ref={cityDropdownCompRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Delivery Address" style={styles.label2} />
        </View>
        <View style={styles.elementContainer}>
          <BouncyCheckbox
            size={25}
            fillColor={COLOR_BLUE}
            unfillColor="#FFFFFF"
            text="Same as Consignee Address"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
                setIsDeliveryAddressSameAsConsignee(!state.delivery_address_same_as_consignee);
            }}
            isChecked={state.delivery_address_same_as_consignee}
            disableBuiltInState={true}
          />
        </View>
        {!state.delivery_address_same_as_consignee ? renderDeliveryAddressView() : null}
      </View>
    </CollapsibleView>
  );
};

export default ConsigneeDetails;
