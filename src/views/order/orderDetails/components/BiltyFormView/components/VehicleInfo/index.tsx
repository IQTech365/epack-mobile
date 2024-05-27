import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import DropdownComponent, {
  IDropdownHandler,
} from '../../../../../../../common/DropdownComponent';
import Input, {InputMethods} from '../../../../../../../common/Input';
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
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import ModalHOC from '../../../../../../../common/ModalHOC';

interface Props {
  isEdit?: boolean;
  item?: IBilty;
  vehicleInfo?: IVehicleBilty;
  isSingleEdit?: boolean;
  setOpenEditModel: (value: boolean) => void;
}

const VehicleInfo: React.FC<Props> = ({isEdit, item, vehicleInfo,setOpenEditModel, isSingleEdit = false}) => {

  
  const dispatch = useAppDispatch();
  const {
    setVehicleInfo,
    setTypeOfMoving,
    setRiskType,
    setLiabilityOfTax,
    state,
  } = useBiltyFormContextHook();
  const [vehicleCompanyId, setVehicleCompanyId] = useState<string>('');
  const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
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
  const [editIndex, setEditIndex] = useState<number>(-1);

  

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
      if (
        vehicleType &&
        vehicleCompany &&
        vehicleModel &&
        vehicleColor &&
        registrationNo &&
        engineNo &&
        chasisNo &&
        vehicleStatus &&
        vehicleValue
      ) {
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
        const updatedVehicleInfoList = [...vehicleInfoList, vehicle];
        console.log(updatedVehicleInfoList,"updatedVehicleInfoList");
        
        setVehicleInfoList(updatedVehicleInfoList);
        setVehicleInfo(updatedVehicleInfoList);
        clearInputs();
      }
    };

  const handleUpdateVehicleInfo = () => {
    if (
      vehicleType ||
      vehicleCompany ||
      vehicleModel ||
      vehicleColor ||
      registrationNo ||
      engineNo ||
      chasisNo ||
      vehicleStatus ||
      vehicleValue
    ) {
      const updatedVehicle: IVehicleBilty = {
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

      console.log(updatedVehicle,"updatedVehicle123");
      

      const updatedVehicleInfoList = vehicleInfoList.map((v, index) =>
        index === editIndex ? updatedVehicle : v
      );

      console.log(vehicleInfoList,"updatedVehicleInfoList");
      
      setVehicleInfoList(updatedVehicleInfoList);
      setVehicleInfo(updatedVehicleInfoList);
      clearInputs();
      setOpenEditModel(false);
    }
  };

  const disable =
    vehicleType ||
    vehicleCompany ||
    vehicleModel ||
    vehicleColor ||
    registrationNo ||
    engineNo ||
    chasisNo ||
    vehicleStatus ||
    vehicleStatus;

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
  };

  const initData = () => {
    if (isEdit && item) {
      setVehicleInfoList(item.vehicleInfo);
      setVehicleInfo(item.vehicleInfo);
      setTypeOfMoving(item.materialsType);
      setRiskType(item.riskType);
      setLiabilityOfTax(item.liabilityOfTax);
    }
  };

  useEffect(() => {
    initData();
  }, [isEdit, item]);



  useEffect(() => {
    dispatch(getVehicleInsuranceCompanyRequest());
    dispatch(getVehicleTypesRequest());
    dispatch(getVehicleCompanyRequest());
    dispatch(getVehicleColorRequest());
    dispatch(getVehicleModelsRequest());
  }, []);

  useEffect(()=>{
    if(isSingleEdit && vehicleInfo) {
      const vechileTypeList = getVehicleTypeList(vehicleTypes);
      const vehicleTypeItem:TDropdownItem = vechileTypeList.find(item => item.label === vehicleInfo.vehicle_type) as TDropdownItem;
      if(vehicleTypeItem) {
        vehicleTypeDropRef.current?.setDefaultValue(vehicleTypeItem);
        setVehicleType(vehicleTypeItem);
      }
      const vehicleColorDropdownItem: TDropdownItem = getVehicleColorList(vehicleColors).find((e: TDropdownItem) => e.label == vehicleInfo?.vehicle_color) as TDropdownItem;
      if (vehicleColorDropdownItem) {
        vehicleColorDropRef.current?.setDefaultValue(vehicleColorDropdownItem);
        setVehicleColor(vehicleColorDropdownItem);
      }

      const vehicleCompanyDropdownItem: TDropdownItem = getVehicleCompanyList(vehicleTypeId,vehicleCompanies).find((e: TDropdownItem) => e.label == vehicleInfo?.vehicle_company) as TDropdownItem;
      if (vehicleCompanyDropdownItem) {
        vehicleManufactureDropRef.current?.setDefaultValue(vehicleCompanyDropdownItem);
        setVehicleCompany(vehicleCompanyDropdownItem);
      }
      registrationNoRef.current?.setValue(vehicleInfo.registration_no);
      setRegistrationNo(vehicleInfo.registration_no);
      engineNoRef.current?.setValue(vehicleInfo.engine_no);
      setEngineNo(vehicleInfo.engine_no);
      chassisNoRef.current?.setValue(vehicleInfo.chassis_no);
      setChasisNo(vehicleInfo.chassis_no);

      vehicleValueNoRef.current?.setValue(vehicleInfo.vehicle_value);
      setVehicleValue(vehicleInfo.vehicle_value)

  }}, [isSingleEdit, vehicleInfo]);

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
            autoCapitalize="characters"
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
            autoCapitalize="characters"
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
            autoCapitalize="characters"
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
        text={isSingleEdit ? 'UPDATE' : 'ADD'}
        onPress={isSingleEdit ? handleUpdateVehicleInfo : handleAddVehicleInfo }
        disabled={!disable}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
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
  

  modalStyle: {
    width: width,
    height: 600,
  },

  headerStyle: {
    width: width,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
