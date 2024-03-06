import React, {useEffect} from 'react';
import BasicDetails from './BasicDetails';
import {useQuotationFormContextHook} from '../../../../provider/QuotationFormContextProvider';
import PickupAddressView from './PickupAddressView';
import Spacer from '../../../../common/Spacer';
import DropAddressView from './DropAddressView';
import FreightDetailsView from './FreightDetailsView';
import InsuranceDetailsView from './InsuranceDetailsView';
import StorageChargesView from './StorageChargesView';
import OtherDetailsView from './OtherDetailsView';
import Button from '../../../../common/Button';
import styles from '../style';
import {
  IAddQuotationRequest,
  IOtherCharge,
  IOtherCharges,
  IStorageCharges,
  ITransitInsurance,
} from '../../../../interface/quotation/IAddQuotationRequest';
import useAuthId from '../../../../hooks/useAuthId';
import {options2} from './FreightDetailsView/components/utils';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  addQuotationRequest,
  getQuotationsRequest,
  resetUpdateQuotationRequest,
  resetaddQuotationRequest,
  updateQuotationRequest,
} from '../../../../redux/slices/QuotationSlice';
import {IGetQuotationRequest} from '../../../../interface/quotation/IGetQuotationRequest';
import billingByOptions from '../../../../data/billingByOptions.json';
import Spinner from '../../../../common/Spinner';
import {Validator} from '../../../../utils/validation';
import {ToastType, showToast} from '../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../utils/storage';
import { IGetQuotationData } from '../../../../interface/quotation/IGetQuotationsResponse';
import { ISingleQuotationData } from '../../../../interface/quotation/IGetSingleQuotationResponse';
import { IUpdateQuotationRequest } from '../../../../interface/quotation/quotation';
import { ISingleEnquiryData } from '../../../../interface/enquiry/ISingleEnquiryResponse';
import { resetGetSerialNoRequest } from '../../../../redux/slices/SerialNoSettingSlice';
import useInitialValueHook from '../../../../hooks/useInitialValueHook';

interface Props {
  fromEnquiry?: boolean;
  enquiryId?: string;
  navigation: any;
  item?:IGetQuotationData;
  isEdit?:boolean;
  onSuccess?:() => void;
  showHeader?: boolean;
}

