import React, {
  useCallback,
  useEffect,
} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import styles from './style';
import {ICreateBiltyRequest} from '../../../../../interface/order/ICreateBiltyRequest';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import Button from '../../../../../common/Button';
import {
  createBiltyRequest,
  resetCreateBiltyRequest,
} from '../../../../../redux/slices/OrderSlice';
import BasicDetails from './components/BasicDetails';
import ConsignerDetails from './components/ConsignerDetails';
import ConsigneeDetails from './components/ConsigneeDetails';
import VehicleDetails from './components/VehicleDetails';
import EWayBillDetails from './components/EWayBillDetails';
import MaterialDetails from './components/MaterialDetails';
import FreightDetails from './components/FreightDetails';
import InsuranceDetails from './components/InsuranceDetails';
import DemurageDetails from './components/DemurrageDetails';
import {useBiltyFormContextHook} from '../../../../../provider/BiltyFormContextProvider';
import useAuthId from '../../../../../hooks/useAuthId';
import {IMaterial} from './biltyReducer2';
import { getVehicleSizeRequest } from '../../../../../redux/slices/VehicleSlice';
import Spinner from '../../../../../common/Spinner';
import { getUnitTypeRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import { getPackingTypesRequest } from '../../../../../redux/slices/CommonSlice';
import { ToastType, showToast } from '../../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../../../interface/setting/serialNo/serialNo';
import { getSerialNoRequest, resetGetSerialNoRequest } from '../../../../../redux/slices/SerialNoSettingSlice';

interface IBiltyFormViewProps {
  orderId: string | undefined;
}

const BiltyFormView: React.FC<IBiltyFormViewProps> = ({orderId}) => {
  const {state} = useBiltyFormContextHook();
  console.log('BiltyForm-state----', JSON.stringify(state));
  
  const dispatch = useAppDispatch();

  const {
    createBiltyRequesting,
    createBiltySuccess,
    createBiltyError,
    createBiltyFailure,
  } = useAppSelector(state => state.Order);

  
  const authId = useAuthId();

  const {initialValue, prefix} = useInitialValueHook('658d3cb5585e3dde644da97e');

  const _getSerialNoRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetSerialNoRequest = {
        document: DOCUMENT_TYPE.BILTY,
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

  const handleCreateBilty = useCallback(() => {
    getCurrentCompanyId().then(id => {
      const payload: ICreateBiltyRequest = {
        companyId: id as string,
        enquiryId: orderId as string,
        isAuto: true,
        isHeadOffice: true,
        templateId: 'fds32131',
        biltyNumber: state.bilty_lr_cr_no,
        biltyDate: state.date_of_bilty_lr_cr_no,
        consigner: {
          name: state.consigner_name,
          mobile: state.consigner_mobile_no,
          gstin: state.consigner_gst,
          street: '',
          state: state.consigner_state,
          landmark: '',
          city: state.consigner_city,
          district: '',
          postOffice: '',
          postalCode: state.consinger_pincode,
          country: 'India',
        },
        consignee: {
          name: state.consignee_name,
          mobile: state.consignee_mobile_no,
          gstin: state.consignee_gst,
          street: '',
          state: state.consigner_state,
          landmark: '',
          city: state.consigner_city,
          district: '',
          postOffice: '',
          postalCode: state.consignee_pincode,
          country: 'India',
        },
  
        loadingAddress: {
          address: state.loading_address_same_as_consigner
            ? ''
            : state.loading_address,
          state: state.loading_address_same_as_consigner
            ? state.consigner_state
            : state.loading_state,
          landmark: '',
          city: state.loading_address_same_as_consigner
            ? state.consigner_city
            : state.loading_city,
          district: '',
          postOffice: '',
          postalCode: state.loading_address_same_as_consigner
            ? state.consinger_pincode
            : state.loading_pincode,
          country: 'India',
        },
        unloadingAddress: {
          address: '',
          state: state.delivery_address_same_as_consignee
            ? state.consignee_state
            : state.delivery_state,
          landmark: '',
          city: state.delivery_address_same_as_consignee
            ? state.consignee_city
            : state.delivery_city,
          district: '',
          postOffice: '',
          postalCode: state.delivery_address_same_as_consignee
            ? state.consignee_pincode
            : state.delivery_pincode,
          country: 'India',
        },
  
        vehicle: {
          invoiceNumber: state.invoice_no,
          vehicleType: state.vehicle_type,
          vehicleNumber: state.vehicle_no,
          shiftingFrom: state.from_location,
          shiftingTo: state.to_location,
          sealNumber: state.seal_no,
          inDate: state.in_date,
          outDate: state.out_date,
          transitDays: '',
          expectedDateOfDelivery: '',
        },
        driver: {
          name: state.driver_name,
          mobile: state.driver_mobile_no,
          license: state.driver_license_no,
        },
        eWayBill: {
          number: state.e_way_bill_no,
          generationDate: state.generated_on,
          expiryDate: state.expirty_date,
        },
        materialsType: state.type_of_moving,
        addMaterialsStatus: state.add_material,
        materials: state.materials.map((m: IMaterial) => {
          return {
            name: m.material_name,
            noOfArticles: m.no_of_articles,
            packingType: m.packing_type,
            HSNCode: m.hsn_code,
            billNumber: m.bill_invoice_no,
            actualWeight: m.actual_weight,
            applicableWeight: m.applicable_weight,
            unit: m.units,
            valueOfGoods: m.value_of_goods,
          };
        }),
        riskType: state.risk_type,
        liabilityOfTax: '',
        insuranceStatus: state.insurance,
        insurance: {
          companyName: state.insurance_company,
          policyNumber: state.policy_number,
          date: state.insurance_date,
          amount: state.insurance_amount,
        },
        demurrage: {
          charge: state.demurrage_charge,
          rate: state.rate,
          chargeAfterApplicable: state.charge_applicable_after,
        },
  
        freightDetails: {
          freightCharges: state.freight_charge,
          billingStatus: state.freight_type,
          totalAmount: state.total_amunt,
          advanceAmount: state.advance_amount,
          balanceAmount: state.balance_amount,
        },
        pickupCharges: {
          status: state.pickup_charge,
          charge: state.pickup_charge_amount,
        },
        packingCharges: {
          status: state.packing_charge,
          charge: state.packing_charge_amount,
        },
        unPackingCharges: {
          status: state.unpacking_charge,
          charge: state.unpacking_charge_amount,
        },
        unLoadingCharges: {
          status: state.unloading_charge,
          charge: state.unloading_charge_amount,
        },
        doorDeliveryCharges: {
          status: state.door_delivery_charge,
          charge: state.door_delivery_charge_amount,
        },
        packingMaterialCharges: {
          status: state.packing_material_charge,
          charge: state.packing_material_charge_amount,
        },
        loadingCharges: {
          status: state.loading_charge,
          charge: state.loading_charge_amount,
        },
        remarks: state.remark,
        addedBy: authId,
      };
      console.log('BiltyForm-payload',JSON.stringify(payload));
      dispatch(createBiltyRequest(payload));
    }).catch(err => console.log(err));
    
  }, [state]);

  const {getVehicleSizeRequesting} = useAppSelector(state => state.Vehicle);
  const {getunitTypeRequesting} = useAppSelector(state => state.Setting);
  const {packingTypesRequesting} = useAppSelector(state => state.Vehicle);

  useEffect(() => {
    _getSerialNoRequest();
    dispatch(getVehicleSizeRequest());
    dispatch(getUnitTypeRequest());
    dispatch(getPackingTypesRequest());
  }, []);

  useEffect(() => {
    if (!createBiltyRequesting && createBiltySuccess) {
      showToast('New Bilty Created', ToastType.SUCCESS);
      dispatch(resetCreateBiltyRequest());
      dispatch(resetGetSerialNoRequest());
    } else if (!createBiltyRequesting && createBiltyError) {
      showToast('New Bilty Not Created. Try again!', ToastType.ERROR);
      dispatch(resetCreateBiltyRequest());
    }
  }, [createBiltyRequesting, createBiltySuccess, createBiltyFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <BasicDetails />
        <Spacer height={4} />
        <ConsignerDetails />
        <Spacer height={4} />
        <ConsigneeDetails />
        <Spacer height={4} />
        <VehicleDetails />
        <Spacer height={4} />
        <EWayBillDetails />
        <Spacer height={4} />
        <MaterialDetails />
        <Spacer height={4} />
        <FreightDetails />
        <Spacer height={4} />
        <InsuranceDetails />
        <Spacer height={4} />
        <DemurageDetails />
        <Spacer height={8} />
        <Button
          text="CREATE"
          onPress={handleCreateBilty}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        <Spinner show={getVehicleSizeRequesting || getunitTypeRequesting || packingTypesRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default BiltyFormView;
