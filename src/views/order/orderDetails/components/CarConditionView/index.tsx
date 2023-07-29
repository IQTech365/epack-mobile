import React, {useState} from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import {Switch} from 'react-native-switch';
import AccessoryView from '../AccessoryView';
import accessories from '../../../../../data/accessories.json';

interface ICarConditionViewProps {
  //
}

const CarConditionView: React.FC<ICarConditionViewProps> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;
  const handleReceiptDate = (date: Date) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };

  const handleReceiptNoInputTextChange = (text: string) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.COMPANY_NAME,
    //   payload: text,
    // });
  };

  const handleTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: item.label,
    // });
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="VEHCILE DETAILS" collapsed={false}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Car Condition No." style={styles.label} />
            </View>
            <View style={[styles.elementContainer, styles.switchMainWrapper3]}>
              <View style={[styles.itemContainer, {alignItems: 'center'}]}>
                <Switch
                  containerStyle={styles.switchStyle}
                  value={switchState}
                  onValueChange={val => setSwitchState(val)}
                  disabled={false}
                  activeText={'Auto'}
                  inActiveText={'Manual'}
                  outerCircleStyle={styles.outerCircleStyle}
                  renderActiveText={true}
                  renderInActiveText={true}
                  switchWidthMultiplier={3.5}
                />
              </View>
              <View style={[styles.itemContainer, switchWrapperStyle]}>
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.switchInputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  editable={!switchState}
                />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Choose Template" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Car Condition" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="CN / Bilty / LR No." style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Manufacturer" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Model" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Color" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Year" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Reg. No." style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle KM" style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Insurance Company Name" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Insurance Policy No." style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Value" style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Chasis No." style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Engine No." style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="ACCESSORIES DETAILS" collapsed={false}>
          <View>
            {accessories.map((accessory, index) => {
              return (
                <View key={index}>
                  <AccessoryView
                    label={accessory.label}
                    onYesPress={() => {}}
                    onNoPress={() => {}}
                  />
                  <Spacer height={8} />
                </View>
              );
            })}
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Battery No." style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Tyre No." style={styles.label} />
                <Input
                  onChangeText={handleReceiptNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Any Other Accessories" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Remark" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="DENT/SCRATCHES DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Scratches" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Dent" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Any Other Observation" style={styles.label} />
              <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default CarConditionView;
