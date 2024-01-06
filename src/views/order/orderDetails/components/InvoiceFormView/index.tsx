import React, { useEffect } from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import styles from './style';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
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
import { createInvoiceRequest, resetCreateInvoiceRequest } from '../../../../../redux/slices/OrderSlice';
import Spinner from '../../../../../common/Spinner';
import { ToastType, showToast } from '../../../../../utils/utility';
import { ISingleEnquiryData } from '../../../../../interface/enquiry/ISingleEnquiryResponse';

interface IInvoiceFormViewProps {
  orderId: string;
  item: ISingleEnquiryData;
}

const InvoiceFormView: React.FC<IInvoiceFormViewProps> = ({orderId, item}) => {
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
  const {createInvoiceRequesting, createInvoiceSuccess, createInvoiceFailure} = useAppSelector(state => state.Order);

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
      state: '',
      city: '',
      pincode: '',
    };

    const pickupAddress: IInvoicePickupAddress = {
      shiftingFrom: state.same_as_client_address ? item.pickupAddress.city : state.city,
      state: state.same_as_client_address ? item.pickupAddress.state : state.state,
      city: state.same_as_client_address ? item.pickupAddress.city : state.city,
      address: state.same_as_client_address ? item.pickupAddress.address : state.address,
      pincode: state.same_as_client_address ? item.pickupAddress.pincode : state.pincode,
      landmark: '',
      locality: '',
      floor: '',
      isLiftAvailable: '',
    };
    const payload: ICreateInvoiceRequest = {
      enquiryId: orderId,
      branchId: '',
      serialNo: state.invoice_no,
      shiftingLuggage: state.shifting_luggage,
      templateId: '',
      invoiceData: state.date_of_invoice,
      vehicleNo: state.vehicle_no,
      consignmentNo: state.consignment_no,
      movingMode: state.mode_of_moving,
      deliveryDate: state.date_of_delivery,
      vehicleType: '',
      manufacture: '',
      model: '',
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
      isPartLoad: state.freight_load_type,
      isFullLoad: state.freight_load_type,
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
      surchargeCharges: state.surcharge_percent,
      discountType: state.discount_in_invoice,
      discountAmount: state.discount_value_or_percent,
      gstStatus: state.gst_on_invoice,
      gstType: state.gst_type,
      gstPercentage: state.gst_percent,
      gstPaidBy: state.gst_paid_by,
      transitInsurance: _getTransitInsurance(),
      storageCharges: _getStorageCharge(),
    };
    dispatch(createInvoiceRequest(payload));
  };

  useEffect(() => {
    if(!createInvoiceRequesting && createInvoiceSuccess) {
      showToast('New Invoice Created', ToastType.SUCCESS);
      dispatch(resetCreateInvoiceRequest());
    } else if(!createInvoiceRequesting && createInvoiceFailure) {
      showToast('New Invoice Not Created. Try again!', ToastType.ERROR);
      dispatch(resetCreateInvoiceRequest());
    }
  }, [createInvoiceRequesting, createInvoiceSuccess, createInvoiceFailure]);

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
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Invoice" style={styles.label} />
                <DatePickerComponent onDateSelect={(date:Date) => {
                  setDateOfInvoice(formatDate4(date));
                }} />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Shifting Luggage" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={(item:TDropdownItem) => {
                    setShiftingLuggage(item.label);
                  }}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Delivery" style={styles.label} />
                <DatePickerComponent onDateSelect={(date:Date) => {
                  setDateOfDelivery(formatDate4(date));
                }} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle No." style={styles.label} />
                <Input
                  onChangeText={setVehicleNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Mode of Moving" style={styles.label} />
                <DropdownComponent
                  data={modeOfMovingOptions}
                  onSelect={(item:TDropdownItem) => {
                    setModeOfMoving(item.label);
                  }}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Consignmnet No." style={styles.label} />
              <Input
                onChangeText={setConsignmentNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="BILLING DETAILS" collapsed={true}>
          <View>
            <View style={styles.checkboxContainer}>
              {billingByOptions.map((option: string, index: number) => (
                <BouncyCheckbox
                  key={`${index}`}
                  size={25}
                  unfillColor="#FFFFFF"
                  text={option}
                  fillColor={COLOR_BLUE}
                  iconStyle={styles.iconStyle}
                  innerIconStyle={styles.innerIconStyle}
                  textStyle={styles.textStyle}
                  style={styles.style}
                  textContainerStyle={styles.textContainerStyle}
                  onPress={(isChecked: boolean) => {
                    setBillingType(option);
                  }}
                  isChecked={state.billing_type == option}
                  disableBuiltInState={true}
                />
              ))}
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
            {state.billing_type == billingByOptions[0] ? (
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
            <FreightDetailsView />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="TRANSIT INSURANCE" collapsed={true}>
          <View style={styles.elementContainer3}>
            <TransitInsuranceView />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="STORAGE CHARGE" collapsed={true}>
          <View style={styles.elementContainer3}>
            <StorageChargeView />
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text="CREATE"
          onPress={handleCreateInvoice}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle2}
        />
        <Spacer height={12} />
        <Spinner show={createInvoiceRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default InvoiceFormView;
