import React, {useReducer, useState} from 'react';
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
import {
  initialState,
  carConditionReducer,
  CARCONDITION_FORM_ACTION,
} from './carConditionReducer'
import { formatDate } from '../../../../../utils/formatter';

interface ICarConditionViewProps {
  //
}

const CarConditionView: React.FC<ICarConditionViewProps> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [reducerState, dispatch] = useReducer(carConditionReducer,initialState)
  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;
  const handleReceiptDate = (date: Date) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };
  const handleTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: item.label,
    // });
  };
  const handleReceiptNoInputTextChange = (text: string) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.COMPANY_NAME,
    //   payload: text,
    // });
  };
  const handleCarConditionNo = (text: string) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.CARCONDITION_NO,
      payload: text,
    });
  };

  
  const handleChooseTemplate = (item: TDropdownItem) => {
    //  dispatch({
    //   type: CARCONDITION_FORM_ACTION.CHOOSE_TEMPLATE,
    //   payload: item.label,
    //  });
  };

  const handleCarConditionDate = (date: Date) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.DATE_OF_CARCONDITION,
      payload: formatDate(date),
    });
  };
  const handleCnBiltyLrNO = (text: string) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.CN_BILTY_LR_NO,
      payload: text,
    });
  };
   
  const handleManufacturer = (item: TDropdownItem) => {
    dispatch({
     type: CARCONDITION_FORM_ACTION.MANUFACTURER,
     payload: item.label,
    });
 };
  const handleModel = (item: TDropdownItem) => {
    dispatch({
     type: CARCONDITION_FORM_ACTION.MODEL,
     payload: item.label,
    });
 };
  const handleColor = (item: TDropdownItem) => {
    dispatch({
     type: CARCONDITION_FORM_ACTION.COLOR,
     payload: item.label,
    });
 };
  const handleYear = (item: TDropdownItem) => {
    dispatch({
     type: CARCONDITION_FORM_ACTION.YEAR,
     payload: item.label,
    });
 };
 const handleVehicleRegNO = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.VEHICLE_REG_NO,
    payload: text,
  });
};
 const handleVehicleKm = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.VEHICLE_KM,
    payload: text,
  });
};
 const handleInsuranceCompany = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.INSURANCE_COMPANY_NAME,
    payload: text,
  });
};
 const handlePolicyNo = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.INSURANCE_POLICY_NO,
    payload: text,
  });
};
 const handleVehicleValue = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.VEHICLE_VALUE,
    payload: text,
  });
};
 const handleChasisNo = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.CHASIS_NO,
    payload: text,
  });
};
 const handleEngineNo = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.ENGINE_NO,
    payload: text,
  });
};
 const handleBatteryNo = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.BATTERY_NO,
    payload: text,
  });
};
 const handleTyreyNo = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.TYRE_NO,
    payload: text,
  });
};
 const handleAnyOtherAccessories = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.ANY_OTHER_ACCESSORIES,
    payload: text,
  });
};
 const handleRemark = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.REMARK,
    payload: text,
  });
};
 const handleScratches = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.SCARATCHES,
    payload: text,
  });
};
 const handleDent = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.DENT,
    payload: text,
  });
};
 const handleAnyOtherObservation = (text: string) => {
  dispatch({
    type: CARCONDITION_FORM_ACTION.ANY_OTHER_OBSERVATION,
    payload: text,
  });
};

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="VEHCILE DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Car Condition No." style={styles.label} />
                <Input
                onChangeText={handleReceiptNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Car Condition" style={styles.label} />
                <DatePickerComponent onDateSelect={handleCarConditionDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="CN / Bilty / LR No." style={styles.label} />
              <Input
                onChangeText={handleCnBiltyLrNO}
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
                  onSelect={handleManufacturer}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Model" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleModel}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Color" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleColor}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Year" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleYear}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Reg. No." style={styles.label} />
                <Input
                  onChangeText={handleVehicleRegNO}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle KM" style={styles.label} />
                <Input
                  onChangeText={handleVehicleKm}
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
                onChangeText={handleInsuranceCompany}
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
                  onChangeText={handleVehicleValue}
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
                onChangeText={handleChasisNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Engine No." style={styles.label} />
              <Input
                onChangeText={handleEngineNo}
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
                  onChangeText={handleBatteryNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Tyre No." style={styles.label} />
                <Input
                  onChangeText={handleTyreyNo}
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
                onChangeText={handleAnyOtherAccessories}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Remark" style={styles.label} />
              <Input
                onChangeText={handleRemark}
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
                onChangeText={handleScratches}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Dent" style={styles.label} />
              <Input
                onChangeText={handleDent}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Any Other Observation" style={styles.label} />
              <Input
                onChangeText={handleAnyOtherObservation}
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
