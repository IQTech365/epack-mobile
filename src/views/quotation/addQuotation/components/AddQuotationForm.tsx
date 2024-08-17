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
import {
  IEnquiry,
  IGetQuotationData,
} from '../../../../interface/quotation/IGetQuotationsResponse';
import {ISingleQuotationData} from '../../../../interface/quotation/IGetSingleQuotationResponse';
import {IUpdateQuotationRequest} from '../../../../interface/quotation/quotation';
import {ISingleEnquiryData} from '../../../../interface/enquiry/ISingleEnquiryResponse';
import {
  getSerialNoRequest,
  resetGetSerialNoRequest,
} from '../../../../redux/slices/SerialNoSettingSlice';
import useInitialValueHook from '../../../../hooks/useInitialValueHook';
import useUtilityHook from '../../../../hooks/useUtilityHook';
import SurveyItemQuotation from './SurveyItemQuotation';
import {
  IAddSurveyItemPayload,
  IAddSurveyItemRequest,
  ISurveyListItem,
} from '../../../../interface/enquiry/IAddSurveyItemRequest';
import {
  addSurveyItemRequest,
  getSurveyItemListRequest,
  resetAddSurveyItemRequest,
  updateSurveryItemListRequest,
} from '../../../../redux/slices/EnquirySlice';
import useSerialNoHook from '../../../../hooks/useSerialNo';
import {Text, View} from 'react-native';
import {
  DOCUMENT_TYPE,
  IGetSerialNoRequest,
} from '../../../../interface/setting/serialNo/serialNo';
import { IGetSurvyeItemListByQuotationIdRequestPayload } from '../../../../interface/enquiry/IGetSurveyItemListResponse';
import { IUpdateSurveyItemRequest } from '../../../../interface/enquiry/enquiry';

interface Props {
  fromEnquiry?: boolean;
  enquiryId?: string;
  navigation: any;
  item?: IGetQuotationData;
  isEdit?: boolean;
  onSuccess?: () => void;
  showHeader?: boolean;
  enquiryData?: IEnquiry;
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

  const {surveyItemList} = useAppSelector(state=> state.Enquiry)

  const {
    vehicleTypesRequesting,
    vehicleCompaniesRequesting,
    vehicleModelsRequesting,
  } = useAppSelector(state => state.Common);
  const {
    enquiry,
    addSurveyItemRequesting,
    addSurveyItemSuccess,
    addSurveyItemFailure,
  } = useAppSelector(state => state.Enquiry);

  const {getTotalDocumentCount} = useUtilityHook();
  const [surveyNo, setSurveyNo] = useState('');
  const serialNo: number = useSerialNoHook();
  const [surveyOtherItemList, setSurveyOtherItemList] = useState<ISurveyListItem[]>([]);
  const [groupSruveyItems, setGroupSurveyItems] = useState<ISurveyListItem[]>([]);
  const [shouldSaveSurveyNo, setShouldSaveSurveyNo] = useState<boolean>(false);
  const [isSurveyItemsRequired, setIsSurveyItemsRequired] = useState<boolean>(false);

