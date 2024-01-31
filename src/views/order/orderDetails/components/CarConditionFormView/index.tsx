import React, {useReducer, useState, useEffect} from 'react';
import {View} from 'react-native';
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
import carYear from '../../../../../data/carYear.json';
import AccessoryView from '../AccessoryView';
import {
  initialState,
  carConditionReducer,
  CARCONDITION_FORM_ACTION,
  IAccessory,
} from './carConditionReducer';
import {formatDate3} from '../../../../../utils/formatter';
import Button from '../../../../../common/Button';
import {ICreateCarConditionRequest} from '../../../../../interface/order/ICreateCarConditionRequest';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {createCarConditionRequest, resetCreateCarConditionRequest} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {
  getVehicleAccessoryList,
  getVehicleColorList,
  getVehicleCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
} from './utils';
import useAuthId from '../../../../../hooks/useAuthId';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../../../interface/setting/serialNo/serialNo';
import { getSerialNoRequest, resetGetSerialNoRequest } from '../../../../../redux/slices/SerialNoSettingSlice';
import { ToastType, showToast } from '../../../../../utils/utility';

interface ICarConditionFormViewProps {
  orderId: string | undefined;
}

const CarConditionFormView: React.FC<ICarConditionFormViewProps> = ({
  orderId,
}) => {
  const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
  const [vehicleCompanyId, setVehicleCompanyId] = useState<string>('');
  const [reducerState, dispatch] = useReducer(
    carConditionReducer,
    initialState,
  );
  const {
    createCarConditionRequesting,
    createCarConditionSuccess,
    createCarConditionError,
    createCarConditionFailure,
    orders,
  } = useAppSelector(state => state.Order);
  const {
    vehicleTypes,
    vehicleCompanies,
    vehicleColors,
    vehicleAccessories,
    vehicleModels,
  } = useAppSelector(state => state.Common);
  const dispatch2 = useAppDispatch();
  const authId = useAuthId();
  const {initialValue, prefix} = useInitialValueHook('658d3cab585e3dde644da977');
  const serialNo:number = useSerialNoHook();

  const _getSerialNoRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetSerialNoRequest = {
        document: DOCUMENT_TYPE.CAR_CONDITION,
        payload: {
          activeCount: initialValue,
          companyId: id as string,
          isAuto: true,
          isHeadOffice: true,
        }
      }
      dispatch2(getSerialNoRequest(payload));
    }).catch(err => console.log('err--', err));
  }

  const handleCarConditionNo = (text: string) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.CARCONDITION_NO,
      payload: text,
    });
  };

  const handleCarConditionDate = (date: Date) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.DATE_OF_CARCONDITION,
      payload: formatDate3(date),
    });
  };
  const handleCnBiltyLrNO = (text: string) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.CN_BILTY_LR_NO,
      payload: text,
    });
  };

  const handleVehicleType = (item: TDropdownItem) => {
    setVehicleTypeId(item.value);
    dispatch({
      type: CARCONDITION_FORM_ACTION.VEHICLE_TYPE,
      payload: item.label,
    });
  };

  const handleManufacturer = (item: TDropdownItem) => {
    setVehicleCompanyId(item.value);
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
      type: CARCONDITION_FORM_ACTION.REMARKS,
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

  const handleVehicleAccessories = (accessoryName:string, id:string, present:boolean) => {
    const {vehicleAccessories} = reducerState;
    const clone = [...vehicleAccessories];
    if(present) {
      const accessory:IAccessory = {accessoryName: accessoryName, id:id, present: present};
      clone.push(accessory);
      dispatch({
        type: CARCONDITION_FORM_ACTION.VEHICLE_ACCESSORIES,
        payload: clone,
      });
    } else {
      const filters = clone.filter((acc:IAccessory) => acc.accessoryName !== accessoryName);
      dispatch({
        type: CARCONDITION_FORM_ACTION.VEHICLE_ACCESSORIES,
        payload: filters,
      });
    }
  }

  const handleCreateCarCondition = () => {
    getCurrentCompanyId().then(id => {
      const payload: ICreateCarConditionRequest = {
        companyId: id as string,
        orderId: orderId as string,
        isAuto: true,
        isHeadOffice: true,
        templateId: '32423erer',
        carConditionNumber: reducerState.carConditionNumber,
        dateOfCarCondition: reducerState.dateOfCarCondition,
        vehicleType: reducerState.vehicleType,
        manufacturer: reducerState.manufacturer,
        model: reducerState.model,
        yearOfManufacturing: reducerState.yearOfManufacturing,
        vehicleAccessories: reducerState.vehicleAccessories,
        color: reducerState.color,
        vehicleRegistrationNumber: reducerState.vehicleRegistrationNumber,
        vehicleCoveredDistanceInKM: reducerState.vehicleCoveredDistanceInKM,
        vehicleValue: reducerState.vehicleValue,
        insurancePolicyNumber: reducerState.insurancePolicyNumber,
        insuranceCompany: reducerState.insuranceCompany,
        chasisNumber: reducerState.chasisNumber,
        engineNumber: reducerState.engineNumber,
        batteryNumber: reducerState.batteryNumber,
        tyreNumber: reducerState.tyreNumber,
        anyOtherAccessorie: reducerState.anyOtherAccessorie,
        scratches: reducerState.scaratches,
        dent: reducerState.dent,
        visibleObservation: reducerState.visibleObservation,
        remarks: reducerState.remarks,
        addedBy: authId,
      };
      dispatch2(createCarConditionRequest(payload));
    }).catch(err => console.log(err));
    
  };

  useEffect(() => {
    _getSerialNoRequest();
  }, []);

  useEffect(() => {
    if(serialNo){
      handleCarConditionNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if (!createCarConditionRequesting && createCarConditionSuccess) {
      showToast('Car Conditiion Created.', ToastType.SUCCESS);
      dispatch2(resetCreateCarConditionRequest());
      dispatch2(resetGetSerialNoRequest());
    } else if (!createCarConditionRequesting && createCarConditionError) {
      showToast('Car Condition Not Created. Try again!', ToastType.ERROR);
      dispatch2(resetCreateCarConditionRequest());
    }
  }, [
    createCarConditionRequesting,
    createCarConditionSuccess,
    createCarConditionFailure,
  ]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="VEHCILE DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Condition No." style={styles.label} />
                <Input
                  onChangeText={handleCarConditionNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={reducerState.carConditionNumber}
                  placeholder="Car Condition#"
                  editable={false}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Vehicle Condition" style={styles.label} />
                <DatePickerComponent onDateSelect={handleCarConditionDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="CN / Bilty / LR No." style={styles.label} />
                <Input
                  onChangeText={handleCnBiltyLrNO}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Type" style={styles.label} />
                <DropdownComponent
                  data={getVehicleTypeList(vehicleTypes)}
                  onSelect={handleVehicleType}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Manufacturer" style={styles.label} />
                <DropdownComponent
                  data={getVehicleCompanyList(vehicleTypeId, vehicleCompanies)}
                  onSelect={handleManufacturer}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Model" style={styles.label} />
                <DropdownComponent
                  data={getVehicleModelList(vehicleCompanyId, vehicleModels)}
                  onSelect={handleModel}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Color" style={styles.label} />
                <DropdownComponent
                  data={getVehicleColorList(vehicleColors)}
                  onSelect={handleColor}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Year" style={styles.label} />
                <DropdownComponent data={carYear} onSelect={handleYear} />
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
                  onChangeText={handlePolicyNo}
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
            {getVehicleAccessoryList(vehicleAccessories).map((accessory, index) => {
              return (
                <View key={index}>
                  <AccessoryView
                    label={accessory.label}
                    id={accessory.id}
                    onPress={handleVehicleAccessories}
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
        <Button
          text="CREATE"
          onPress={handleCreateCarCondition}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        <Spinner show={createCarConditionRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default CarConditionFormView;
