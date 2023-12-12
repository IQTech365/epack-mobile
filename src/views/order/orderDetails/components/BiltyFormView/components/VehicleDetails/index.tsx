import React from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {formatDate4} from '../../../../../../../utils/formatter';
import vehicleTypeOptions from '../../../../../../../data/vehicleTypeOptions.json';

const VehicleDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setInvoiceNo,
    setVehicleType,
    setVehicleNo,
    setFromLocation,
    setToLocation,
    setDriverName,
    setDriverMobileNo,
    setDriverLicenseNo,
    setSealNo,
    setInDate,
    setOutDate,
  } = useBiltyFormContextHook();

  return (
    <CollapsibleView title="VEHICLE DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer2}>
          <Label text="Invoice No." style={styles.label} />
          <Input
            onChangeText={setInvoiceNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Vehicle Type" style={styles.label} />
            <DropdownComponent
              data={vehicleTypeOptions}
              onSelect={(item: TDropdownItem) => {
                setVehicleType(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Vehicle No." style={styles.label} />
            <Input
              onChangeText={setVehicleNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="From Location" style={styles.label} />
            <Input
              onChangeText={setFromLocation}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="To Location" style={styles.label} />
            <Input
              onChangeText={setToLocation}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Driver Name" style={styles.label} />
          <Input
            onChangeText={setDriverName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Driver Mobile No." style={styles.label} />
            <Input
              onChangeText={setDriverMobileNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Driver Licence No." style={styles.label} />
            <Input
              onChangeText={setDriverLicenseNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Seal No." style={styles.label} />
          <Input
            onChangeText={setSealNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="In Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setInDate(formatDate4(date));
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Out Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setOutDate(formatDate4(date));
              }}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default VehicleDetails;