  const {initialValue} = useInitialValueHook('658d3d2f585e3dde644da9b2');

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
    if (Validator.isEmpty(quotation_no)) {
      setQuotationNoError('Quotation# required');
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

  const _setGroupItems = () => {
    let groupItems: ISurveyListItem[] = [];
    if (
      surveyItemList &&
      surveyItemList?.data &&
      surveyItemList?.data.length > 0 &&
      surveyItemList?.data?.[0]?.surveyItems &&
      surveyItemList?.data?.[0]?.surveyItems?.length > 0
    ) {
      groupItems = surveyItemList?.data?.[0].surveyItems?.filter(
        (it: ISurveyListItem) => it.groupID !== "0",
      );
      setGroupSurveyItems(groupItems);
    }
  };

  const _setOtherSurveyItems = () => {
    let otherGroupItems: ISurveyListItem[] = [];
    if (
      surveyItemList &&
      surveyItemList?.data &&
      surveyItemList?.data.length > 0 &&
      surveyItemList?.data?.[0]?.surveyItems &&
      surveyItemList?.data?.[0]?.surveyItems?.length > 0
    ) {
      otherGroupItems = surveyItemList?.data?.[0].surveyItems?.filter(
        (it: ISurveyListItem) => it.groupID === "0",
      );
      setSurveyOtherItemList(otherGroupItems);
    }
  };

  const _getQuotationItem = () => {
    let _quotation: ISingleQuotationData | undefined = undefined;
    const {data} = quotation || {};
    if (data) {
      _quotation = data as ISingleQuotationData;
    }
    return _quotation;
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
        dispatch(getSerialNoRequest(payload));
      })
      .catch(err => console.log('err--', err));
  };

  const _handleSaveChanges = () => {
    const payload: IUpdateSurveyItemRequest = {
      surveyId: surveyItemList.data[0]._id,
      //@ts-ignore
      payload: {
        surveyItems: [...groupSruveyItems, ...surveyOtherItemList],
      },
    };
    dispatch(updateSurveryItemListRequest(payload));
  };

  const collectSelectedGroupItems = (itemName: string, qty: string, cft: string, groupId: string) => {
    const copy = [...groupSruveyItems];
    const isItemExist = copy.find(it => it.itemName === itemName);
    if(isItemExist && qty === '0' && cft === '0') {
      const filteredItems = copy.filter(it => it.itemName !== itemName);
      setGroupSurveyItems(filteredItems);
    } else if (isItemExist && qty !== '0'){
      const itemIndex = copy.findIndex(it => it.itemName === itemName);
      if(itemIndex !== -1) {
        const updatedItem:ISurveyListItem = {
          itemName: itemName,
          quantity: qty,
          cftValue: cft,
          valueOfGoods: '',
          remarks: '',
          groupID: groupId,
        }
        copy[itemIndex] = updatedItem;
        setGroupSurveyItems(copy);
      }
    } else {
      const newItem:ISurveyListItem = {
        itemName: itemName,
        quantity: qty,
        cftValue: cft,
        valueOfGoods: '',
        remarks: '',
        groupID: groupId,
      }
      copy.push(newItem);
      setGroupSurveyItems(copy);
    }
  }

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
            _handleSaveChanges()
          } else {
            console.log("payloadQuotation",payload)
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
      .then(id => {
        const payload: IAddSurveyItemPayload = {
          companyId: id as string,
          enquiryId: enquiryId ? (enquiryId as string) : addQuotationInfo.data.enquiryId,
          quotationId: addQuotationInfo.data.quotationId,
          surveyListNo: serialNo ? serialNo.toString() : state.quotation_no,
          surveyDate: state.date_of_quotation,
          surveyItems: [...groupSruveyItems, ...surveyOtherItemList],
          addedBy: authId,
          isAuto: true,
          isHeadOffice: true,
        };
        dispatch(addSurveyItemRequest(payload));
      })
      .catch(err => console.log(err));
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
  };

  const _handleSuveyItemRequired = (value: boolean) => {
    setIsSurveyItemsRequired(value);
  };

  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSurvyeItemListByQuotationIdRequestPayload = {
          companyId: id as string,
          quotationId: item?._id,
          // id: addQuotationInfo.data._id
        };
        console.log("payload1212",payload)
        //@ts-ignore
        dispatch(getSurveyItemListRequest(payload));

      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (fromEnquiry) {
      setEnquiryItem(_getSingleEnquiry());
    }
  }, []);

  useEffect(()=>{
  if(isEdit){
    _getSurveyItemListRequest();
  }
  },[isEdit])

  useEffect(() => {
    if(isEdit && surveyItemList) {
      _setGroupItems();
      _setOtherSurveyItems();
    }
  }, [isEdit, surveyItemList]);

  useEffect(() => {
    if (!addQuotationRequesting && addQuotationSuccess) {
      showToast('New Quotation Created.', ToastType.SUCCESS);
      setShouldSaveSurveyNo(true);
      dispatch(resetaddQuotationRequest());
      dispatch(resetGetSerialNoRequest());
      _getQuotationsRequest();
      if (isSurveyItemsRequired) {
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
  }, [addQuotationRequesting, addQuotationSuccess, addQuotationFailure]);

  useEffect(() => {
    if (serialNo && shouldSaveSurveyNo && isSurveyItemsRequired) {
      handleSave();
    }
  }, [serialNo, shouldSaveSurveyNo, isSurveyItemsRequired]);

  useEffect(() => {
    if (!addSurveyItemRequesting && addSurveyItemSuccess) {
      dispatch(resetAddSurveyItemRequest());
      if (onSuccess) {
        onSuccess();
      } else {
        navigation?.goBack();
      }
    } else if (!addSurveyItemRequesting && addSurveyItemFailure) {
      dispatch(resetAddSurveyItemRequest());
    }
  }, [addSurveyItemRequesting, addSurveyItemSuccess, addSurveyItemFailure]);

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
      <BasicDetails
        fromEnquiry={fromEnquiry}
        isEdit={isEdit}
        item={item}
        enquiryData={enquiryData}
      />
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
        isEdit={isEdit}
        item={item}
        surveyItemList={surveyItemList}
        surveyOtherItemList={surveyOtherItemList}
        handleOtherItemsList={_handleOhterItemsList}
        onSurveyItemRequired={_handleSuveyItemRequired}
        onSelectGroupItems={collectSelectedGroupItems}
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
