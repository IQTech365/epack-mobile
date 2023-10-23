import React from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../../../common/AvoidSoftInputViewHOC';
import Input from '../../../../../../../common/Input';
import Label from '../../../../../../../common/Label';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import styles from './style';
import shiftingTypeOptions from '../../../../../../../data/shiftingType.json';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import shiftingLuggageOptions from '../../../../../../../data/shiftingLuggage.json';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import Button from '../../../../../../../common/Button';
import { MODULE_NAME } from '../../enum/EModuleName';

interface IContactDetailFormProps {
  moduleName: MODULE_NAME
}

const ContactDetailForm: React.FC<IContactDetailFormProps> = ({moduleName}) => {
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
        {/* <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Company Name" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View> */}
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Contact Person" style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Email" style={styles.label} />
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
            <Label text="Landline" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Mobile" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        {/* <View style={styles.elementContainer3}>
          <Label text="GST No." style={styles.label} />
          <Input
            onChangeText={() => {}}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View> */}
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Order Amount" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Token Amount" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Alternate Mob. Numbers" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Spacer height={30} />
            <Button
              text="Add"
              onPress={handleUpdate}
              disabled={false}
              style={styles.addMoreContainer}
              textStyle={styles.addMoreText}
              variant='contain'
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

export default ContactDetailForm;
