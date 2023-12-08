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
import useCompanyId from '../../../../hooks/useCompanyId';
import useAuthId from '../../../../hooks/useAuthId';
import {options2} from './FreightDetailsView/components/utils';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  addQuotationRequest,
  getQuotationsRequest,
  resetaddQuotationRequest,
} from '../../../../redux/slices/QuotationSlice';
import {IGetQuotationRequest} from '../../../../interface/quotation/IGetQuotationRequest';
import Toast from 'react-native-toast-message';
import billingByOptions from '../../../../data/billingByOptions.json';
import Spinner from '../../../../common/Spinner';

interface Props {
  fromEnquiry?: boolean;
  enquiryId?: string;
  navigation: any;
}

const AddQuotationForm: React.FC<Props> = ({
  fromEnquiry,
  enquiryId,
  navigation,
}) => {
  const {state} = useQuotationFormContextHook();
  const companyId = useCompanyId();
  const authId = useAuthId();
  const dispatch = useAppDispatch();
  const {
    addQuotationRequesting,
    addQuotationSuccess,
    addQuotationFailure,
    addQuotationInfo,
    quotation,
    getQuotationRequesting,
  } = useAppSelector(state => state.Quotation);

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
  };

  const payload: IAddQuotationRequest = {
    companyId: companyId,
    enquiryId: enquiryId || '',
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
    partyCompanyName: '',
    partyName: state.party_name,
    email: '',
    mobile: state.party_mobile_no,
    shiftingDate: state.date_of_moving,
    pickupAddress: {
      shiftingFrom: state.pickup_city,
      state: state.pickup_state,
      city: state.pickup_city,
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
    transitInsurance: state.transit_insurance == options2[0] ? transitInsurance : null,
    storageCharges: state.storage == options2[0] ? storage : null,
    otherCharges: prepareOtherCharges(),
    quotationAmount: '1000',// README: Mock quotation amount
    advanceAmount: state.advance_amount,
    billingBy: state.billing_by,
    billingDetails: state.billing_by == billingByOptions[1].label ? billingDetails : {},
    otherDetail1: state.other_detail_1,
    otherDetail2: state.other_detail_2,
    easy_access_for_loading_unloading: state.other_detail_3,
    any_restrcition_for_loading_unloading: state.other_detail_4,
  };

  const hanldeSubmit = () => {
    console.log('AddQuotationForm--payload--',JSON.stringify(payload, null, ' '),);
    dispatch(addQuotationRequest(payload));
  };

  useEffect(() => {
    if (!addQuotationRequesting && addQuotationSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Quotation',
        text2: 'Quotation has been added successfully',
      });
      dispatch(resetaddQuotationRequest());
      const payload: IGetQuotationRequest = {
        //Note: we can also pass branchId, authId, or id to get the quotation info.
        companyId: companyId,
      };
      dispatch(getQuotationsRequest(payload));
      navigation?.goBack();
    } else if (!addQuotationRequesting && addQuotationFailure) {
      Toast.show({
        type: 'error',
        text1: 'Quotation',
        text2: 'Error in adding Quotation. Please try again!',
      });
      dispatch(resetaddQuotationRequest());
    }
  }, [addQuotationRequesting, addQuotationSuccess, addQuotationFailure]);

  return (
    <>
      <BasicDetails />
      <Spacer height={4} />
      <PickupAddressView />
      <Spacer height={4} />
      <DropAddressView />
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
        text="PREVIEW"
        onPress={hanldeSubmit}
        disabled={false}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={12} />
      <Spinner show={addQuotationRequesting || getQuotationRequesting} />
    </>
  );
};

export default AddQuotationForm;
