import React, {useEffect, useRef, useState} from 'react';
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
import {getCurrentCompanyId} from '../../../../utils/storage';
import {IEnquiry, IGetQuotationData} from '../../../../interface/quotation/IGetQuotationsResponse';
import {ISingleQuotationData} from '../../../../interface/quotation/IGetSingleQuotationResponse';
import {IUpdateQuotationRequest} from '../../../../interface/quotation/quotation';
import {ISingleEnquiryData} from '../../../../interface/enquiry/ISingleEnquiryResponse';
import {getSerialNoRequest, resetGetSerialNoRequest} from '../../../../redux/slices/SerialNoSettingSlice';
import useInitialValueHook from '../../../../hooks/useInitialValueHook';
import useUtilityHook from '../../../../hooks/useUtilityHook';
import SurveyItemQuotation from './SurveyItemQuotation';
import { IAddSurveyItemPayload, IAddSurveyItemRequest, ISurveyListItem } from '../../../../interface/enquiry/IAddSurveyItemRequest';
import { addSurveyItemRequest } from '../../../../redux/slices/EnquirySlice';
import useSerialNoHook from '../../../../hooks/useSerialNo';
import { Text, View } from 'react-native';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../../interface/setting/serialNo/serialNo';

interface Props {
  fromEnquiry?: boolean;
  enquiryId?: string;
  navigation: any;
  item?: IGetQuotationData;
  isEdit?: boolean;
  onSuccess?: () => void;
  showHeader?: boolean;
  enquiryData?:IEnquiry;
}