const AddQuotationForm: React.FC<Props> = ({
  fromEnquiry,
  enquiryId,
  navigation,
  isEdit,
  onSuccess,
  item,
  showHeader
}) => {
  const {
    state,
    resetError,
    setPartyNameError,
    setPartyMobileNoError,
    setCompanyNameError,
    setEmployeeNameError,
    setAuthorityMobileNoError,
    setEmployeeMobileNoError,
    setPickupPincodeError,
    setDropPincodeError,
    setItem,
    resetItem,
    setIsEditQuotation,
    setEnquiryItem,
    resetAll,
  } = useQuotationFormContextHook();
  const authId = useAuthId();
  const dispatch = useAppDispatch();
  const {
    addQuotationRequesting,
    addQuotationSuccess,
    addQuotationFailure,
    quotation,
    getQuotationRequesting,
    updateQuotationRequesting,
    updateQuotationSuccess,
    updateQuotationFailure,
  } = useAppSelector(state => state.Quotation);
  // console.log('Single-quotation--', JSON.stringify(quotation));
  // console.log('Single-quotation-state-1--', JSON.stringify(state));
  const {
    vehicleTypesRequesting,
    vehicleCompaniesRequesting,
    vehicleModelsRequesting,
  } = useAppSelector(state => state.Common);
  const {prefix} = useInitialValueHook('658d3c6f585e3dde644da95b');
  const {enquiry} = useAppSelector(state => state.Enquiry);

  const transitInsurance: ITransitInsurance = {
    isRequired: state.transit_insurance,
    transitType: state.transit_insurance_type,
    charges: [
      {
        luggageType: state.transit_shifting_luggage,
        insurancePerc: state.transit_insurance_charge,
        gst: state.transit_insurance_gst,
        value: state.transit_goods_value,
      },
    ],
  };

  const storage: IStorageCharges = {
    isRequired: state.storage,
    storageChargesType: state.storage_duration,
    fromDate: state.storage_from_date,
    toDate: state.storage_to_date,
    amount: state.storage_amount,
  };

  const prepareOtherCharges = (): IOtherCharges[] | null => {
    let otherCharges: IOtherCharges[] = [];
    if (state.other_charges.length > 0) {
      otherCharges = state.other_charges.map(e => {
        const partLoad: IOtherCharge = {
          ratePerItem: e.part_load_rate_per_item,
          amount: e.part_load_amount,
        };
        const fullLoad: IOtherCharge = {
          ratePerItem: e.full_load_rate_per_item,
          amount: e.full_load_amount,
        };
        const otherCharge: IOtherCharges = {
          jobType: e.particular_name,
          qty: e.quantity,
          partLoad: partLoad,
          fullLoad: fullLoad,
        };
        return otherCharge;
      });
      return otherCharges;
    }
    return null;
  };

  const doValidation = () => {
    let valid: boolean = true;
    const {
      party_name,
      party_mobile_no,
      company_name,
      employee_name,
      authority_mobile_no,
      employee_mobile_no,
      pickup_pincode,
      drop_pincode,
      billing_by,
    } = state;
    if (billing_by == billingByOptions[0].label) {
      setCompanyNameError('');
      setAuthorityMobileNoError('');
      setEmployeeMobileNoError('');
      setEmployeeNameError('');
      if (Validator.isEmpty(party_name)) {
        setPartyNameError('Party name required');
        valid = false;
      }
      if (Validator.isEmpty(party_mobile_no)) {
        setPartyMobileNoError('Mobile required');
        valid = false;
      }
    }
    if (billing_by == billingByOptions[1].label) {
      setPartyNameError('');
      setPartyMobileNoError('');
      if (Validator.isEmpty(company_name)) {
        setCompanyNameError('Company name required');
        valid = false;
      }
      if (
        Validator.isEmpty(authority_mobile_no) &&
        Validator.isEmpty(employee_mobile_no)
      ) {
        setEmployeeMobileNoError(
          'Either enter this Mobile No. or Authority Mobile No.',
        );
        setAuthorityMobileNoError(
          'Either enter this Mobile No. or Employee Mobile No.',
        );
        valid = false;
      }
      // if (Validator.isEmpty(employee_name)) {
      //   setEmployeeNameError('Employee name required');
      //   valid = false;
      // }
    }
    // if (Validator.isEmpty(pickup_pincode)) {
    //   setPickupPincodeError('Pincode required');
    //   valid = false;
    // }
    // if (Validator.isEmpty(drop_pincode)) {
    //   setDropPincodeError('Pincode required');
    //   valid = false;
    // }
    return valid;
  };

  const _getQuotationItem = () => {
    let _quotation:ISingleQuotationData|undefined = undefined;
    const {data} = quotation || {};
    if(data) {
      _quotation = data as ISingleQuotationData;
    }
    return _quotation;
  }

  const hanldeSubmit = () => {
    getCurrentCompanyId().then(id => {
      const billingDetails = {
        companyName: state.company_name,
        approvalAuthority: state.approval_authority,
        authorityPersonName: state.authority_person_name,
        authorityPersonMobile: state.authority_mobile_no,
        companyAddress: state.company_address,
        companyGST: state.company_gst,
        employeeName: state.employee_name,
        employeeDesignation: state.employee_designation,
        employeeMobile: state.employee_mobile_no,
        pincode: state.company_pincode,
        state: state.company_state,
        city: state.company_city,
      };
      const payload: IAddQuotationRequest = {
        companyId: id as string,
        customerId: state.customer_id,
        enquiryId: enquiryId || '',
        isAuto: state.is_serial_no_automatic,
        isHeadOffice: true,
        authId: authId,
        shiftingType: state.shifting_type.toUpperCase(),
        shiftingLuggage: state.shifting_luggage,
        vehicleType: state.vehicle_type,
        manufacture: state.vehicle_manufacturer,
        model: state.vehicle_model,
        templateId: '5555',
        quotationDate: state.date_of_quotation,
        quotationNumber: state.quotation_no,
        enquirySource: '',
        partyCompanyName: billingDetails.companyName,
        partyName: state.party_name,
        email: '',
        mobile: state.party_mobile_no,
        shiftingDate: state.date_of_moving,
        pickupAddress: {
          shiftingFrom: state.pickup_city,
          state: state.pickup_state,
          city: state.pickup_city,
          address: state.pickup_address,
          pincode: state.pickup_pincode,
          locality: '',
          landmark: '',
          floor: state.pickup_current_floor,
          isLiftAvailable: state.pickup_lift_status,
        },
        dropAddress: {
          shiftingTo: state.drop_city as string,
          state: state.drop_state as string,
          city: state.drop_city as string,
          address: state.drop_address,
          locality: '',
          pincode: state.drop_pincode as string,
          landmark: '',
          floor: state.drop_current_floor as string,
          isLiftAvailable: state.drop_lift_status,
        },
        partLoad: state?.freight_part_load,
        fullLoad: state?.freight_full_load,
        openBody: true,
        closeBody: true,
        lorryType: state.lorry_type,
        freightChargesStatus: 'NOT_REQUIRED',
        partLoadCharge: state.freight_part_charge,
        fullLoadCharge: state.freight_full_charge,
        packagingChargesStatus: state.packing_charge,
        packagingPartLoadCharges: state.packing_charge_part_load,
        packagingFullLoadCharges: state.packing_charge_full_load,
        unPackagingChargesStatus: state.unpacking_charge,
        unPackagingPartLoadCharges: state.unpacking_charge_part_load,
        unPackagingFullLoadCharges: state.unpacking_charge_full_load,
        unLoadingChargesStatus: state.unloading_charge,
        unLoadingPartLoadCharges: state.unloading_charge_part_load,
        unLoadingFullLoadCharges: state.unloading_charge_full_load,
        packingMaterialChargesStatus: state.packing_material_charge,
        packingMaterialPartLoadCharges: state.packing_material_charge_part_load,
        packingMaterialFullLoadCharges: state.packing_material_charge_full_load,
        loadingChargesStatus: state.loading_charge,
        loadingPartLoadCharges: state.loading_charge_part_load,
        loadingFullLoadCharges: state.loading_charge_full_load,
        gstStatus: state.gst_in_quotation,
        gstType: state?.gst_type,
        gstPercentage: state.gst_percent,
        surchargeIsRequired: state.surcharge,
        surchargeCharges: state.surcharge_percent,
        discountType: state.discount_in_quotation,
        discountAmount: state.discount_percent_or_value,
        transitInsurance:
          state.transit_insurance == options2[0] ? transitInsurance : null,
        storageCharges: state.storage == options2[0] ? storage : null,
        otherCharges: prepareOtherCharges(),
        quotationAmount: '1000', // README: Mock quotation amount
        advanceAmount: state.advance_amount,
        billingBy: state.billing_by,
        billingDetails:
          state.billing_by == billingByOptions[1].label ? billingDetails : {},
        otherDetail1: state.other_detail_1,
        otherDetail2: state.other_detail_2,
        easy_access_for_loading_unloading: state.other_detail_3,
        any_restrcition_for_loading_unloading: state.other_detail_4,
        addedBy: authId,
      };
      resetError();
      if (doValidation()) {
        if(isEdit) {
          delete payload.customerId;
          // delete payload.enquiryId;
          const updatePayload:IUpdateQuotationRequest = {
            params: item?._id as string,
            payload: payload,
          }
          dispatch(updateQuotationRequest(updatePayload));
        } else {
          dispatch(addQuotationRequest(payload));
        }
      } else {
        showToast('Form is not filled properly. Please check!', ToastType.ERROR);
      }
    }).catch(err => console.log(err));
    
  };

  const _getQuotationsRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetQuotationRequest = {
        companyId: id as string,
      };
      dispatch(getQuotationsRequest(payload));
    }).catch(err => console.log(err));
  };

  const _getSingleEnquiry = () => {
    let _enquiry:ISingleEnquiryData;
    const {data} = enquiry || {};
    if(data && Array.isArray(data) && data.length > 0) {
      _enquiry = data[0];
    }
    //@ts-ignore
    return _enquiry;
  }

  useEffect(() => {
    if(isEdit) {
      resetAll();
      setItem(_getQuotationItem() as ISingleQuotationData)
      setIsEditQuotation(isEdit);
    }
    if(fromEnquiry) {
      setEnquiryItem(_getSingleEnquiry());
    }
  }, []);

  useEffect(() => {
    return () => {
      resetAll();
    }
  }, []);

  useEffect(() => {
    if (!addQuotationRequesting && addQuotationSuccess) {
      showToast('New Quotation Created.', ToastType.SUCCESS);
      dispatch(resetaddQuotationRequest());
      dispatch(resetGetSerialNoRequest());
      _getQuotationsRequest();
      if(onSuccess) {
        onSuccess();
      } else {
        navigation?.goBack();
      }
    } else if (!addQuotationRequesting && addQuotationFailure) {
      showToast('Quotation Not Created. Try again!', ToastType.ERROR);
      dispatch(resetaddQuotationRequest());
    }
  }, [addQuotationRequesting, addQuotationSuccess, addQuotationFailure]);

  useEffect(() => {
    if (!updateQuotationRequesting && updateQuotationSuccess) {
      showToast('Quotation Updated.', ToastType.SUCCESS);
      dispatch(resetUpdateQuotationRequest());
      if(isEdit) {
        resetAll();
      }
      _getQuotationsRequest();
      if(onSuccess) {
        onSuccess();
      } else {
        navigation?.goBack();
      }
    } else if (!updateQuotationRequesting && updateQuotationFailure) {
      showToast('Quotation Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdateQuotationRequest());
    }
  }, [updateQuotationRequesting, updateQuotationSuccess, updateQuotationFailure]);

  return (
    <>
      <BasicDetails fromEnquiry={fromEnquiry} />
      <Spacer height={4} />
      <PickupAddressView fromEnquiry={fromEnquiry} />
      <Spacer height={4} />
      <DropAddressView fromEnquiry={fromEnquiry} />
      <Spacer height={4} />
      <FreightDetailsView />
      <Spacer height={4} />
      <InsuranceDetailsView />
      <Spacer height={4} />
      <StorageChargesView />
      <Spacer height={4} />
      <OtherDetailsView />
      <Spacer height={12} />
      <Button
        text={isEdit ? 'UPDATE' : 'CREATE'}
        onPress={hanldeSubmit}
        disabled={addQuotationRequesting}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      
      />
      <Spacer height={12} />
      <Spinner
        show={
          addQuotationRequesting ||
          getQuotationRequesting ||
          vehicleTypesRequesting ||
          vehicleCompaniesRequesting ||
          vehicleModelsRequesting
        }
      />
    </>
  );
};

export default AddQuotationForm;
