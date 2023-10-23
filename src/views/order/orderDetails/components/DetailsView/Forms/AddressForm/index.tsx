import React from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../../../common/AvoidSoftInputViewHOC';
import Input from '../../../../../../../common/Input';
import Label from '../../../../../../../common/Label';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import styles from './style';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import Spacer from '../../../../../../../common/Spacer';
import Button from '../../../../../../../common/Button';
import { MODULE_NAME } from '../../enum/EModuleName';

export enum ADDRESS_TYPE {
  PICKUP, DROP,
}

interface IAddressFormProps {
  addressType: ADDRESS_TYPE;
  moduleName: MODULE_NAME;
}

const AddressForm: React.FC<IAddressFormProps> = ({addressType, moduleName}) => {
  const handleShiftingType = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.SHIFTING_TYPE,
    //   payload: item.label,
    // });
  };

  const handleDateOfMoving = (date: Date) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DATE_OF_MOVING,
    //   payload: formatDate4(date),
    // });
  };

  const handleUpdate = () => {};

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Pincode" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="City" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Landmark" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Locality" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Current Floor" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Lift Status" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={20} />
        <Button
          text="UPDATE"
          onPress={handleUpdate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddressForm;
