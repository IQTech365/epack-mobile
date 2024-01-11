import React, {useCallback, useEffect} from 'react';
import {} from 'react-native';
import styles from '../style';
import Spacer from '../../../../common/Spacer';
import GeneralInfoView from './GeneralInfoView';
import EnquiryPickupAddressView from './EnquiryPickupAddressView';
import Button from '../../../../common/Button';
import Spinner from '../../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {addEnquiryRequest, getEnquiriesRequest, resetAddEnquiryRequest} from '../../../../redux/slices/EnquirySlice';
import {useEnquiryFormContextHook} from '../../../../provider/EnquiryFormContextProvider';
import {IAddEnquiryRequest} from '../../../../interface/enquiry/IAddEnquiryRequest';
import useAuthId from '../../../../hooks/useAuthId';
import { ToastType, showToast } from '../../../../utils/utility';
import { NavigationProp } from '@react-navigation/native';
import billingByOptions from '../../../../data/billingByOptions.json';
import { getCurrentCompanyId } from '../../../../utils/storage';

interface IProps {
  navigation: NavigationProp<any, any>;
}

const AddEnquiryFormView: React.FC<IProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const authId = useAuthId();
  const {
    state,
    setPartyName,
    setPartyMobileNo,
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setEmployeeMobileNo,
    setEmployeeName,
    setEmployeeDesignation,
    setCompanyGST,
    setCompanyAddress
  } = useEnquiryFormContextHook();
  const {addEnquiryRequesting, addEnquirySuccess, addEnquiryFailure} =
    useAppSelector(state => state.Enquiry);

  const handleSubmit = useCallback(() => {
    // setShowErrors(true);
    // if (!isFormValid) {
    //   if (showMobileNumberError) {
    //     Alert.alert(
    //       'Message',
    //       'Enter either Authority Mobile number or Employee Mobile number',
    //     );
    //   } else {
    //     showToast("Form data incorrect. Please correct!", ToastType.ERROR);
    //   }
    //   return;
    // }
    getCurrentCompanyId().then(id => {
      const payload: IAddEnquiryRequest = {
        companyId: id as string,
        customerId: state.customer_id,
        authId: authId,
        enquiryManager: '',
        shiftingType: state.shifting_type.toUpperCase(),
        partyCompanyName: '',
        partyName: state.party_name,
        email: '',
        mobile: state.party_mobile_no,
        phone: '',
        shiftingLuggage: state.shifting_luggages,
        enquirySource: '',
        gstNumber: state.company_gst,
        alternateNumbers: '',
        shiftingDate: '',
        pickupAddress: {
          shiftingFrom: state.p_city,
          state: state.p_state,
          city: state.p_city,
          address: state.p_address,
          pincode: state.p_pincode,
          landmark: '',
          floor: state.p_current_floor,
          isLiftAvailable: state.p_lift_status.toUpperCase(),
        },
        dropAddress: {
          shiftingTo: state.d_city,
          state: state.d_state,
          city: state.d_city,
          address: state.d_address,
          pincode: state.d_pincode,
          landmark: '',
          floor: state.d_current_floor,
          isLiftAvailable: state.d_lift_status.toUpperCase(),
        },
        billingBy: state.billing_by,
        billingDetails:
          state.billing_by == 'by Company'
            ? {
                companyName: state.company_name,
                approvalAuthority: state.approval_authority,
                authorityPersonName: state.authority_person_name,
                authorityPersonMobile: state.authority_mobile_no,
                companyAddress: state.company_address,
                companyGST: state.company_gst,
                employeeName: state.employee_name,
                employeeDesignation: state.employee_designation,
                employeeMobile: state.employee_mobile_no,
              }
            : {},
        status: 'NEW',
      };
      console.log('NewEnquiry-paylaod--', JSON.stringify(payload));
      dispatch(addEnquiryRequest(payload));
    }).catch(err => console.log(err));
  }, [state]);

  const _getEnquiriesRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getEnquiriesRequest(id as string));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if (!addEnquiryRequesting && addEnquirySuccess) {
      showToast("New Enquiry Created.", ToastType.SUCCESS);
      dispatch(resetAddEnquiryRequest());
      _getEnquiriesRequest();
      navigation.goBack();
    } else if (!addEnquiryRequesting && addEnquiryFailure) {
      showToast("New Enquiry Not Created. Try again!", ToastType.ERROR);
      dispatch(resetAddEnquiryRequest());
    }
  }, [addEnquiryRequesting, addEnquirySuccess, addEnquiryFailure]);

  useEffect(() => {
    if(state.billing_by == billingByOptions[1].label) {
      setPartyName('');
      setPartyMobileNo('');
    } else if(state.billing_by == billingByOptions[0].label) {
      setCompanyName('');
      setAuthorityPersonName('');
      setAuthorityMobileNo('');
      setCompanyGST('');
      setEmployeeName('');
      setEmployeeMobileNo('');
      setEmployeeDesignation('');
      setCompanyAddress('');
    }
  }, [state.billing_by]);

  return (
    <>
      <Spacer height={4} />
      <GeneralInfoView />
      <Spacer height={4} />
      <EnquiryPickupAddressView />
      <Spacer height={4} />
      <EnquiryPickupAddressView />
      <Spacer height={12} />
      <Button
        text="SUBMIT"
        onPress={handleSubmit}
        disabled={false}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={12} />
      <Spinner show={addEnquiryRequesting} />
    </>
  );
};

export default AddEnquiryFormView;
