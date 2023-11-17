import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
import {Switch} from 'react-native-switch';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import Toast from 'react-native-toast-message';
import vehicleTypeOptions from '../../../../../data/vehicleTypeOptions.json';
import {initialState, biltyReducer, BILTY_FORM_ACTION} from './biltyReducer';
import {
  formatDate,
  formatDate2,
  formatDate3,
  formatDate4,
  getCities,
  getStates,
} from '../../../../../utils/formatter';
import {ICreateBiltyRequest} from '../../../../../interface/order/ICreateBiltyRequest';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import Button from '../../../../../common/Button';
import {
  createBiltyRequest,
  resetCreateBiltyRequest,
} from '../../../../../redux/slices/OrderSlice';
import usePincodeHook, {
  PINCODE_REQUEST_KEY,
} from '../../../../../hooks/usePincodeHook';
import packingMaterilOptions from '../../../../../data/packingMaterialOptions.json';
import packingMaterilUnitOptions from '../../../../../data/packingMaterialUnitOptions.json';
import packingOptions from '../../../../../data/packingOptions.json';
import DeleteIcon from '../../../../../images/icons/delete.svg';

const riskTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Owners Risk',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'Carrier Risk',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

const payTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'To Be Billed',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'To Pay',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '3',
    text: 'Paid',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

const insuranceOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Insured',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10},
  },
  {
    id: '2',
    text: 'Not Insured',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

const typeOfMovingOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Household',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10, marginBottom: 10},
  },
  {
    id: '2',
    text: 'Vehicle',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10, marginBottom: 10},
  },
  {
    id: '3',
    text: 'Commercial',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 10, marginBottom: 10},
  },
  {
    id: '4',
    text: '3PL',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

interface IBiltyFormViewProps {
  orderId: string | undefined;
}

interface IMaterial {
  name: string;
  noOfArticles: string;
  packingType: string;
  HSNCode: string;
  billNumber: string;
  actualWeight: string;
  applicableWeight: string;
  unit: string;
  valueOfGoods: string;
}

const BiltyFormView: React.FC<IBiltyFormViewProps> = ({orderId}) => {
  const [reducerState, dispatch] = useReducer(biltyReducer, initialState);
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [
    loadingAddressSameAsConsignerAddress,
    setIsLoadingAddressSameAsConsignerAddress,
  ] = useState<boolean>(true);
  const [
    deliveryAddressSameAsConsigneeAddress,
    setIsDeliveryAddressSameAsConsigneeAddress,
  ] = useState<boolean>(true);
  const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(PINCODE_REQUEST_KEY.BILTY_CONSIGNER_ADDRESS);
  const {
    createBiltyRequesting,
    createBiltySuccess,
    createBiltyError,
    createBiltyFailure,
  } = useAppSelector(state => state.Order);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const dispatch2 = useAppDispatch();
  const [consignerStates, setConsignerStates] = useState<TDropdownItem[]>([]);
  const [consignerCities, setConsignerCities] = useState<TDropdownItem[]>([]);

  const [loadingStates, setLoadingStates] = useState<TDropdownItem[]>([]);
  const [loadingCities, setLoadingCities] = useState<TDropdownItem[]>([]);

  const [consigneeStates, setConsigneeStates] = useState<TDropdownItem[]>([]);
  const [consigneeCities, setConsigneeCities] = useState<TDropdownItem[]>([]);

  const [unloadingStates, setUnloadingStates] = useState<TDropdownItem[]>([]);
  const [unloadingCities, setUnloadingCities] = useState<TDropdownItem[]>([]);

  const [materials, setMaterials] = useState<IMaterial[]>([]);

  const consignerCityDropdownRef = useRef(null);
  const consignerStateDropwdownRef = useRef(null);
  const loadingCityDropdownRef = useRef(null);
  const loadingStateDropwdownRef = useRef(null);
  const consigneeCityDropdownRef = useRef(null);
  const consigneeStateDropdownRef = useRef(null);
  const unloadingCityDropdownRef = useRef(null);
  const unloadingStateDropwdownRef = useRef(null);

  const {result, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  const handleTemplate = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CHOOSE_DESIGN,
      payload: item.label,
    });
  };

  const handleLoaddAddress = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_ADDRESS,
      payload: text,
    });
  };

  const handleLoadingAddressPincode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.BILTY_LOADING_ADDRESS);
      setPincode(text);
      dispatch({
        type: BILTY_FORM_ACTION.LOADING_ADDRESS_PINCODE,
        payload: text,
      });
    },
    [reducerState.loadingAddressPincode],
  );

  const handleLoadingState = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_STATE,
      payload: item.label,
    });
  };

  const handleLoadingCity = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_CITY,
      payload: item.label,
    });
  };

  const handleUnloaddAddress = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNLOADING_ADDRESS,
      payload: text,
    });
  };

  const handleUnloadingAddressPincode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.BILTY_UNLOADING_ADDRESS);
      setPincode(text);
      dispatch({
        type: BILTY_FORM_ACTION.UNLOADING_ADDRESS_PINCODE,
        payload: text,
      });
    },
    [reducerState.unloadingAddressPincode],
  );

  const handleUnLoadingState = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_STATE,
      payload: item.label,
    });
  };

  const handleUnLoadingCity = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_CITY,
      payload: item.label,
    });
  };

  const handleBiltyLrCnNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.BILTY_LR_CN_NO,
      payload: text,
    });
  };
  const handleDateofBiltyLrCn = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.DATE_OF_BILTY,
      payload: formatDate(date),
    });
  };
  const handleConsignerName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_NAME,
      payload: text,
    });
  };
  const handleConsignerGst = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_GST,
      payload: text,
    });
  };
  const handleConsignerMobileNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_MOBILE_NO,
      payload: text,
    });
  };
  const handleConsignerAddress = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_ADDRESS,
      payload: text,
    });
  };
  const handleConsignerPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.BILTY_CONSIGNER_ADDRESS);
      setPincode(text);
      dispatch({
        type: BILTY_FORM_ACTION.CONSIGNER_PINCODE,
        payload: text,
      });
    },
    [reducerState.consignerPincode],
  );
  const handleConsignerState = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_STATE,
      payload: item.label,
    });
  };
  const handleConsignerCity = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_CITY,
      payload: item.label,
    });
  };
  const handleConsigneeName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_NAME,
      payload: text,
    });
  };
  const handleConsigneeGst = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_GST,
      payload: text,
    });
  };
  const handleConsigneeMobileNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_MOBILE_NO,
      payload: text,
    });
  };
  const handleConsigneeAddress = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_ADDRESS,
      payload: text,
    });
  };
  const handleConsigneePinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.BILTY_CONSIGNEE_ADDRESS);
      setPincode(text);
      dispatch({
        type: BILTY_FORM_ACTION.CONSIGNEE_PINCODE,
        payload: text,
      });
    },
    [reducerState.consigneePincode],
  );
  const handleConsigneeState = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_STATE,
      payload: item.label,
    });
  };
  const handleConsigneeCity = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_CITY,
      payload: item.label,
    });
  };
  const handleInvoiceNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.INVOICE_NO,
      payload: text,
    });
  };
  const handleVehicleType = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.VEHICLE_TYPE,
      payload: item.label,
    });
  };
  const handleVehicleNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.VEHICLE_NO,
      payload: text,
    });
  };
  const handleFromLocation = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.FROM_LOCATION,
      payload: text,
    });
  };
  const handleToLocation = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.TO_LOCATION,
      payload: text,
    });
  };
  const handleDriverName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DRIVER_NAME,
      payload: text,
    });
  };
  const handleDriverMobileNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DRIVER_MOBILE_NO,
      payload: text,
    });
  };
  const handleDriverLicenceNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DRIVER_LICENCE_NO,
      payload: text,
    });
  };
  const handleSealNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.SEAL_NO,
      payload: text,
    });
  };
  const handleInDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.IN_DATE,
      payload: formatDate2(date),
    });
  };
  const handleOutDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.OUT_DATE,
      payload: formatDate2(date),
    });
  };
  const handleEwayBillNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.E_WAY_BILL_NO,
      payload: text,
    });
  };
  const handleGeneratedOn = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.GENERATED_ON,
      payload: formatDate2(date),
    });
  };
  const handleExpiryDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.EXPIRY_DATE,
      payload: formatDate2(date),
    });
  };
  const handleMatrialName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.MATERIAL_NAME,
      payload: text,
    });
  };
  const handleNumberOfArticles = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.NO_OF_ARTICLES,
      payload: text,
    });
  };
  const handlePackingType = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_TYPE,
      payload: item.label,
    });
  };
  const handleHsnCode = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.HSN_CODE,
      payload: text,
    });
  };
  const handleBillInnvoiceNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.BILL_INVOICE_NO,
      payload: text,
    });
  };
  const handleNetWeight = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.NET_WEIGHT,
      payload: text,
    });
  };
  const handleUnitOne = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNITONE,
      payload: item.label,
    });
  };
  const handleValueOfGoods = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.VALUE_OF_GOODS,
      payload: text,
    });
  };
  const handleFreightCharges = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.FREIGHT_CHARGES,
      payload: text,
    });
  };
  const handlePicupCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PICKUP_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.PICKUP_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handlePicupChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.PICKUP_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleDoorDeliveryCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handleDoorDeliveryChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleDoorPackingCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.PACKING_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handlePackingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handlePackingMaterialCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handlePackingMaterialChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleUnPackingCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNPACKING_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.UNPACKING_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handleUnpackingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNPACKING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleLoadingCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.LOADING_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handleLoadingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleUnloadingCharges = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNLOADING_CHARGES,
      payload: item.label,
    });
    if (item.value !== '3') {
      dispatch({
        type: BILTY_FORM_ACTION.UNLOADING_CHARGES_AMOUNT,
        payload: '',
      });
    }
  };
  const handleUnloadingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNLOADING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleAdvanceAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.ADVANCE_AMOUNT,
      payload: text,
    });
  };
  const handleBalancceAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.BALANCE_AMOUNT,
      payload: text,
    });
  };
  const handleInsuranceCompany = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.INSURANCE_COMPANY,
      payload: text,
    });
  };
  const handlePolicyNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.POLICY_NO,
      payload: text,
    });
  };
  const handleInsuranceDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.INSURANCE_DATE,
      payload: formatDate2(date),
    });
  };
  const handleInsuranceAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.INSURANCE_AMOUNT,
      payload: text,
    });
  };
  const handleDemurrageCharge = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DEMURRAGE_CHARGES,
      payload: text,
    });
  };
  const handleDemurrageChargeRate = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CHARGE_DATE,
      payload: text,
    });
  };
  const handleDemurrageChargeApplicableAfter = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.CHARGE_APPLICABLE_AFTER,
      payload: formatDate4(date),
    });
  };
  const handleRemark = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.REMARK,
      payload: text,
    });
  };
  const handleActualWeight = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.ACTUAL_WEIGHT,
      payload: text,
    });
  };
  const handleApplicableWeight = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.APPLICABLE_WEIGHT,
      payload: text,
    });
  };
  const handleUnitTwo = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNITTWO,
      payload: item.label,
    });
  };
  const handleRate = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.RATE,
      payload: text,
    });
  };
  const handleReceiptDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.DATE_OF_BILTY,
      payload: formatDate3(date),
    });
  };

  const getCompanyId = () => {
    let id;
    const {data} = addCompanyInfo || {};
    const {data: companiesData} = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
      id = companiesData._id;
    }
    return id;
  };

  const showMaterialList = () => {
    if (materials.length > 0) {
      return materials.map((item, index) => {
        return (
          <>
            <Spacer height={12} />
            <View style={styles.materialItemContainer}>
              <View
                style={[
                  styles.materialItem,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.materialLabelText}>SNO# - </Text>
                  <Text style={styles.materialValueText}>{index + 1}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => handleDeleteMaterialItem(index)}>
                  <DeleteIcon width={25} height={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Material Name - </Text>
                <Text style={styles.materialValueText}>{item.name}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>
                  Number of Articles -{' '}
                </Text>
                <Text style={styles.materialValueText}>
                  {item.noOfArticles}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Packing Type - </Text>
                <Text style={styles.materialValueText}>{item.packingType}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>HSN Code - </Text>
                <Text style={styles.materialValueText}>{item.HSNCode}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>
                  Bill/Invoice Number -{' '}
                </Text>
                <Text style={styles.materialValueText}>{item.billNumber}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Net Weight - </Text>
                <Text style={styles.materialValueText}>
                  {item.actualWeight}
                </Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Unit - </Text>
                <Text style={styles.materialValueText}>{item.unit}</Text>
              </View>
              <View style={styles.materialItem}>
                <Text style={styles.materialLabelText}>Value Of Goods - </Text>
                <Text style={styles.materialValueText}>
                  {item.valueOfGoods}
                </Text>
              </View>
            </View>
            <Spacer height={12} />
          </>
        );
      });
    }
    return null;
  };

  const handleDeleteMaterialItem = (index: number) => {
    const clone = [...materials];
    const filter = clone.filter((_, i) => i !== index);
    setMaterials(filter);
  };

  const handleCreateBilty = useCallback(() => {
    const payload: ICreateBiltyRequest = {
      companyId: getCompanyId(),
      enquiryId: orderId as string,
      templateId: 'fds32131',
      biltyNumber: reducerState.biltyLrCnNo,
      biltyDate: reducerState.dateofBiltyLrCnNo,
      consigner: {
        name: reducerState.consigneeName,
        mobile: reducerState.consignerMobileNo,
        gstin: reducerState.consignerGst,
        street: reducerState.consignerCity,
        state:
          reducerState.consignerState || consignerStates.length > 0
            ? consignerStates[0].label
            : '',
        landmark: reducerState.consignerCity,
        city:
          reducerState.consignerCity || consignerCities.length > 0
            ? consignerCities[0].label
            : '',
        district: reducerState.consignerCity,
        postOffice: reducerState.consignerCity,
        postalCode: reducerState.consignerPincode,
        country: 'India',
      },
      consignee: {
        name: reducerState.consigneeName,
        mobile: reducerState.consigneeMobileNo,
        gstin: reducerState.consigneeGst,
        street: reducerState.consigneeCity,
        state:
          reducerState.consigneeState || consigneeStates.length > 0
            ? consigneeStates[0].label
            : '',
        landmark: reducerState.consigneeCity,
        city:
          reducerState.consigneeCity || consigneeCities.length > 0
            ? consigneeCities[0].label
            : '',
        district: reducerState.consigneeCity,
        postOffice: reducerState.consigneeCity,
        postalCode: reducerState.consigneePincode,
        country: 'India',
      },

      loadingAddress: {
        address: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerCity
          : reducerState.loadingAddress,
        state: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerState
          : reducerState.loadingState || loadingStates[0].label,
        landmark: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerCity
          : reducerState.loadingCity,
        city: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerCity
          : reducerState.loadingCity || loadingCities[0].label,
        district: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerCity
          : reducerState.loadingCity,
        postOffice: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerCity
          : reducerState.loadingCity,
        postalCode: loadingAddressSameAsConsignerAddress
          ? reducerState.consignerPincode
          : reducerState.loadingAddressPincode,
        country: 'India',
      },
      unloadingAddress: {
        address: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneeCity
          : reducerState.unloadingAddress,
        state: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneeState
          : reducerState.unloadingState || unloadingStates[0].label,
        landmark: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneeCity
          : reducerState.unloadingCity,
        city: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneeCity
          : reducerState.unloadingCity || unloadingCities[0].label,
        district: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneeCity
          : reducerState.unloadingCity,
        postOffice: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneeCity
          : reducerState.unloadingCity,
        postalCode: deliveryAddressSameAsConsigneeAddress
          ? reducerState.consigneePincode
          : reducerState.unloadingAddressPincode,
        country: 'India',
      },

      vehicle: {
        invoiceNumber: reducerState.invoiceNo,
        vehicleType: reducerState.vehicleType,
        vehicleNumber: reducerState.vehicleNo,
        shiftingFrom: reducerState.fromLocation,
        shiftingTo: reducerState.toLocation,
        sealNumber: reducerState.sealNo,
        inDate: reducerState.inDate,
        outDate: reducerState.outDate,
        transitDays: '',
        expectedDateOfDelivery: '',
      },
      driver: {
        name: reducerState.driverName,
        mobile: reducerState.driverMobileNo,
        license: reducerState.driverLicenceNo,
      },
      eWayBill: {
        number: reducerState.eWayBillNo,
        generationDate: reducerState.generatedOn,
        expiryDate: reducerState.expiryDate,
      },
      materialsType: reducerState.materialsType,
      addMaterialsStatus: reducerState.addMaterialsStatus,
      materials: [
        {
          name: reducerState.materialName,
          noOfArticles: reducerState.noOfArticles,
          packingType: reducerState.packingType,
          HSNCode: reducerState.hsnCode,
          billNumber: reducerState.billInvoiceNo,
          actualWeight: reducerState.actualWeight,
          applicableWeight: reducerState.applicableWeight,
          unit: reducerState.unitOne,
          valueOfGoods: reducerState.valueOfGoods,
        },
      ],
      riskType: reducerState.riskType,
      liabilityOfTax: '',
      insuranceStatus: '',
      insurance: {
        companyName: reducerState.insuranceAmount,
        policyNumber: reducerState.policyNumber,
        date: reducerState.insuranceDate,
        amount: reducerState.insuranceAmount,
      },
      demurrage: {
        charge: reducerState.demurrageCharge,
        rate: reducerState.rate,
        chargeAfterApplicable: reducerState.chargeapplicableAfter,
      },

      freightDetails: {
        freightCharges: reducerState.freightCharges,
        billingStatus: reducerState.materialsType,
        totalAmount: reducerState.pickupChargesAmount,
        advanceAmount: reducerState.advanceAmount,
        balanceAmount: reducerState.balanceAmount,
      },
      pickupCharges: {
        status: reducerState.pickupCharges,
        charge: reducerState.pickupChargesAmount,
      },
      packingCharges: {
        status: reducerState.packingCharges,
        charge: reducerState.packingChargesAmount,
      },
      unPackingCharges: {
        status: reducerState.unPackingCharges,
        charge: reducerState.unPackingChargesAmount,
      },
      unLoadingCharges: {
        status: reducerState.unLoadingCharges,
        charge: reducerState.unLoadingChargesAmount,
      },
      doorDeliveryCharges: {
        status: reducerState.doorDeliveryCharges,
        charge: reducerState.doorDeliveryChargesAmount,
      },
      packingMaterialCharges: {
        status: reducerState.packingCharges,
        charge: reducerState.packingChargesAmount,
      },
      loadingCharges: {
        status: reducerState.loadingCharges,
        charge: reducerState.loadingChargesAmount,
      },
      remarks: reducerState.remark,
      addedBy: getCompanyId(),
    };
    console.log(payload, 'payload Bility req');

    dispatch2(createBiltyRequest(payload));
  }, [dispatch2, reducerState]);

  useEffect(() => {
    if (!createBiltyRequesting && createBiltySuccess) {
      Toast.show({
        type: 'success',
        text1: 'Create Bilty',
        text2: 'Bilty has been created successfully',
      });
      dispatch2(resetCreateBiltyRequest());
    } else if (!createBiltyRequesting && createBiltyError) {
      Toast.show({
        type: 'error',
        text1: 'Create Bilty',
        text2: 'Error in creating Bilty. Please try again!',
      });
      dispatch2(resetCreateBiltyRequest());
    }
  }, [createBiltyRequesting, createBiltySuccess, createBiltyFailure]);

  useEffect(() => {
    if (result && result.Status != 'Error') {
      if (pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_CONSIGNER_ADDRESS) {
        setConsignerStates(getStates(result));
        setConsignerCities(getCities(result));
      } else if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_LOADING_ADDRESS
      ) {
        setLoadingStates(getStates(result));
        setLoadingCities(getCities(result));
      } else if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_CONSIGNEE_ADDRESS
      ) {
        setConsigneeStates(getStates(result));
        setConsigneeCities(getCities(result));
      } else if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_UNLOADING_ADDRESS
      ) {
        setUnloadingStates(getStates(result));
        setUnloadingCities(getCities(result));
      }
    }
  }, [result]);

  useEffect(() => {
    calculateBalanceAmount();
  }, [reducerState.advanceAmount]);

  useEffect(() => {
    if (
      consignerStates &&
      consignerCities &&
      consignerStateDropwdownRef &&
      consignerCityDropdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_CONSIGNER_ADDRESS
    ) {
      //@ts-ignore
      consignerStateDropwdownRef?.current?.setDefaultValue(consignerStates[0]);
      //@ts-ignore
      consignerCityDropdownRef?.current?.setDefaultValue(consignerCities[0]);
    }
  }, [consignerStates, consignerCities]);

  useEffect(() => {
    if (
      loadingStates &&
      loadingCities &&
      loadingStateDropwdownRef &&
      loadingCityDropdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_LOADING_ADDRESS
    ) {
      //@ts-ignore
      loadingStateDropwdownRef?.current?.setDefaultValue(loadingStates[0]);
      //@ts-ignore
      loadingCityDropdownRef?.current?.setDefaultValue(loadingCities[0]);
    }
  }, [loadingStates, loadingCities]);

  useEffect(() => {
    if (
      consigneeStates &&
      consigneeCities &&
      consigneeStateDropdownRef &&
      consigneeCityDropdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_CONSIGNEE_ADDRESS
    ) {
      //@ts-ignore
      consigneeStateDropdownRef?.current?.setDefaultValue(consigneeStates[0]);
      //@ts-ignore
      consigneeCityDropdownRef?.current?.setDefaultValue(consigneeCities[0]);
    }
  }, [consigneeStates, consigneeCities]);

  useEffect(() => {
    if (
      unloadingStates &&
      unloadingCities &&
      unloadingStateDropwdownRef &&
      unloadingCityDropdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.BILTY_UNLOADING_ADDRESS
    ) {
      //@ts-ignore
      unloadingStateDropwdownRef?.current?.setDefaultValue(unloadingStates[0]);
      //@ts-ignore
      unloadingCityDropdownRef?.current?.setDefaultValue(unloadingCities[0]);
    }
  }, [unloadingStates, unloadingCities]);

  const renderLoadingAddressView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={handleLoaddAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={handleLoadingAddressPincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownComponent
              data={loadingStates}
              onSelect={handleLoadingState}
              //@ts-ignore
              ref={loadingStateDropwdownRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <DropdownComponent
              data={loadingCities}
              onSelect={handleLoadingCity}
              //@ts-ignore
              ref={loadingCityDropdownRef}
            />
          </View>
        </View>
      </>
    );
  };

  const renderUnLoadingAddressView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={handleUnloaddAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={handleUnloadingAddressPincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownComponent
              data={unloadingStates}
              onSelect={handleUnLoadingState}
              //@ts-ignore
              ref={unloadingStateDropwdownRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <DropdownComponent
              data={unloadingCities}
              onSelect={handleUnLoadingCity}
              //@ts-ignore
              ref={unloadingCityDropdownRef}
            />
          </View>
        </View>
      </>
    );
  };

  const renderNonFixedFreightView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Actual Weight" style={styles.label} />
            <Input
              onChangeText={handleActualWeight}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Applicable Weight" style={styles.label} />
            <Input
              onChangeText={handleApplicableWeight}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Units" style={styles.label} />
            <DropdownComponent
              data={packingMaterilUnitOptions}
              onSelect={handleUnitTwo}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Rate" style={styles.label} />
            <Input
              onChangeText={handleRate}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
            />
          </View>
        </View>
      </>
    );
  };

  const handleAddMaterial = () => {
    const clone = [...materials];

    const materil: IMaterial = {
      name: reducerState.materialName,
      noOfArticles: reducerState.noOfArticles,
      packingType: reducerState.packingType,
      HSNCode: reducerState.hsnCode,
      billNumber: reducerState.billInvoiceNo,
      actualWeight: reducerState.netWeight,
      applicableWeight: reducerState.applicableWeight,
      unit: reducerState.unitOne,
      valueOfGoods: reducerState.valueOfGoods,
    };
    clone.push(materil);
    setMaterials(clone);
    dispatch({
      type: BILTY_FORM_ACTION.RESET_ADD_MATERIAL_STATE,
      payload: '',
    });
  };

  const calculateMaterialTotalAmount = () => {
    const {
      pickupChargesAmount,
      packingChargesAmount,
      doorDeliveryChargesAmount,
      packingMaterialChargesAmount,
      unPackingChargesAmount,
      loadingChargesAmount,
      unLoadingChargesAmount,
    } = reducerState;
    let totalAmount = 0;
    if (pickupChargesAmount) {
      totalAmount += parseInt(pickupChargesAmount);
    }
    if (packingChargesAmount) {
      totalAmount += parseInt(packingChargesAmount);
    }
    if (doorDeliveryChargesAmount) {
      totalAmount += parseInt(doorDeliveryChargesAmount);
    }
    if (packingMaterialChargesAmount) {
      totalAmount += parseInt(packingMaterialChargesAmount);
    }
    if (unPackingChargesAmount) {
      totalAmount += parseInt(unPackingChargesAmount);
    }
    if (loadingChargesAmount) {
      totalAmount += parseInt(loadingChargesAmount);
    }
    if (unLoadingChargesAmount) {
      totalAmount += parseInt(unLoadingChargesAmount);
    }
    return totalAmount;
  };

  const calculateBalanceAmount = () => {
    const totalAmount = calculateMaterialTotalAmount();
    const {advanceAmount} = reducerState;
    if (advanceAmount) {
      const balanceAmount = totalAmount - parseInt(advanceAmount);
      dispatch({
        type: BILTY_FORM_ACTION.BALANCE_AMOUNT,
        payload: `${balanceAmount}`,
      });
    } else {
      dispatch({
        type: BILTY_FORM_ACTION.BALANCE_AMOUNT,
        payload: `${calculateMaterialTotalAmount()}`,
      });
    }
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="BASIC DETAILS" collapsed={false}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Bilty / LR / CN No." style={styles.label} />
            </View>
            <View style={[styles.elementContainer, styles.switchMainWrapper3]}>
              <View style={[styles.itemContainer, {alignItems: 'center'}]}>
                <Switch
                  containerStyle={styles.switchStyle}
                  value={switchState}
                  onValueChange={val => setSwitchState(val)}
                  disabled={false}
                  activeText={'Auto'}
                  inActiveText={'Manual'}
                  outerCircleStyle={styles.outerCircleStyle}
                  renderActiveText={true}
                  renderInActiveText={true}
                  switchWidthMultiplier={3.5}
                />
              </View>
              <View style={[styles.itemContainer, switchWrapperStyle]}>
                <Input
                  onChangeText={handleBiltyLrCnNo}
                  containerStyle={styles.switchInputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  editable={!switchState}
                />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Choose Designs" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Bilty/LR/CN No." style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
            <Spacer height={4} />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="CONSIGNER DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Consigner Name" style={styles.label} />
              <Input
                onChangeText={handleConsignerName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Consigner GST" style={styles.label} />
                <Input
                  onChangeText={handleConsignerGst}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Consigner Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleConsignerMobileNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={handleConsignerAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Pincode" style={styles.label} />
              <Input
                onChangeText={handleConsignerPinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="State" style={styles.label} />
                <DropdownComponent
                  data={consignerStates}
                  onSelect={handleConsignerState}
                  //@ts-ignore
                  ref={consignerStateDropwdownRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="City" style={styles.label} />
                <DropdownComponent
                  data={consignerCities}
                  onSelect={handleConsignerCity}
                  //@ts-ignore
                  ref={consignerCityDropdownRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Loading Address" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Same as Consigner Address"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setIsLoadingAddressSameAsConsignerAddress(isChecked);
                }}
                isChecked={loadingAddressSameAsConsignerAddress}
              />
            </View>
            {!loadingAddressSameAsConsignerAddress
              ? renderLoadingAddressView()
              : null}
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="CONSIGNEE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Consignee Name" style={styles.label} />
              <Input
                onChangeText={handleConsigneeName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Consignee GST" style={styles.label} />
                <Input
                  onChangeText={handleConsigneeGst}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Consignee Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleConsigneeMobileNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={handleConsigneeAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Pincode" style={styles.label} />
              <Input
                onChangeText={handleConsigneePinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="State" style={styles.label} />
                <DropdownComponent
                  data={consigneeStates}
                  onSelect={handleConsigneeState}
                  //@ts-ignore
                  ref={consigneeStateDropdownRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="City" style={styles.label} />
                <DropdownComponent
                  data={consigneeCities}
                  onSelect={handleConsigneeCity}
                  //@ts-ignore
                  ref={consigneeCityDropdownRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Delivery Address" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Same as Consignee Address"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setIsDeliveryAddressSameAsConsigneeAddress(isChecked);
                }}
                isChecked={deliveryAddressSameAsConsigneeAddress}
              />
            </View>
            {!deliveryAddressSameAsConsigneeAddress
              ? renderUnLoadingAddressView()
              : null}
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="VEHICLE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Invoice No." style={styles.label} />
              <Input
                onChangeText={handleInvoiceNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Type" style={styles.label} />
                <DropdownComponent
                  data={vehicleTypeOptions}
                  onSelect={handleVehicleType}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle No." style={styles.label} />
                <Input
                  onChangeText={handleVehicleNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="From Location" style={styles.label} />
                <Input
                  onChangeText={handleFromLocation}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="To Location" style={styles.label} />
                <Input
                  onChangeText={handleToLocation}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Driver Name" style={styles.label} />
              <Input
                onChangeText={handleDriverName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Driver Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleDriverMobileNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Driver Licence No." style={styles.label} />
                <Input
                  onChangeText={handleDriverLicenceNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Seal No." style={styles.label} />
              <Input
                onChangeText={handleSealNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="In Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleInDate} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Out Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleOutDate} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="E-Way BILL DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="E-Way Bill No." style={styles.label} />
              <Input
                onChangeText={handleEwayBillNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Generated On" style={styles.label} />
                <DatePickerComponent onDateSelect={handleGeneratedOn} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Expiry Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleExpiryDate} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="MATERIAL DETAILS" collapsed={true}>
          <View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Type of Moving" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              <BouncyCheckboxGroup
                data={typeOfMovingOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  dispatch({
                    type: BILTY_FORM_ACTION.TYPE_OF_MOVING,
                    payload: selectedItem.text as string,
                  });
                }}
                style={{flexDirection: 'row', flexWrap: 'wrap'}}
              />
            </View>
            {reducerState.materialsType == 'Household' ||
            reducerState.materialsType == 'Vehicle' ? (
              <>
                <Spacer height={16} />
                <View style={styles.elementContainer}>
                  <BouncyCheckbox
                    size={25}
                    fillColor={COLOR_BLUE}
                    unfillColor="#FFFFFF"
                    text="Want to add Material Detail"
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 18,
                      height: 18,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 18,
                      height: 18,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      dispatch({
                        type: BILTY_FORM_ACTION.ADD_MATERIAL_STATUS,
                        payload: isChecked ? 'YES' : 'NO',
                      });
                    }}
                    isChecked={reducerState.addMaterialsStatus == 'YES'}
                  />
                </View>
              </>
            ) : null}
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Material Name" style={styles.label} />
              <Input
                onChangeText={handleMatrialName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="No. of Articles" style={styles.label} />
                <Input
                  onChangeText={handleNumberOfArticles}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={packingMaterilOptions}
                  onSelect={handlePackingType}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="HSN Code" style={styles.label} />
                <Input
                  onChangeText={handleHsnCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Invoice No." style={styles.label} />
                <Input
                  onChangeText={handleBillInnvoiceNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Actual Weight" style={styles.label} />
                <Input
                  onChangeText={handleNetWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType='numeric'
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Applicable Weight" style={styles.label} />
                <Input
                  onChangeText={handleApplicableWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType='numeric'
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Units" style={styles.label} />
                <DropdownComponent
                  data={packingMaterilUnitOptions}
                  onSelect={handleUnitOne}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Value of Goods" style={styles.label} />
                <Input
                  onChangeText={handleValueOfGoods}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType='numeric'
                />
              </View>
            </View>
            <Spacer height={12} />
            <Button
              text="ADD"
              onPress={handleAddMaterial}
              disabled={false}
              style={styles.previewButtonStyle}
              textStyle={styles.textStyle}
            />
            {showMaterialList()}
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Risk Type" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={riskTypeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                  dispatch({
                    type: BILTY_FORM_ACTION.RISK_TYPE,
                    payload: selectedItem.text as string,
                  });
                }}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={payTypeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={12} />
            <View style={styles.elementContainer2}>
              <Label text="Freight Charges" style={styles.label} />
              <Input
                onChangeText={handleFreightCharges}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Pickup Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handlePicupCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePicupChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.pickupChargesAmount}
                  editable={
                    reducerState.pickupCharges == 'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Door Delivery Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handleDoorDeliveryCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleDoorDeliveryChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.doorDeliveryChargesAmount}
                  editable={
                    reducerState.doorDeliveryCharges ==
                    'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Packing Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handleDoorPackingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePackingChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.packingChargesAmount}
                  editable={
                    reducerState.packingCharges == 'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Packing Material Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handlePackingMaterialCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePackingMaterialChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.packingMaterialChargesAmount}
                  editable={
                    reducerState.packingMaterialCharges ==
                    'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Unpacking Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handleUnPackingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleUnpackingChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.unPackingChargesAmount}
                  editable={
                    reducerState.unPackingCharges == 'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Loading Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handleLoadingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleLoadingChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.loadingChargesAmount}
                  editable={
                    reducerState.loadingCharges == 'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Unloading Charges" style={styles.label} />
                <DropdownComponent
                  data={packingOptions}
                  onSelect={handleUnloadingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleUnloadingChargesAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={reducerState.unLoadingChargesAmount}
                  editable={
                    reducerState.unLoadingCharges == 'Additional from Freight'
                  }
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label
                text={`Total Amount = ${calculateMaterialTotalAmount()}.00 /-`}
                style={styles.label2}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Advance Amount" style={styles.label} />
                <Input
                  onChangeText={handleAdvanceAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Balance Amount" style={styles.label} />
                <Input
                  onChangeText={handleBalancceAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={reducerState.balanceAmount}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={insuranceOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Insurance Company" style={styles.label} />
              <Input
                onChangeText={handleInsuranceCompany}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Policy Number" style={styles.label} />
              <Input
                onChangeText={handlePolicyNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Insurance Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleInsuranceDate} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Insurance Amount" style={styles.label} />
                <Input
                  onChangeText={handleInsuranceAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="DEMURRAGE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Demurrage Charge" style={styles.label} />
              <Input
                onChangeText={handleDemurrageCharge}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Rate" style={styles.label} />
                <Input
                onChangeText={handleDemurrageChargeRate}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Charge Applicable After" style={styles.label} />
                <DatePickerComponent onDateSelect={handleDemurrageChargeApplicableAfter} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="OTHER DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Remark" style={styles.label} />
              <Input
                onChangeText={handleRemark}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
        <Button
          text="CREATE"
          onPress={handleCreateBilty}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default BiltyFormView;
