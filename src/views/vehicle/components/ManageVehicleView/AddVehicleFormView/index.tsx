import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import Button from '../../../../../common/Button';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {IAddLorryRequest} from '../../../../../interface/vehicle/IAddLorryRequest';
import {
  addLorryRequest,
  restAddLorryRequest,
} from '../../../../../redux/slices/VehicleSlice';
import Spinner from '../../../../../common/Spinner';
import {
  getBranchsRequest,
  getFranchiseRequest,
} from '../../../../../redux/slices/MyProfile';
import useCompanyId from '../../../../../hooks/useCompanyId';
import UploadPhotoView from './components/UploadPhotoView';
import {useAddLorryFormContextHook} from '../../../../../provider/AddLorryFormContextProvider';
import useAuthId from '../../../../../hooks/useAuthId';
import {formatDate4} from '../../../../../utils/formatter';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import entityOptions from '../../../../../data/entityOptions.json';
import {
  getVehicleCompanyRequest,
  getVehicleModelsRequest,
  getVehicleTypesRequest,
} from '../../../../../redux/slices/CommonSlice';
import {
  getVehicleCompanyList,
  getVehicleModelList,
  getVehicleTypeList,
} from '../../../../order/orderDetails/components/CarConditionFormView/utils';
import {getBranchList, getFirstVehicleType, getFranchiseList} from '../../utils';

