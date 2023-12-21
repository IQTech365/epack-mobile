import React, {useEffect} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import Button from '../../../../../common/Button';
import {IAddDriverRequest} from '../../../../../interface/vehicle/IAddDriverRequest';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  addDriverRequest,
  restaddDriverRequest,
} from '../../../../../redux/slices/VehicleSlice';
import Spinner from '../../../../../common/Spinner';
import {
  getBranchsRequest,
  getFranchiseRequest,
} from '../../../../../redux/slices/MyProfile';
import useCompanyId from '../../../../../hooks/useCompanyId';
import BasicDetailsView from './components/BasicDetailsView';
import UploadPhotoView from './components/UploadPhotoView';
import UploadAadharPhotoView from './components/UploadAadharPhotoView';
import DriverPermanentAddressView from './components/DriverPermanentAddressView';
import DriverCurrentAddressView from './components/DriverCurrentAddressView';
import DriverContactInfoView from './components/DriverContactInfoView';
import {useAddDriverFormContextHook} from '../../../../../provider/AddDriverFormContextProvider';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import useAuthId from '../../../../../hooks/useAuthId';
import entityOptions from '../../../../../data/entityOptions.json';

const AddDriverView: React.FC<{}> = ({}) => {
  const {state, setAadharCardNo} = useAddDriverFormContextHook();
  const {addDriverRequesting, addDriveruccess, addDriverFailure} =
    useAppSelector(state => state.Vehicle);
  const {getBranchsRequesting, getFranchiseRequesting} = useAppSelector(
    state => state.Myprofile,
  );
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();
  const authId = useAuthId();

  useEffect(() => {
    dispatch(getBranchsRequest(companyId));
    dispatch(getFranchiseRequest(companyId));
  }, []);

  const handleSubmit = () => {
    const payload: IAddDriverRequest = {
      companyId: companyId,
      entityType: state.entity,
      entityId: state.entity == entityOptions[0].label ? companyId : state.sub_entity,
      driverName: state.driver_name,
      mobile: state.driver_mobile_no,
      licenceNo: state.driver_license_no,
      aadharNo: state.aadhar_card_no,
      permanentAddress: {
        pincode: state.permanent_add_pincode,
        address: state.permanent_add_address,
        city: state.permanent_add_city,
        state: state.permanent_add_state,
        locality: state.permanent_add_locality,
      },
      currentAddress: state.is_current_add_same_as_permanent
        ? {
            pincode: state.permanent_add_pincode,
            address: state.permanent_add_address,
            city: state.permanent_add_city,
            state: state.permanent_add_state,
            locality: state.permanent_add_locality,
          }
        : {
            pincode: state.current_add_pincode,
            address: state.current_add_address,
            city: state.current_add_city,
            state: state.current_add_state,
            locality: state.current_add_locality,
          },
      // addedBy: authId,
    };
    console.log(payload, 'add Driver..');
    dispatch(addDriverRequest(payload));
  };

  useEffect(() => {
    if (!addDriverRequesting && addDriveruccess) {
      Toast.show({
        type: 'success',
        text1: 'Add Driver',
        text2: 'Driver has been added successfully',
      });
      dispatch(restaddDriverRequest());
    } else if (!addDriverRequesting && addDriverFailure) {
      Toast.show({
        type: 'error',
        text1: 'Add Driver',
        text2: 'Error in adding Driver. Please try again!',
      });
      dispatch(restaddDriverRequest());
    }
  }, [addDriverRequesting, addDriveruccess, addDriverFailure]);

  const loading =
    addDriverRequesting || getBranchsRequesting || getFranchiseRequesting;

  return (
    <>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <Spacer height={4} />
          <BasicDetailsView />
          <Spacer height={4} />
          <UploadPhotoView title="Upload Driver Photo" />
          <Spacer height={4} />
          <DriverContactInfoView />
          <Spacer height={4} />
          <UploadPhotoView title="Upload License Photo" />
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Aadhar Card No." style={styles.label} />
            <Input
              onChangeText={setAadharCardNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spacer height={4} />
          <UploadAadharPhotoView title="Upload Aadhar Photo" />
          <Spacer height={4} />
          <DriverPermanentAddressView />
          <Spacer height={4} />
          <DriverCurrentAddressView />
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

export default AddDriverView;
