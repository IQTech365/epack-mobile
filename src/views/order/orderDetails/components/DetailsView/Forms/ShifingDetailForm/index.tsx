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

interface IShiftingFormProps {
  moduleName: MODULE_NAME
}

const ShifingDetailForm: React.FC<IShiftingFormProps> = ({moduleName}) => {
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

  const handleUpdate = () => {

  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
      <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Shifting Type" style={styles.label} />
            {/* <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                /> */}
            <DropdownComponent
              data={shiftingTypeOptions}
              onSelect={handleShiftingType}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Date of Moving" style={styles.label} />
            <DatePickerComponent onDateSelect={handleDateOfMoving} />
          </View>
        </View>
        <View style={styles.elementContainer3}>
            <Label text="Carriage Vehicle" style={styles.label} />
            <Input
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
        </View>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Shifting Luggage" style={styles.label} />
        </View>
        <View style={styles.elementContainer2}>
          {shiftingLuggageOptions.map((item, index) => {
            return (
              <BouncyCheckbox
                key={item.value}
                size={25}
                unfillColor="#FFFFFF"
                text={item.label}
                fillColor={COLOR_BLUE}
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 16,
                  height: 16,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 16,
                  height: 16,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15, marginBottom: 10}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  //   handleShiftingLuggage(isChecked, item.label);
                }}
              />
            );
          })}
        </View>
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Date of Delivery" style={styles.label} />
            <DatePickerComponent onDateSelect={handleDateOfMoving} />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Date of Delivered" style={styles.label} />
            <DatePickerComponent onDateSelect={handleDateOfMoving} />
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

export default ShifingDetailForm;