const AddLorryView: React.FC<{}> = ({}) => {
  const {
    state,
    setEntity,
    setSubEntity,
    setSubEntityId,
    setLorryCompanyName,
    setLorryType,
    setRegistrationNo,
    setVehicleModel,
    setManufacturingYear,
    setVehicleChasisNo,
    setVehicleRCNumber,
    setVehicleEngineNo,
    setVehicleRCPhoto,
    setPollutionCertificateNo,
    setPollutionRenewalDate,
    setPollutionCertificatePhoto,
    setPermitNo,
    setPermitNoRenewalDate,
    setPermitPhoto,
  } = useAddLorryFormContextHook();

  const {addLorryRequesting, addLorrySuccess, addLorryFailure, addLorryError} =
    useAppSelector(state => state.Vehicle);
  const {Branchs, getBranchsRequesting, Franchises, getFranchiseRequesting} =
    useAppSelector(state => state.Myprofile);
  const {
    vehicleTypes,
    vehicleCompanies,
    vehicleModels,
    vehicleTypesRequesting,
    vehicleCompaniesRequesting,
    vehicleModelsRequesting,
  } = useAppSelector(state => state.Common);
  const [vehicleTypeId, setVehicleTypeId] = useState<string>('');
  const [vehicleCompanyId, setVehicleCompanyId] = useState<string>('');

  const dispatch = useAppDispatch();
  const companyId = useCompanyId();
  const authId = useAuthId();

  const _getSubEntityDataList = (): TDropdownItem[] => {
    let list: TDropdownItem[] = [];
    if (state.entity == entityOptions[0].label) {
      list = [];
    } else if (state.entity == entityOptions[1].label) {
      list = getBranchList(Branchs);
    } else if (state.entity == entityOptions[2].label) {
      list = getFranchiseList(Franchises);
    }
    return list;
  };

  const _getSubEntityLabelText = ():string => {
    let label:string = '';
    if(state.entity == entityOptions[0].label) {
        label = '';
    } else if(state.entity == entityOptions[1].label) {
        label = 'Branch Name';
    } else if(state.entity == entityOptions[2].label) {
        label = 'Franchise Name';
    }
    return label;
  }

  useEffect(() => {
    dispatch(getBranchsRequest(companyId));
    dispatch(getFranchiseRequest(companyId));
    dispatch(getVehicleCompanyRequest());
    dispatch(getVehicleModelsRequest());
    dispatch(getVehicleTypesRequest());
  }, []);

  useEffect(() => {
    if(vehicleTypes !== null && vehicleTypes !== undefined) {
        const firstVehicleType = getFirstVehicleType(vehicleTypes);
        setVehicleTypeId(firstVehicleType?._id);
        setLorryType(firstVehicleType?.vehicleType)
    }
  }, [vehicleTypes]);

  const loading =
    getBranchsRequesting ||
    getFranchiseRequesting ||
    vehicleTypesRequesting ||
    addLorryRequesting ||
    vehicleCompaniesRequesting ||
    vehicleModelsRequesting;

  const handleSubmit = () => {
    const payload: IAddLorryRequest = {
      companyId: companyId,
      entityType: state.entity,
      entityId: state.entity == entityOptions[0].label ? companyId : state.sub_entity_id,
      vehicleCompanyName: state.lorry_company_name,
      vehicleManufacturingYear: state.manufacturing_year,
      vehicleType: state.lorry_type,
      vehicleRegistrationNo: state.reg_number,
      vehicleChassisNo: state.vehicle_chasis_no,
      vehicleEngineNo: state.vehicle_engine_no,
      permitNo: state.permit_no,
      permitRenewalDate: state.permit_no_renewal_date,
      vehicleRCNo: state.vehicle_rc_no,
      pollutionCertificateNo: state.pollution_certificate_no,
      pollutionRenewalDate: state.pollution_certificate_renewal_date,
    //   createdBy: authId,
    };
    console.log(payload, 'add Lorry..');
    dispatch(addLorryRequest(payload));
  };

  useEffect(() => {
    if (!addLorryRequesting && addLorrySuccess) {
      Toast.show({
        type: 'success',
        text1: 'Add Lorry',
        text2: 'Add Lorry has been added successfully',
      });
      dispatch(restAddLorryRequest());
    } else if (!addLorryRequesting && addLorryFailure) {
      Toast.show({
        type: 'error',
        text1: 'Add Lorry',
        text2: 'Error in adding Lorry. Please try again!',
      });
      dispatch(restAddLorryRequest());
    }
  }, [addLorryRequesting, addLorrySuccess, addLorryFailure]);

  return (
    <>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Choose Entity" style={styles.label} />
            <DropdownComponent
              data={entityOptions}
              onSelect={(item: TDropdownItem) => {
                setEntity(item.label);
              }}
            />
          </View>
          {state.entity !== entityOptions[0].label ? (
            <>
              <Spacer height={4} />
              <View style={styles.elementContainer}>
                <Label text={_getSubEntityLabelText()} style={styles.label} />
                <DropdownComponent
                  data={_getSubEntityDataList()}
                  onSelect={(item: TDropdownItem) => {
                    setSubEntityId(item.value);
                    setSubEntity(item.label);
                  }}
                />
              </View>
            </>
          ) : null}
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Vehicle Type" style={styles.label} />
            <DropdownComponent
              data={getVehicleTypeList(vehicleTypes)}
              onSelect={(item: TDropdownItem) => {
                setVehicleTypeId(item.value);
                setLorryType(item.value);
              }}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Vehicle Company Name" style={styles.label} />
            <DropdownComponent
              data={getVehicleCompanyList(vehicleTypeId, vehicleCompanies)}
              onSelect={(item: TDropdownItem) => {
                setVehicleCompanyId(item.value);
                setLorryCompanyName(item.label);
              }}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Vehicle Model" style={styles.label} />
            <DropdownComponent
              data={getVehicleModelList(vehicleCompanyId, vehicleModels)}
              onSelect={(item: TDropdownItem) => {
                setVehicleModel(item.label);
              }}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Registration Number" style={styles.label} />
              <Input
                onChangeText={setRegistrationNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="HR 55 hY 2259"
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Manufacturing Year" style={styles.label} />
              <DatePickerComponent
                onDateSelect={(date: Date) => {
                  setManufacturingYear(formatDate4(date));
                }}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Vehicle Chassis Number" style={styles.label} />
            <Input
              onChangeText={setVehicleChasisNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="HR 55 hY 2259"
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Vehicle Engine Number" style={styles.label} />
            <Input
              onChangeText={setVehicleEngineNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="HR 55 hY 2259"
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Vehicle RC Number" style={styles.label} />
            <Input
              onChangeText={setVehicleRCNumber}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="HR 55 hY 2259"
            />
          </View>

          <Spacer height={4} />
          <UploadPhotoView title="Uplaod RC Photo" />
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Pollution Certificate No." style={styles.label} />
              <Input
                onChangeText={setPollutionCertificateNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Renewal Date" style={styles.label} />
              <DatePickerComponent
                onDateSelect={(date: Date) => {
                  setPollutionRenewalDate(formatDate4(date));
                }}
              />
            </View>
          </View>
          <Spacer height={4} />
          <UploadPhotoView title="Upload Pollution Certificate" />
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Permit Number" style={styles.label} />
              <Input
                onChangeText={setPermitNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Renewal Date" style={styles.label} />
              <DatePickerComponent
                onDateSelect={(date: Date) => {
                  setPermitNoRenewalDate(formatDate4(date));
                }}
              />
            </View>
          </View>
          <Spacer height={4} />
          <UploadPhotoView title="Upload Permit Phto" />
          <Spacer height={12} />
          <Button
            text="SAVE"
            onPress={handleSubmit}
            disabled={false}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={12} />
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner show={loading} />
    </>
  );
};

export default AddLorryView;
