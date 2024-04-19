import React, {
  useReducer,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent, {
  IDateMethods,
} from '../../../../../common/DatePickerComponent';
import DropdownComponent, {
  IDropdownHandler,
} from '../../../../../common/DropdownComponent';
import Input, {InputMethods} from '../../../../../common/Input';
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
import {
  createCarConditionRequest,
  resetCreateCarConditionRequest,
  updateCarConditionRequest,
  resetUpdateCarConditionRequest,
} from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import {
  getVehicleAccessoryList,
  getVehicleColorList,
  getVehicleCompanyList,
  getVehicleInsuranceCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
  getYears,
} from './utils';
import useAuthId from '../../../../../hooks/useAuthId';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
import {
  DOCUMENT_TYPE,
  IGetSerialNoRequest,
} from '../../../../../interface/setting/serialNo/serialNo';
import {
  getSerialNoRequest,
  resetGetSerialNoRequest,
} from '../../../../../redux/slices/SerialNoSettingSlice';
import {ToastType, showToast} from '../../../../../utils/utility';
import {ICardConditionData} from '../../../../../interface/order/IGetCarConditionListResponse';
import {IUpdateCarConditionPayload} from '../../../../../interface/order/IUpdateCarConditionResponse';
import {getVehicleInsuranceCompanyRequest} from '../../../../../redux/slices/CommonSlice';

interface ICarConditionFormViewProps {
  orderId: string | undefined;
  onSuccess: () => void;
  item?: ICardConditionData;
  isEdit?: boolean;
}

const CarConditionFormView: React.FC<ICarConditionFormViewProps> = ({
  orderId,
  onSuccess,
  item,
  isEdit = false,
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
    updateCarConditionRequesting,
    updateCarConditionSuccess,
    updateCarConditionFailure,
  } = useAppSelector(state => state.Order);
  const {
    vehicleTypes,
    vehicleCompanies,
    vehicleInsuranceCompany,
    vehicleColors,
    vehicleAccessories,
    vehicleModels,
  } = useAppSelector(state => state.Common);

  const dispatch2 = useAppDispatch();
  const authId = useAuthId();
  const {initialValue, prefix} = useInitialValueHook(
    '658d3cab585e3dde644da977',
  );
  const serialNo: number = useSerialNoHook();

  const carConditionNoInputRef = useRef<InputMethods>(null);
  const DateInputRef = useRef<IDateMethods>(null);
  const cnLrBnRef = useRef<InputMethods>(null);
  const vehicleTypeDropRef = useRef<IDropdownHandler>(null);
  const vehicleManufactureDropRef = useRef<IDropdownHandler>(null);
  const vehicleModelDropRef = useRef<IDropdownHandler>(null);
  const vehicleColorDropRef = useRef<IDropdownHandler>(null);
  const vehicleManufactureYearDropRef = useRef<IDropdownHandler>(null);
  const registrationNoRef = useRef<InputMethods>(null);
  const vehicleKmRef = useRef<InputMethods>(null);
  const insuranceCompanyNameRef = useRef<IDropdownHandler>(null);
  const insurancePolicyNoRef = useRef<InputMethods>(null);
  const vehicleValueRef = useRef<InputMethods>(null);
  const chassisNoRef = useRef<InputMethods>(null);
  const engineNoRef = useRef<InputMethods>(null);
  const batteryNoRef = useRef<InputMethods>(null);
  const tyreNoRef = useRef<InputMethods>(null);
  const anyOtherAccessoriesRef = useRef<InputMethods>(null);
  const remarkRef = useRef<InputMethods>(null);
  const scratcheRef = useRef<InputMethods>(null);
  const dentRef = useRef<InputMethods>(null);
  const anyOtherObservationRef = useRef<InputMethods>(null);

  const _getSerialNoRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSerialNoRequest = {
          document: DOCUMENT_TYPE.CAR_CONDITION,
          payload: {
            activeCount: initialValue,
            companyId: id as string,
            isAuto: true,
            isHeadOffice: true,
          },
        };
        dispatch2(getSerialNoRequest(payload));
      })
      .catch(err => console.log('err--', err));
  };

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

  const handleInsuranceCompany = (item: TDropdownItem) => {
    dispatch({
      type: CARCONDITION_FORM_ACTION.INSURANCE_COMPANY_NAME,
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

  const handleVehicleAccessories = (
    accessoryName: string,
    id: string,
    present: boolean,
  ) => {
    const {vehicleAccessories} = reducerState;
    const clone = [...vehicleAccessories];
    if (present) {
      const accessory: IAccessory = {
        accessoryName: accessoryName,
        id: id,
        present: present,
      };
      clone.push(accessory);
      dispatch({
        type: CARCONDITION_FORM_ACTION.VEHICLE_ACCESSORIES,
        payload: clone,
      });
    } else {
      const filters = clone.filter(
        (acc: IAccessory) => acc.accessoryName !== accessoryName,
      );
      dispatch({
        type: CARCONDITION_FORM_ACTION.VEHICLE_ACCESSORIES,
        payload: filters,
      });
    }
  };

  const handleCreateCarCondition = useCallback(() => {
    getCurrentCompanyId()
      .then(id => {
        const payload: ICreateCarConditionRequest = {
          companyId: id as string,
          orderId: orderId as string,
          isAuto: true,
          isHeadOffice: true,
          carConditionNumber: reducerState.carConditionNumber,
          dateOfCarCondition: reducerState.dateOfCarCondition,
          biltyNo: reducerState.cnBiltyLrNo,
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
        console.log(payload, 'payload----------');

        if (isEdit) {
          delete payload.companyId;
          delete payload.orderId;
          delete payload.addedBy;
          const updatedPayload: IUpdateCarConditionPayload = {
            id: item?._id as string,
            data: payload,
          };
          dispatch2(updateCarConditionRequest(updatedPayload));
        } else {
          dispatch2(createCarConditionRequest(payload));
        }
      })
      .catch(err => console.log(err));
  }, [reducerState]);

  useEffect(() => {
    _getSerialNoRequest();
    dispatch2(getVehicleInsuranceCompanyRequest());
  }, []);

  useEffect(() => {
    if (serialNo) {
      handleCarConditionNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if (isEdit && item) {
      carConditionNoInputRef.current?.setValue(item.carConditionNumber);
      registrationNoRef.current?.setValue(item.vehicleRegistrationNumber);
      vehicleKmRef.current?.setValue(item.vehicleCoveredDistanceInKM);
      cnLrBnRef.current?.setValue(item.biltyNo);
      insurancePolicyNoRef.current?.setValue(item.insurancePolicyNumber);
      vehicleValueRef.current?.setValue(item.vehicleValue);
      chassisNoRef.current?.setValue(item.chasisNumber);
      engineNoRef.current?.setValue(item.engineNumber);
      batteryNoRef.current?.setValue(item.batteryNumber);
      tyreNoRef.current?.setValue(item.tyreNumber);
      anyOtherAccessoriesRef.current?.setValue(item.anyOtherAccessorie);
      remarkRef.current?.setValue(item.remarks);
      scratcheRef.current?.setValue(item.scratches);
      dentRef.current?.setValue(item.dent);
      anyOtherObservationRef.current?.setValue(item.visibleObservation);
      const vehicleTypeDropdownItem: TDropdownItem = getVehicleTypeList(
        vehicleTypes,
      ).find(
        (e: TDropdownItem) => e.label == item?.vehicleType,
      ) as TDropdownItem;

      if (vehicleTypeDropdownItem! == undefined) {
        vehicleTypeDropRef.current?.setDefaultValue(vehicleTypeDropdownItem);
        vehicleTypeDropRef.current?.refreshComp();
      }
      const vehicleCompanyDropdownItem: TDropdownItem = getVehicleCompanyList(
        vehicleTypeId,
        vehicleCompanies,
      ).find(
        (e: TDropdownItem) => e.label == item?.manufacturer,
      ) as TDropdownItem;
      if (vehicleCompanyDropdownItem! == undefined) {
        vehicleManufactureDropRef.current?.setDefaultValue(
          vehicleCompanyDropdownItem,
        );
      }
      const vehicleModelDropdownItem: TDropdownItem = getVehicleModelList(
        vehicleCompanyId,
        vehicleModels,
      ).find((e: TDropdownItem) => e.label == item?.model) as TDropdownItem;
      if (vehicleModelDropdownItem! == undefined) {
        vehicleModelDropRef.current?.setDefaultValue(vehicleModelDropdownItem);
      }
      const vehicleColorDropdownItem: TDropdownItem = getVehicleColorList(
        vehicleColors,
      ).find((e: TDropdownItem) => e.label == item?.color) as TDropdownItem;
      if (vehicleColorDropdownItem! == undefined) {
        vehicleColorDropRef.current?.setDefaultValue(vehicleColorDropdownItem);
      }
      const vehicleManufactureYearDropdownItem: TDropdownItem = getYears().find(
        (e: TDropdownItem) => e.label == item?.yearOfManufacturing,
      ) as TDropdownItem;
      if (vehicleManufactureYearDropdownItem! == undefined) {
        vehicleManufactureYearDropRef.current?.setDefaultValue(
          vehicleManufactureYearDropdownItem,
        );
      }
    }
  }, [isEdit, item]);

  useEffect(() => {
    if (!createCarConditionRequesting && createCarConditionSuccess) {
      showToast('Car Conditiion Created.', ToastType.SUCCESS);
      dispatch2(resetCreateCarConditionRequest());
      dispatch2(resetGetSerialNoRequest());
      onSuccess && onSuccess();
    } else if (!createCarConditionRequesting && createCarConditionError) {
      showToast('Car Condition Not Created. Try again!', ToastType.ERROR);
      dispatch2(resetCreateCarConditionRequest());
    }
  }, [
    createCarConditionRequesting,
    createCarConditionSuccess,
    createCarConditionFailure,
  ]);

  useEffect(() => {
    if (!updateCarConditionRequesting && updateCarConditionSuccess) {
      showToast('Car Condition data updated.', ToastType.SUCCESS);
      dispatch2(resetUpdateCarConditionRequest());
      onSuccess && onSuccess();
    } else if (!updateCarConditionRequesting && updateCarConditionFailure) {
      showToast(' Car Condition not updated. Try again!', ToastType.ERROR);
      dispatch2(resetUpdateCarConditionRequest());
    }
  }, [
    updateCarConditionRequesting,
    updateCarConditionSuccess,
    updateCarConditionFailure,
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
                  ref={carConditionNoInputRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date" style={styles.label} />
                <DatePickerComponent
                  onDateSelect={handleCarConditionDate}
                  ref={DateInputRef}
                />
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
                  placeholder="CN / Bilty / LR No."
                  // value={}
                  selectionColor={COLOR_BLACK}
                  value={reducerState.cnBiltyLrNo}
                  autoCapitalize="characters"
                  ref={cnLrBnRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Type" style={styles.label} />
                <DropdownComponent
                  data={getVehicleTypeList(vehicleTypes)}
                  onSelect={handleVehicleType}
                  ref={vehicleTypeDropRef}
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
                  ref={vehicleManufactureDropRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Model" style={styles.label} />
                <DropdownComponent
                  data={getVehicleModelList(vehicleCompanyId, vehicleModels)}
                  onSelect={handleModel}
                  ref={vehicleModelDropRef}
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
                  ref={vehicleColorDropRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Year" style={styles.label} />
                <DropdownComponent
                  data={getYears()}
                  onSelect={handleYear}
                  ref={vehicleManufactureYearDropRef}
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
                  value={reducerState.vehicleRegistrationNumber}
                  placeholder="Vehicle Reg.#"
                  selectionColor={COLOR_BLACK}
                  autoCapitalize="characters"
                  ref={registrationNoRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle KM" style={styles.label} />
                <Input
                  onChangeText={handleVehicleKm}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  placeholder="KM"
                  value={reducerState.vehicleCoveredDistanceInKM}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  ref={vehicleKmRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Insurance Company Name" style={styles.label} />
              <DropdownComponent
                data={getVehicleInsuranceCompanyList(vehicleInsuranceCompany)}
                onSelect={handleInsuranceCompany}
                ref={insuranceCompanyNameRef}
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
                  placeholder="Policy#"
                  value={reducerState.insurancePolicyNumber}
                  selectionColor={COLOR_BLACK}
                  ref={insurancePolicyNoRef}
                  autoCapitalize="characters"
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Value" style={styles.label} />
                <Input
                  onChangeText={handleVehicleValue}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  placeholder="Vehicle Value"
                  value={reducerState.vehicleValue}
                  inputType="numeric"
                  selectionColor={COLOR_BLACK}
                  ref={vehicleValueRef}
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
                placeholder="Chasis No."
                value={reducerState.chasisNumber}
                autoCapitalize="characters"
                selectionColor={COLOR_BLACK}
                ref={chassisNoRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Engine No." style={styles.label} />
              <Input
                onChangeText={handleEngineNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholder="Engine No."
                value={reducerState.engineNumber}
                autoCapitalize="characters"
                selectionColor={COLOR_BLACK}
                ref={engineNoRef}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="ACCESSORIES DETAILS" collapsed={false}>
          <View>
            {getVehicleAccessoryList(vehicleAccessories).map(
              (accessory, index) => {
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
              },
            )}
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Battery No." style={styles.label} />
                <Input
                  onChangeText={handleBatteryNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  placeholder="Battery No."
                  value={reducerState.batteryNumber}
                  autoCapitalize="characters"
                  selectionColor={COLOR_BLACK}
                  ref={batteryNoRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Tyre No." style={styles.label} />
                <Input
                  onChangeText={handleTyreyNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  value={reducerState.tyreNumber}
                  placeholder="Tyre No."
                  inputType="numeric"
                  selectionColor={COLOR_BLACK}
                  ref={tyreNoRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Any Other Accessories" style={styles.label} />
              <Input
                onChangeText={handleAnyOtherAccessories}
                containerStyle={styles.inputContainer}
                value={reducerState.anyOtherAccessorie}
                inputStyle={styles.input}
                placeholder="Other accessories"
                selectionColor={COLOR_BLACK}
                ref={anyOtherAccessoriesRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Remark" style={styles.label} />
              <Input
                onChangeText={handleRemark}
                containerStyle={styles.inputContainer}
                value={reducerState.remarks}
                inputStyle={styles.input}
                placeholder="Any Remarks"
                selectionColor={COLOR_BLACK}
                ref={remarkRef}
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
                value={reducerState.scaratches}
                placeholder="Any Scratches"
                selectionColor={COLOR_BLACK}
                ref={scratcheRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Dent" style={styles.label} />
              <Input
                onChangeText={handleDent}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={reducerState.dent}
                placeholder="Any Dent"
                selectionColor={COLOR_BLACK}
                ref={dentRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Any Other Observation" style={styles.label} />
              <Input
                onChangeText={handleAnyOtherObservation}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={reducerState.visibleObservation}
                placeholder="Other Observations"
                selectionColor={COLOR_BLACK}
                ref={anyOtherObservationRef}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <Button
          text={isEdit ? 'UPDATE' : 'CREATE'}
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