const AddQuotationForm: React.FC<Props> = ({
  fromEnquiry,
  enquiryId,
  navigation,
  isEdit,
  onSuccess,
  item,
  showHeader,
  enquiryData,
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
    setQuotationNoError,
    setEnquiryItem,
    resetAll,
  } = useQuotationFormContextHook();
  const authId = useAuthId();
  const dispatch = useAppDispatch();

  // console.log("useSerialNoHook",useSerialNoHook)

  // console.log("itemDatawithQuotation",item)
  const {
    addQuotationRequesting,
    addQuotationSuccess,
    addQuotationFailure,
    quotation,
    getQuotationRequesting,
    updateQuotationRequesting,
    updateQuotationSuccess,
    updateQuotationFailure,
    addQuotationInfo,
  } = useAppSelector(state => state.Quotation);

  const {
    vehicleTypesRequesting,
    vehicleCompaniesRequesting,
    vehicleModelsRequesting,
  } = useAppSelector(state => state.Common);
  const {enquiry} = useAppSelector(state => state.Enquiry);
  const {getTotalDocumentCount} = useUtilityHook();
  const [surveyNo, setSurveyNo] = useState('');
  const serialNo: number = useSerialNoHook();
  const [itemName, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [surveyOtherItemList, setSurveyOtherItemList] = useState<ISurveyListItem[]>([]);
  const [checkboxSurveyItems, setCheckboxSurveyItems] = useState<ISurveyListItem[]>([]);
  const [shouldSaveSurveyNo, setShouldSaveSurveyNo] = useState<boolean>(false);
  const shouldSaveSurveyNoRef = useRef<Boolean>(false);
  const [isSurveyItemsRequired, setIsSurveyItemsRequired] = useState<boolean>(false);

  const {initialValue} = useInitialValueHook('658d3d2f585e3dde644da9b2');
  console.log('initialValue----', initialValue);
  

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
      quotation_no,
    } = state;
    if(Validator.isEmpty(quotation_no)) {
      setQuotationNoError("Quotation# required");
      valid = false;
    }
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
    }

    return valid;
  };

  const _getQuotationItem = () => {
    let _quotation: ISingleQuotationData | undefined = undefined;
    const {data} = quotation || {};
    if (data) {
      _quotation = data as ISingleQuotationData;
    }
    return _quotation;
  };

  const handleItemSelect = (item: string, qty: number) => {
    setCheckboxSurveyItems((prevItems) => {
      const updatedItems = [...prevItems];
      const index = updatedItems.findIndex((i) => i.itemName === item);
      if (index >= 0) {
        updatedItems[index].quantity = qty.toString();
      } else {
        updatedItems.push({ itemName: item, quantity: qty });
      }
      return updatedItems;
    });
  };

  const handleItemDeselect = (item: string) => {
    setCheckboxSurveyItems((prevItems) => prevItems.filter((i) => i.itemName !== item));
  };

  const _getSerialNoRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSerialNoRequest = {
          document: DOCUMENT_TYPE.SURVEY_ITEM,
          payload: {
            activeCount: initialValue,
            companyId: id as string,
            isAuto: true,
            isHeadOffice: true,
          },
        };
        console.log("payloadSerial",payload)
        dispatch(getSerialNoRequest(payload));
      })
      .catch(err => console.log('err--', err));
  };

  const hanldeSubmit = () => {
    getCurrentCompanyId()
      .then(id => {
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
          packingMaterialPartLoadCharges:
            state.packing_material_charge_part_load,
          packingMaterialFullLoadCharges:
            state.packing_material_charge_full_load,
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
          if (isEdit) {
            delete payload.customerId;
            // delete payload.enquiryId;
            const updatePayload: IUpdateQuotationRequest = {
              params: item?._id as string,
              payload: payload,
            };              
            dispatch(updateQuotationRequest(updatePayload));
          } else {
            console.log(payload,"data----");
            dispatch(addQuotationRequest(payload));
          }
        } else {
          showToast(
            'Form is not filled properly. Please check!',
            ToastType.ERROR,
          );
        }
      })
      .catch(err => console.log(err));
  };
  const handleSave = () => {
    getCurrentCompanyId()
      .then((id) => {
        const payload: IAddSurveyItemPayload = {
          companyId: id as string,
          enquiryId: enquiryId as string,
          quotationId: addQuotationInfo.data.quotationId,
          surveyListNo: serialNo ? serialNo.toString() : state.quotation_no,
          surveyDate: state.date_of_quotation,
          surveyItems: [...checkboxSurveyItems, ...surveyOtherItemList],
          addedBy: authId,
          isAuto: true,
          isHeadOffice: true,
        };
        dispatch(addSurveyItemRequest(payload));
      })
      .catch((err) => console.log(err));
  };
  const _getQuotationsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetQuotationRequest = {
          companyId: id as string,
        };
        dispatch(getQuotationsRequest(payload));
      })
      .catch(err => console.log(err));
  };
  const _getSingleEnquiry = () => {
    let _enquiry: ISingleEnquiryData;
    const {data} = enquiry || {};
    if (data && Array.isArray(data) && data.length > 0) {
      _enquiry = data[0];
    }
    //@ts-ignore
    return _enquiry;
  };
  const _handleOhterItemsList = (item: ISurveyListItem) => {
    const copy = [...surveyOtherItemList];
    copy.push(item);
    setSurveyOtherItemList(copy);
  }

  const _handleSuveyItemRequired = (value: boolean) => {
    setIsSurveyItemsRequired(value);
  }

  useEffect(() => {
    // if(isEdit) {
    //   resetAll();
    // }
    if (fromEnquiry) {
      setEnquiryItem(_getSingleEnquiry());
    }
  }, []);
  // _getSerialNoRequest()
  console.log("serialNo",serialNo)

  useEffect(() => {
    if (!addQuotationRequesting) {
      if (addQuotationSuccess) {
        showToast('New Quotation Created.', ToastType.SUCCESS);
        setShouldSaveSurveyNo(true);
        dispatch(resetaddQuotationRequest());
        dispatch(resetGetSerialNoRequest());
        if(isSurveyItemsRequired) {
          _getSerialNoRequest();
        } else {
          _getQuotationsRequest();
          getTotalDocumentCount();
          if (onSuccess) {
            onSuccess();
          } else {
            navigation?.goBack();
          }
        }
      } else if (addQuotationFailure) {
        showToast('Quotation Not Created. Try again!', ToastType.ERROR);
        dispatch(resetaddQuotationRequest());
      }
    }
  }, [addQuotationRequesting, addQuotationSuccess, addQuotationFailure]);

  useEffect(() => {
    if (serialNo && shouldSaveSurveyNo && isSurveyItemsRequired) {
      console.log('new-srno---', serialNo);
      handleSave();
    }
  }, [serialNo, shouldSaveSurveyNo, isSurveyItemsRequired]);

  useEffect(() => {
    if (!updateQuotationRequesting && updateQuotationSuccess) {
      showToast('Quotation Updated.', ToastType.SUCCESS);
      dispatch(resetUpdateQuotationRequest());
      _getQuotationsRequest();
      if (onSuccess) {
        onSuccess();
      } else {
        navigation?.goBack();
      }
    } else if (!updateQuotationRequesting && updateQuotationFailure) {
      showToast('Quotation Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdateQuotationRequest());
    }
  }, [
    updateQuotationRequesting,
    updateQuotationSuccess,
    updateQuotationFailure,
  ]);  

  return (
    <>
      <BasicDetails fromEnquiry={fromEnquiry} isEdit={isEdit} item={item} enquiryData={enquiryData} />
      <Spacer height={4} />
      <PickupAddressView
        fromEnquiry={fromEnquiry}
        isEdit={isEdit}
        item={item}
      />
      <Spacer height={4} />
      <DropAddressView fromEnquiry={fromEnquiry} isEdit={isEdit} item={item} />
      <Spacer height={4} />
      <FreightDetailsView
        isEdit={isEdit}
        item={item}
        quotationData={_getQuotationItem()}
      />
      <Spacer height={4} />
      <InsuranceDetailsView
        isEdit={isEdit}
        item={item}
        quotationData={_getQuotationItem()}
      />
      <Spacer height={4} />
      <StorageChargesView
        isEdit={isEdit}
        item={item}
        quotationData={_getQuotationItem()}
      />
      <Spacer height={4} />
      <OtherDetailsView
        isEdit={isEdit}
        item={item}
        quotationData={_getQuotationItem()}
      />

     <Spacer height={4} />
     <SurveyItemQuotation
      item={item}
      onItemSelect={handleItemSelect}
      onItemDeselect={handleItemDeselect}
      surveyOtherItemList={surveyOtherItemList} // Pass the state as prop
      handleOtherItemsList={_handleOhterItemsList}
      onSurveyItemRequired={_handleSuveyItemRequired}
      />
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
