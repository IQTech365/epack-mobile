import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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
import UploadPhotoView, { PHOTO } from './components/UploadPhotoView';
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
  getYears,
} from '../../../../order/orderDetails/components/CarConditionFormView/utils';
import {getBranchList, getFirstVehicleType, getFranchiseList} from '../../utils';
import { ToastType, showToast } from '../../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../../utils/storage';

interface IProps {
  onSuccess: () => void;
}

const AddLorryView: React.FC<IProps> = ({onSuccess}) => {
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

  const _getBranchsRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getBranchsRequest(id as string));
    }).catch(err => console.log(err));
  }

  const _getFranchiseRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getFranchiseRequest(id as string));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    _getBranchsRequest();
    _getFranchiseRequest();
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
    getCurrentCompanyId().then(id => {
      const payload: IAddLorryRequest = {
        companyId: id as string,
        entityType: state.entity,
        entityId: state.entity == entityOptions[0].label ? id as string : state.sub_entity_id,
        vehicleCompanyName: state.lorry_company_name,
        vehicleManufacturingYear: state.manufacturing_year || "",
        vehicleType: state.lorry_type,
        vehicleModel: state.vehicle_model,
        vehicleRegistrationNo: state.reg_number || "",
        rcDoc: state.vehicle_rc_photo || "",
        vehicleChassisNo: state.vehicle_chasis_no || "",
        vehicleEngineNo: state.vehicle_engine_no || "",
        permitNo: state.permit_no || "",
        pollutionDoc: state.pollution_certificate_photo || "",
        permitRenewalDate: state.permit_no_renewal_date || "",
        vehicleRCNo: state.vehicle_rc_no || "",
        pollutionCertificateNo: state.pollution_certificate_no || "",
        permitDoc: state.permit_photo || "",
        pollutionRenewalDate: state.pollution_certificate_renewal_date || "",
        addedBy: authId,
      };
      dispatch(addLorryRequest(payload));
    }).catch(err => console.log(err));
    
  };

  useEffect(() => {
    if (!addLorryRequesting && addLorrySuccess) {
      showToast('Vehicle added successfully.', ToastType.SUCCESS);
      dispatch(restAddLorryRequest());
      onSuccess && onSuccess();
    } else if (!addLorryRequesting && addLorryFailure) {
      showToast('Error added new Vehicle. Try again!', ToastType.ERROR);
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
                setVehicleModel(item.value);

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
                autoCapitalize="characters"

              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Manufacturing Year" style={styles.label} />
              <DropdownComponent data={getYears()}
              onSelect={(item: TDropdownItem) => {
                setManufacturingYear(item.value);
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
              placeholder="Enter Chassis Number"
              autoCapitalize="characters"
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
              placeholder="Enter Engine Number"
              autoCapitalize="characters"
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
              placeholder="Enter RC Number"
              autoCapitalize="characters"
            />
          </View>

          <Spacer height={4} />
          <UploadPhotoView title="Uplaod RC Photo" photo={PHOTO.RC} />
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Pollution Certificate No." style={styles.label} />
              <Input
                onChangeText={setPollutionCertificateNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                autoCapitalize="characters"
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
          <UploadPhotoView title="Upload Pollution Certificate" photo={PHOTO.POLLUTION_CERT} />
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Permit Number" style={styles.label} />
              <Input
                onChangeText={setPermitNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                autoCapitalize="characters"

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
          <UploadPhotoView title="Upload Permit Photo" photo={PHOTO.PERMIT_DOC} />
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
