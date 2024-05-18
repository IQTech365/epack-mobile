import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import DropdownComponent, {
  IDropdownHandler,
} from '../../../../../../../common/DropdownComponent';
import Input, { InputMethods } from '../../../../../../../common/Input';
import DropdownWithTextInput from '../../../../../../../common/DropdownWithTextInput';
import Button from '../../../../../../../common/Button';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_WHITE,
} from '../../../../../../../utils/colors';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hooks';
import {
  getVehicleColorRequest,
  getVehicleCompanyRequest,
  getVehicleInsuranceCompanyRequest,
  getVehicleModelsRequest,
  getVehicleTypesRequest,
} from '../../../../../../../redux/slices/CommonSlice';
import {
  getVehicleColorList,
  getVehicleCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
} from '../../../CarConditionFormView/utils';
import {IVehicleBilty} from '../../biltyReducer2';
import { useBiltyFormContextHook } from '../../../../../../../provider/BiltyFormContextProvider';

interface Props {}

const VehicleInfo: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const {
    setVehicleInfo
  } = useBiltyFormContextHook();
  const [vehicleType, setVehicleType] = useState<TDropdownItem>();
  const [vehicleCompany, setVehicleCompany] = useState<TDropdownItem>();
  const [vehicleModel, setVehicleModel] = useState<TDropdownItem>();
  const [vehicleColor, setVehicleColor] = useState<TDropdownItem>();
  const [registrationNo, setRegistrationNo] = useState<string>('');
  const [engineNo, setEngineNo] = useState<string>('');
  const [chasisNo, setChasisNo] = useState<string>('');
  const [vehicleStatus, setVehicleStatus] = useState<string>('');
  const [vehicleValue, setVehicleValue] = useState<string>('');
  const [vehicleInfoList, setVehicleInfoList] = useState<IVehicleBilty[]>([]);

  const vehicleTypeDropRef = useRef<IDropdownHandler>(null);
  const vehicleManufactureDropRef = useRef<IDropdownHandler>(null);
  const vehicleModelDropRef = useRef<IDropdownHandler>(null);
  const vehicleColorDropRef = useRef<IDropdownHandler>(null);
  const registrationNoRef = useRef<InputMethods>(null);
  const chassisNoRef = useRef<InputMethods>(null);
  const engineNoRef = useRef<InputMethods>(null);
  const vehicleValueNoRef = useRef<InputMethods>(null);

  const {vehicleTypes, vehicleCompanies, vehicleColors, vehicleModels} =
    useAppSelector(state => state.Common);

  const handleAddVehicleInfo = () => {
    const copy = [...vehicleInfoList];
    if(vehicleType && vehicleCompany && vehicleModel && vehicleColor && registrationNo && engineNo && chasisNo && vehicleStatus && vehicleStatus) {
        const vehicle: IVehicleBilty = {
            vehicle_type: vehicleType?.label as string,
            vehicle_company: vehicleCompany?.label as string,
            vehicle_model: vehicleModel?.label as string,
            vehicle_color: vehicleColor?.label as string,
            registration_no: registrationNo,
            engine_no: engineNo,
            chassis_no: chasisNo,
            vechile_status: vehicleStatus,
            vehicle_value: vehicleValue,
          };
          copy.push(vehicle);
          setVehicleInfoList(copy);
          setVehicleInfo(copy);
          clearInputs();
    }
  };

  const disable = vehicleType && vehicleCompany && vehicleModel && vehicleColor && registrationNo && engineNo && chasisNo && vehicleStatus && vehicleStatus;

  const clearInputs = () => {
    setVehicleType(undefined);
    setVehicleCompany(undefined);
    setVehicleModel(undefined);
    setVehicleColor(undefined);
    setRegistrationNo('');
    registrationNoRef.current?.setValue('');
    setChasisNo('');
    chassisNoRef.current?.setValue('');
    setEngineNo('');
    engineNoRef.current?.setValue('');
    setVehicleValue('');
    vehicleValueNoRef.current?.setValue('');
    setVehicleStatus('');

  }

  useEffect(() => {
    dispatch(getVehicleInsuranceCompanyRequest());
    dispatch(getVehicleTypesRequest());
    dispatch(getVehicleCompanyRequest());
    dispatch(getVehicleColorRequest());
    dispatch(getVehicleModelsRequest());
  }, []);

  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <View style={styles.itemContainer}>
          <Label text="Vehicle Type" style={styles.label} />
          <DropdownComponent
            data={getVehicleTypeList(vehicleTypes)}
            onSelect={(item: TDropdownItem) => {
              setVehicleType(item);
            }}
            ref={vehicleTypeDropRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Vehicle Manufacture" style={styles.label} />
          <DropdownComponent
            data={getVehicleCompanyList(
              vehicleType?.value as string,
              vehicleCompanies,
            )}
            onSelect={(item: TDropdownItem) => {
              setVehicleCompany(item);
            }}
            ref={vehicleManufactureDropRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Vehicle Modal" style={styles.label} />
          <DropdownComponent
            data={getVehicleModelList(
              vehicleCompany?.value as string,
              vehicleModels,
            )}
            onSelect={(item: TDropdownItem) => {
              setVehicleModel(item);
            }}
            ref={vehicleModelDropRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Vehicle Color" style={styles.label} />
          <DropdownComponent
            data={getVehicleColorList(vehicleColors)}
            onSelect={(item: TDropdownItem) => {
              setVehicleColor(item);
            }}
            ref={vehicleColorDropRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Registration No." style={styles.label} />
          <Input
            onChangeText={setRegistrationNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={registrationNoRef}
            inputType="numeric"
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Engine No." style={styles.label} />
          <Input
            onChangeText={setEngineNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={engineNoRef}
            inputType="numeric"
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Chassis No." style={styles.label} />
          <Input
            onChangeText={setChasisNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={chassisNoRef}
            inputType="numeric"
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="Vehicle Value" style={styles.label} />
          <Input
            onChangeText={setVehicleValue}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={vehicleValueNoRef}
            inputType="numeric"
          />
        </View>
        <View style={styles.fullWidhCompContainer}>
          <Label text=" Vehicle Status - New/Used/Other" style={styles.label} />
          <DropdownWithTextInput
            options={['New Car', 'Used Car']}
            onSelect={(item: string) => {
              setVehicleStatus(item);
            }}
          />
        </View>
      </View>
      <Spacer height={12} />
      <Button
        text="ADD"
        onPress={handleAddVehicleInfo}
        disabled={!disable}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      {vehicleInfoList.map((vi: IVehicleBilty) => {
        return (
          <View style={styles.listWrapper}>
              <Text style={styles.label2}>V. Type: <Text style={styles.text2}>{vi.vehicle_type}</Text></Text>
              <Text style={styles.label2}>Company: <Text style={styles.text2}>{vi.vehicle_company}</Text></Text>
              <Text style={styles.label2}>V. Model: <Text style={styles.text2}>{vi.vehicle_model}</Text></Text>
              <Text style={styles.label2}>V. Color: <Text style={styles.text2}>{vi.vehicle_color}</Text></Text>
              <Text style={styles.label2}>Chasis No: <Text style={styles.text2}>{vi.chassis_no}</Text></Text>
              <Text style={styles.label2}>Registration No: <Text style={styles.text2}>{vi.registration_no}</Text></Text>
              <Text style={styles.label2}>Engine No: <Text style={styles.text2}>{vi.engine_no}</Text></Text>
              <Text style={styles.label2}>V. Status: <Text style={styles.text2}>{vi.vechile_status}</Text></Text>
              <Text style={styles.label2}>V. Value: <Text style={styles.text2}>{vi.vehicle_value}/-</Text></Text>
          </View>
        );
      })}
    </>
  );
};

export default VehicleInfo;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  elementContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: width * 0.44,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
  },
  fullWidhCompContainer: {
    width: width * 0.88,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  textStyle: {
    color: COLOR_WHITE,
  },
  previewButtonStyle: {
    backgroundColor: COLOR_BLUE,
    borderRadius: 5,
  },
  listWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_GRAY2,
    marginVertical: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  listItemContainer: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label2: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Medium'
  },
  text2: {
    color: COLOR_BLACK,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular'
  }
});
