import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input, {InputMethods} from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import DatePickerComponent, {
  IDateMethods,
} from '../../../../../../../common/DatePickerComponent';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import {formatDate4} from '../../../../../../../utils/formatter';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {IVehicleSize} from '../../../../../../../interface/vehicle/IGetVehicleSizeResponse';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';
import moment from 'moment';

interface IProps {
  item?: IBilty;
  isEdit?: boolean;
}

const VehicleDetails: React.FC<IProps> = ({item, isEdit}) => {
  const {
    state,
    setInvoiceNo,
    setVehicleType,
    setVehicleNo,
    setFromLocation,
    setToLocation,
    setDriverName,
    setDriverMobileNo,
    setDriverLicenseNo,
    setSealNo,
    setInDate,
    setOutDate,
    setTransitDays,
    setExpectedDateOfDelivery,
  } = useBiltyFormContextHook();

  const {
    Vehicle: {vehicleSizeData},
    Order: {order},
  } = useAppSelector(state => state);

  const fromCityInputRef = useRef<InputMethods>(null);
  const toCityInputRef = useRef<InputMethods>(null);
  const invoiceNoInputRef = useRef<InputMethods>(null);
  const vehicleNoInputRef = useRef<InputMethods>(null);
  const driverNameInputRef = useRef<InputMethods>(null);
  const driverMobileInputRef = useRef<InputMethods>(null);
  const driverLicenceInputRef = useRef<InputMethods>(null);
  const sealNoInputRef = useRef<InputMethods>(null);
  const transitDaysInputRef = useRef<InputMethods>(null);
  const inDateRef = useRef<IDateMethods>(null);
  const outDateRef = useRef<IDateMethods>(null);
  const expectedDateofDeliveryRef = useRef<IDateMethods>(null);

  const {data: orderData} = order || {};

  const _getVehicleSizes = () => {
    let vehicleSizes: TDropdownItem[] = [];
    const {data} = vehicleSizeData || {};
    if (data && Array.isArray(data) && data.length > 0) {
      vehicleSizes = data.map((d: IVehicleSize) => {
        const item: TDropdownItem = {
          label: d.vehicleSize,
          value: d.vehicleSize,
        };
        return item;
      });
    }
    return vehicleSizes;
  };

  useEffect(() => {
    if (isEdit && item) {
      invoiceNoInputRef.current?.setValue(item.vehicle.invoiceNumber);
      setInvoiceNo(item.vehicle.invoiceNumber);
      vehicleNoInputRef.current?.setValue(item.vehicle.vehicleNumber);
      setVehicleNo(item.vehicle.vehicleNumber);
      driverNameInputRef.current?.setValue(item.driver.name);
      setDriverName(item.driver.name);
      driverMobileInputRef.current?.setValue(item.driver.mobile);
      setDriverMobileNo(item.driver.mobile);
      driverLicenceInputRef.current?.setValue(item.driver.license);
      setDriverLicenseNo(item.driver.license);
      sealNoInputRef.current?.setValue(item.vehicle.sealNumber);
      setSealNo(item.vehicle.sealNumber);
      transitDaysInputRef.current?.setValue(item.vehicle.transitDays);
      setTransitDays(item.vehicle.transitDays);
      if(item?.vehicle?.inDate) {
       setInDate(item?.vehicle?.inDate);
        inDateRef.current?.setDefaultValue(new Date(item?.vehicle?.inDate));
      }
      if(item?.vehicle?.outDate) {
        setOutDate(item?.vehicle?.outDate);
        outDateRef.current?.setDefaultValue(new Date(item?.vehicle?.outDate));
      }
      if(item?.vehicle?.expectedDateOfDelivery) {
        setExpectedDateOfDelivery(item.vehicle.expectedDateOfDelivery);
        expectedDateofDeliveryRef.current?.setDefaultValue(new Date(item?.vehicle?.expectedDateOfDelivery))
      }
    }
  }, [isEdit, item]);

  useEffect(() => {
    // get pickupaddress and dropaddress from order
    fromCityInputRef && fromCityInputRef.current?.setValue(orderData[0]?.pickupAddress?.city);
    toCityInputRef && toCityInputRef.current?.setValue(orderData[0]?.dropAddress?.city);
  }, []);

  return (
    <CollapsibleView title="VEHICLE DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer2}>
          <Label text="Invoice No." style={styles.label} />
          <Input
            onChangeText={setInvoiceNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            autoCapitalize="characters"
            ref={invoiceNoInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Vehicle Load Size" style={styles.label} />
            <DropdownComponent
              data={_getVehicleSizes()}
              onSelect={(item: TDropdownItem) => {
                setVehicleType(item.label);
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Vehicle No." style={styles.label} />
            <Input
              onChangeText={setVehicleNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              autoCapitalize="characters"
              ref={vehicleNoInputRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="From Location" style={styles.label} />
            <Input
              onChangeText={setFromLocation}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              ref={fromCityInputRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="To Location" style={styles.label} />
            <Input
              onChangeText={setToLocation}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              ref={toCityInputRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Driver Name" style={styles.label} />
          <Input
            onChangeText={setDriverName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={driverNameInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Driver Mobile No." style={styles.label} />
            <Input
              onChangeText={setDriverMobileNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              ref={driverMobileInputRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Driver Licence No." style={styles.label} />
            <Input
              onChangeText={setDriverLicenseNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              autoCapitalize="characters"
              ref={driverLicenceInputRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Seal No." style={styles.label} />
          <Input
            onChangeText={setSealNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            autoCapitalize="characters"
            ref={sealNoInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="In Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setInDate(date.toISOString());
              }}
              ref={inDateRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Out Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setOutDate(date.toISOString());
              }}
              ref={outDateRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Transit Days" style={styles.label} />
            <Input
              onChangeText={setTransitDays}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              ref={transitDaysInputRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Expected Date of Delivery" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setExpectedDateOfDelivery(date.toISOString());
              }}
              ref={expectedDateofDeliveryRef}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default VehicleDetails;
