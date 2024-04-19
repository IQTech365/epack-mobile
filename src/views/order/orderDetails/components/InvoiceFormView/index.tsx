import React, { useEffect, useRef } from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY4} from '../../../../../utils/colors';
import styles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {billingByOptions, modeOfMovingOptions} from './utils';
import InvoiceToIndividualView from './components/InvoiceToIndividualView';
import InvoiceToCompanyView from './components/InvoiceToCompanyView';
import FreightDetailsView from './components/FreightDetailsView';
import {useInvoiceFormContextHook} from '../../../../../provider/InvoiceFormContextProvider';
import TransitInsuranceView from './components/TransitInsuranceView';
import StorageChargeView from './components/StorageChargeView';
import Button from '../../../../../common/Button';
import {
  ICreateInvoiceRequest,
  IInvoiceBillingInfo,
  IInvoiceOtherCharge,
  IInvoicePickupAddress,
  IInvoiceStorageCharge,
  IInvoiceTransitInsurance,
  IInvoiceTransitInsuranceCharge,
} from '../../../../../interface/order/ICreateInvoiceRequest';
import { IOtherCharge, ITransitCharge } from './InvoiceReducer2';
import { formatDate4 } from '../../../../../utils/formatter';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { createInvoiceRequest, getInvoiceListRequest, resetCreateInvoiceRequest, resetUpdateInvoiceRequest, updateInvoiceRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import { ToastType, showToast } from '../../../../../utils/utility';
import { ISingleEnquiryData } from '../../../../../interface/enquiry/ISingleEnquiryResponse';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../../../interface/setting/serialNo/serialNo';
import { getSerialNoRequest, resetGetSerialNoRequest } from '../../../../../redux/slices/SerialNoSettingSlice';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
import { IInvoice } from '../../../../../interface/order/IGetInvoiceListResponse';
import { IUpdateInvoicePayload } from '../../../../../interface/order/IUpdateInvoiceResponse';
import VehicleInfoView from './components/VehicleInfoView';

interface IInvoiceFormViewProps {
  orderId: string;
  item: ISingleEnquiryData;
  onSuccess: () => void;
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const InvoiceFormView: React.FC<IInvoiceFormViewProps> = ({orderId, item, onSuccess, isEdit = false, invoiceData}) => {
  const {
    state,
    setSameAsClientAddress,
    setBillingType,
    setInvoiceNo,
    setDateOfInvoice,
    setDateOfDelivery,
    setModeOfMoving,
    setVehicleNo,
    setConsignmentNo,
    setShiftingLuggage,
  } = useInvoiceFormContextHook();
  const dispatch = useAppDispatch();
  const {
    createInvoiceRequesting,
    createInvoiceSuccess,
    createInvoiceFailure,
    order,
    //
    updateInvoiceRequesting,
    updateInvoiceSuccess,
    updateInvoiceFailure,
  } = useAppSelector(state => state.Order);
  const {data: orderData} = order || {};

  const {initialValue, prefix} = useInitialValueHook('658d3ce2585e3dde644da98c');
  const serialNo:number = useSerialNoHook();
  const invoiceDateRef = useRef(null);
  const dateOfDeliveryRef = useRef(null);
  const vehicleInputRef = useRef(null);
  const movingModeRef = useRef(null);
  const consignmentNoRef = useRef(null);

  const getSingleOrder = () => {
    let order: ISingleEnquiryData;
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      order = orderData[0];
    }
    //@ts-ignore
    return order;
  };

  const _getShiftingLuggageOptions = ():TDropdownItem[] => {
    let options:TDropdownItem[] = [];
    const order:ISingleEnquiryData = getSingleOrder();
    if(order) {
      const {shiftingLuggage} = order;
      if(shiftingLuggage && shiftingLuggage.length > 0) {
        options = shiftingLuggage.map((d:string) => {
          const option:TDropdownItem = {
            label:d,
            value:d
          }
          return option;
        });
      }
    }
    return options
  }

  const _setShiftingLuggage = () => {
    const options:TDropdownItem[] = _getShiftingLuggageOptions();
    if(options && options.length > 0) {
      const firstOption = options[0];
      setShiftingLuggage(firstOption.label);
    }
  }

  const _getSerialNoRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetSerialNoRequest = {
        document: DOCUMENT_TYPE.INVOICE,
        payload: {
          activeCount: initialValue,
          companyId: id as string,
          isAuto: true,
          isHeadOffice: true,
        }
      }
      dispatch(getSerialNoRequest(payload));
    }).catch(err => console.log('err--', err));
  }

  const _transformTransitCharge = ():IInvoiceTransitInsuranceCharge[] => {
    let list:IInvoiceTransitInsuranceCharge[] = [];
    if(state.transit_charges.length > 0) {
      list = state.transit_charges.map((d:ITransitCharge) => {
        const item:IInvoiceTransitInsuranceCharge = {
          luggageType: d.transit_luggage,
          insurancePerc: d.transit_insurance_charge,
          gst: d.transit_insurance_gst,
          value: d.transit_goods_value,
        }
        return item;
      })
    }
    return list;
  }

  const _getTransitInsurance = (): IInvoiceTransitInsurance => {
    const transitInsurance: IInvoiceTransitInsurance = {
      isRequired: state.transit_insurance,
      transitType: state.transit_insurance_type,
      charges: _transformTransitCharge(),
    };
    return transitInsurance;
  };

  const _getOtherCharges = (): IInvoiceOtherCharge[] => {
    let otherCharges: IInvoiceOtherCharge[] = [];
    if(state.other_charges.length > 0) {
      otherCharges = state.other_charges.map((d:IOtherCharge) => {
        const item:IInvoiceOtherCharge = {
          item: d.particular_name,
          HSNCode: d.hsn_code,
          qty: d.quantity,
          rate: d.rate_per_item,
          amount: d.amount,
        }
        return item;
      })
    }
    return otherCharges;
  };

  const _getStorageCharge = (): IInvoiceStorageCharge => {
    let storgeCharge: IInvoiceStorageCharge = {
      isRequired: state.storage,
      storageChargesType: state.storage_duration,
      fromDate: state.storage_from_date,
      toDate: state.storage_to_date,
      amount: state.storage_amount,
    };
    return storgeCharge;
  };

  const handleCreateInvoice = () => {
    getCurrentCompanyId().then(id => {
      const billingInfo: IInvoiceBillingInfo = {
        companyName: state.company_name,
        approvalAuthority: state.approval_authority,
        authorityPersonName: state.authority_person_name,
        authorityPersonMobile: state.authority_mobile_no,
        companyAddress: state.company_address,
        companyGST: state.company_gst,
        employeeName: state.employee_name,
        employeeDesignation: state.employee_designation,
        employeeMobile: state.employee_mobile_no,
        state: state.state,
        city: state.city,
        pincode: state.pincode,
      };
  
      const pickupAddress: IInvoicePickupAddress = {
        shiftingFrom: state.same_as_client_address ? item.pickupAddress.city : state.city,
        state: state.same_as_client_address ? item.pickupAddress.state : state.state,
        city: state.same_as_client_address ? item.pickupAddress.city : state.city,
        address: state.same_as_client_address ? item.pickupAddress.address : state.address,
        pincode: state.same_as_client_address ? item.pickupAddress.pincode : state.pincode,
        landmark: '',
        locality: '',
        floor: item.pickupAddress.floor,
        isLiftAvailable: item.pickupAddress.isLiftAvailable,
      };
      const payload: ICreateInvoiceRequest = {
        enquiryId: orderId,
        companyId: id as string,
        isAuto: true,
        isHeadOffice: true,
        // branchId: '',
        // franchiseId: '',
        serialNo: state.invoice_no,
        shiftingLuggage: state.shifting_luggage,
        templateId: '',
        invoiceData: state.date_of_invoice,
        vehicleNo: state.vehicle_no,
        consignmentNo: state.consignment_no,
        movingMode: state.mode_of_moving,
        deliveryDate: state.date_of_delivery,
        vehicleType: state.vehicleType,
        manufacture: state.manufacture,
        model: state.model,
        vehicleLoadSize: state.vehicle_load_size,
        partyName: state.party_name,
        mobile: state.party_mobile_no,
        billingBy: state.billing_type,
        billingDetails:
          state.billing_type == billingByOptions[1] ? billingInfo : '',
        pickupAddress: pickupAddress,
        openBody: false,
        closeBody: false,
        seperate: '',
        sharing: '',
        isPartLoad: state.freight_load_type == 'Part Load' ? 'true': 'false',
        isFullLoad: state.freight_load_type == 'Full Load' ? 'true': 'false',
        freightCharges: state.freight_charges,
        freightHSNCode: state.freight_hsn,
  
        pickupChargesStatus: state.pickup_charge,
        pickupChargesAmount: state.pickup_charge_amount,
        pickupHSNCode: state.pickup_charge_hsn,
  
        doorDeliveryStatus: state.door_delivery_charge,
        doorDeliveryAmount: state.door_delivery_amount,
        doorDeliveryHSNCode: state.door_delivery_hsn,
  
        packagingChargesStatus: state.packing_charge,
        packagingChargesAmount: state.packing_amount,
        packagingHSNCode: state.packing_hsn,
  
        packingMaterialChargesStatus: state.packing_material_charge,
        packingMaterialChargesAmount: state.packing_material_amount,
        packingMaterialHSNCode: state.packing_material_hsn,
  
        loadingChargesStatus: state.loading_charge,
        loadingChargesAmount: state.loading_amount,
        loadingHSNCode: state.loading_hsn,
  
        unLoadingChargesStatus: state.unloading_charge,
        unLoadingChargesAmount: state.unloading_amount,
        unLoadingHSNCode: state.unloading_hsn,
  
        unPackagingChargesStatus: state.unpacking_charge,
        unPackagingChargesAmount: state.unpacking_amount,
        unPackagingHSNCode: state.unpakcing_hsn,
  
        otherCharges: _getOtherCharges(),
        surchargeStatus: state.surcharge,
        surchargeCharges: state.surcharge_percent,
        discountType: state.discount_in_invoice,
        discountAmount: state.discount_value_or_percent,
        gstStatus: state.gst_on_invoice,
        gstType: state.gst_type,
        gstPercentage: state.gst_percent,
        gstPaidBy: state.gst_paid_by,
        transitInsuranceStatus: state.transit_insurance,
        transitInsurance: _getTransitInsurance(),
        strorageStatus: state.storage,
        storageCharges: _getStorageCharge(),
      };
      if(isEdit) {
        const updatePayload:IUpdateInvoicePayload = {
          id: invoiceData?._id as string,
          data: payload,
        }
        dispatch(updateInvoiceRequest(updatePayload));
        
      } else {
        dispatch(createInvoiceRequest(payload));
      }
    }).catch(err => console.log('err--', err));
  };

  const _initFormValues = () => {
    setInvoiceNo(invoiceData?.serialNo as string);
    //@ts-ignore
    invoiceDateRef && invoiceDateRef?.current?.setDefaultValue(new Date(invoiceData?.invoiceData));
    setDateOfInvoice(invoiceData?.invoiceData as string);
    //@ts-ignore
    dateOfDeliveryRef && dateOfDeliveryRef?.current.setDefaultValue(new Date(invoiceData?.deliveryDate));
    setDateOfDelivery(invoiceData?.deliveryDate as string);
    //@ts-ignore
    vehicleInputRef && vehicleInputRef?.current?.setValue(invoiceData?.vehicleNo);
    setVehicleNo(invoiceData?.vehicleNo as string);
    const dropdownItem:TDropdownItem = modeOfMovingOptions.find((e:TDropdownItem) => e.label == invoiceData?.movingMode) as TDropdownItem;
    if(dropdownItem !== undefined) {
      //@ts-ignore
      movingModeRef?.current?.setDefaultValue(dropdownItem);
      setModeOfMoving(invoiceData?.movingMode as string);
    }
    //@ts-ignore
    consignmentNoRef && consignmentNoRef?.current?.setValue(invoiceData?.consignmentNo as string);
    setConsignmentNo(invoiceData?.consignmentNo as string);
  }

  useEffect(() => {
    if(isEdit){
      _initFormValues();
      setBillingType(getSingleOrder()?.billingBy);
      _setShiftingLuggage();
    } else {
      _getSerialNoRequest();
      setBillingType(getSingleOrder()?.billingBy);
      _setShiftingLuggage();
    }
  }, []);

  useEffect(() => {
    if(serialNo && !isEdit){
      setInvoiceNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if(!createInvoiceRequesting && createInvoiceSuccess) {
      showToast('New Invoice Created', ToastType.SUCCESS);
      dispatch(resetCreateInvoiceRequest());
      dispatch(resetGetSerialNoRequest());
      onSuccess && onSuccess();
    } else if(!createInvoiceRequesting && createInvoiceFailure) {
      showToast('New Invoice Not Created. Try again!', ToastType.ERROR);
      dispatch(resetCreateInvoiceRequest());
    }
  }, [createInvoiceRequesting, createInvoiceSuccess, createInvoiceFailure]);

  useEffect(() => {
    if(!updateInvoiceRequesting && updateInvoiceSuccess) {
      showToast('Invoice Updated', ToastType.SUCCESS);
      dispatch(resetUpdateInvoiceRequest());
      dispatch(getInvoiceListRequest(orderId));
      onSuccess && onSuccess();
    } else if(!updateInvoiceRequesting && updateInvoiceFailure) {
      showToast('Invoice Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdateInvoiceRequest());
    }
  }, [updateInvoiceRequesting, updateInvoiceSuccess, updateInvoiceFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="BASIC DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Invoice No." style={styles.label} />
                <Input
                  onChangeText={setInvoiceNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={state.invoice_no}
                  placeholder='Invoice#'
                  editable={false}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Invoice" style={styles.label} />
                <DatePickerComponent
                  //@ts-ignore
                  ref={invoiceDateRef}
                  onDateSelect={(date:Date) => {
                    setDateOfInvoice(formatDate4(date));
                  }}
                />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Shifting Luggage" style={styles.label} />
                <DropdownComponent
                  data={_getShiftingLuggageOptions()}
                  onSelect={(item:TDropdownItem) => {
                    setShiftingLuggage(item.label);
                  }}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Delivery" style={styles.label} />
                <DatePickerComponent
                  //@ts-ignore
                  ref={dateOfDeliveryRef}
                  onDateSelect={(date:Date) => {
                  setDateOfDelivery(formatDate4(date));
                }}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle No." style={styles.label} />
                <Input
                  //@ts-ignore
                  ref={vehicleInputRef}
                  onChangeText={setVehicleNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  placeholder='Vehicle#'
                  placeholderTextColor={COLOR_GRAY4}
                  inputType="numeric"
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Mode of Moving" style={styles.label} />
                <DropdownComponent
                  //@ts-ignore
                  ref={movingModeRef}
                  data={modeOfMovingOptions}
                  onSelect={(item:TDropdownItem) => {
                    setModeOfMoving(item.label);
                  }}
                />
              </View>
            </View>
            {state.shifting_luggage == 'Vehicle' ? <>
            <Spacer height={4} />
            <VehicleInfoView isEdit={isEdit} invoiceData={invoiceData} />
            </> : null}
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Consignmnet No." style={styles.label} />
              <Input
                //@ts-ignore
                ref={consignmentNoRef}
                onChangeText={setConsignmentNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder='Enter Consignment #'
                placeholderTextColor={COLOR_GRAY4}
                autoCapitalize="characters"

              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="BILLING DETAILS" collapsed={true}>
          <View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.billingByLabelText}>Billing Type - </Text>
              <Text style={styles.billingByValueText}>{getSingleOrder()?.billingBy}</Text>
            </View>
            <Spacer height={20} />
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
                text="Same as Client Address"
                fillColor={COLOR_BLUE}
                iconStyle={styles.iconStyle}
                innerIconStyle={styles.innerIconStyle}
                textStyle={styles.textStyle}
                style={styles.style}
                textContainerStyle={styles.textContainerStyle}
                onPress={(isChecked: boolean) => {
                  setSameAsClientAddress(!state.same_as_client_address);
                }}
                isChecked={state.same_as_client_address}
                disableBuiltInState={true}
              />
            </View>
            {state.billing_type == 'by Individual' ? (
              <InvoiceToIndividualView />
            ) : (
              <InvoiceToCompanyView />
            )}
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <Spacer height={4} />
        <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
          <View style={styles.elementContainer3}>
            <FreightDetailsView isEdit={isEdit} invoiceData={invoiceData} />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="TRANSIT INSURANCE" collapsed={true}>
          <View style={styles.elementContainer3}>
            <TransitInsuranceView isEdit={isEdit} invoiceData={invoiceData} />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="STORAGE CHARGE" collapsed={true}>
          <View style={styles.elementContainer3}>
            <StorageChargeView isEdit={isEdit} invoiceData={invoiceData} />
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text={isEdit ? "UPDATE" : "CREATE"}
          onPress={handleCreateInvoice}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle2}
        />
        <Spacer height={12} />
        <Spinner show={createInvoiceRequesting || updateInvoiceRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default InvoiceFormView;
