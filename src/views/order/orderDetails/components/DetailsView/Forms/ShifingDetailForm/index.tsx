import React, { useCallback, useEffect, useRef, useState } from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../../../common/AvoidSoftInputViewHOC';
import Input from '../../../../../../../common/Input';
import Label from '../../../../../../../common/Label';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import styles from './style';
import shiftingTypeOptions from '../../../../../../../data/shiftingType.json';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import shiftingLuggageOptions from '../../../../../../../data/shiftingLuggage.json';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import Button from '../../../../../../../common/Button';
import { MODULE_NAME } from '../../enum/EModuleName';
import { IGetEnquiriesData } from '../../../../../../../interface/enquiry/IGetEnquiriesResponse';
import { IGetOrdersData } from '../../../../../../../interface/order/IGetOrdersResponse';
import { formatDate4 } from '../../../../../../../utils/formatter';
import { useAppDispatch, useAppSelector } from '../../../../../../../redux/hooks';
import { updateEnquiryStatusRequest } from '../../../../../../../redux/slices/EnquirySlice';
import { IUpdateEnquiryRequest } from '../../../../../../../interface/enquiry/IupdateEnquiryRequest';
import { IUpdateEnquiryStatus, TUpdateEnquiryStatusRequest } from '../../../../../../../interface/enquiry/IUpdateEnquiryStatusRequest';
import Spinner from '../../../../../../../common/Spinner';

interface IShiftingFormProps {
  moduleName: MODULE_NAME;
  item: IGetOrdersData | IGetEnquiriesData;
}

const ShifingDetailForm: React.FC<IShiftingFormProps> = ({moduleName, item}) => {
  const shiftingTypeDropdownRef = useRef();
  const itemObj = moduleName == MODULE_NAME.ORDER ? item as IGetOrdersData : item as IGetEnquiriesData;
  console.log('item.shiftingLuggage---', JSON.stringify(itemObj.shiftingLuggage));

  const [shiftingLuggages, setShiftingLuggages] = useState<string[]>([]);
  const [shiftingType, setShiftingType] = useState<string>('');
  const [dateOfMoving, setDateOfMoving] = useState<string>(itemObj.shiftingDate);
  const [dateOfDelivery, setDateOfDelivery] = useState<string>('');
  const [dateOfDelivered, setDateOfDelivered] = useState<string>('');
  const [carriageVehicle, setCarriageVehicle] = useState<string>('');
  const {updateEnquiryStatusRequesting} = useAppSelector(state => state.Enquiry);

  const dispatch = useAppDispatch();
  
  const handleShiftingType = (item: TDropdownItem) => {
    setShiftingType(item.label);
  };

  const handleDateOfMoving = (date: Date) => {
    setDateOfMoving(formatDate4(date))
  };

  const handleDateOfDelivery = (date: Date) => {
    setDateOfDelivery(formatDate4(date))
  };

  const handleDateOfDelivered = (date: Date) => {
    setDateOfDelivered(formatDate4(date))
  };

  const handleCarriageVehicleInputTextChange = (text: string) => {
    setCarriageVehicle(text);
  }

  const handleUpdate = useCallback(() => {
    console.log('shiftingLuggages--', shiftingLuggages);
    console.log('carriageVehicle--', carriageVehicle);
    console.log('shiftingType--', shiftingType);
    console.log('dateOfMoving--', dateOfMoving);
    console.log('dateOfDelivery--', dateOfDelivery);
    console.log('dateOfDelivered--', dateOfDelivered);
    if(moduleName == MODULE_NAME.ORDER) {
      // TODO: call update order shifting detail api here
      const requestBody:IUpdateEnquiryRequest ={
        shiftingType: shiftingType.toUpperCase(),
        email: itemObj.email,
        mobile: itemObj.mobile,
        shiftingLuggage: shiftingLuggages,
        shiftingDate: dateOfMoving,
        pickupAddress: {
          shiftingFrom: itemObj.pickupAddress?.shiftingFrom,
          state: itemObj.pickupAddress?.state,
          city: itemObj.pickupAddress?.city,
          pincode: itemObj.pickupAddress?.pincode,
          locality: itemObj.pickupAddress?.city,
          isLiftAvailable: itemObj.pickupAddress?.isLiftAvailable
        },
        dropAddress: {
          shiftingTo: itemObj.dropAddress?.shiftingTo,
          state: itemObj.dropAddress?.state,
          city: itemObj.dropAddress?.city,
          pincode: itemObj.dropAddress?.pincode,
          locality: itemObj.dropAddress?.city,
          isLiftAvailable: itemObj.dropAddress?.isLiftAvailable
        }
      };
      const id:IUpdateEnquiryStatus = {
        enquiryId: itemObj._id,
        status: 'true'
      }
      dispatch(updateEnquiryStatusRequest({id, requestBody}))
      
    } else if(moduleName == MODULE_NAME.ENQUIRY) {
      const requestBody:IUpdateEnquiryRequest ={
        shiftingType: shiftingType.toUpperCase(),
        email: itemObj.email,
        mobile: itemObj.mobile,
        shiftingLuggage: shiftingLuggages,
        shiftingDate: dateOfMoving,
        pickupAddress: {
          shiftingFrom: itemObj.pickupAddress?.shiftingFrom,
          state: itemObj.pickupAddress?.state,
          city: itemObj.pickupAddress?.city,
          pincode: itemObj.pickupAddress?.pincode,
          locality: itemObj.pickupAddress?.city,
          isLiftAvailable: itemObj.pickupAddress?.isLiftAvailable
        },
        dropAddress: {
          shiftingTo: itemObj.dropAddress?.shiftingTo,
          state: itemObj.dropAddress?.state,
          city: itemObj.dropAddress?.city,
          pincode: itemObj.dropAddress?.pincode,
          locality: itemObj.dropAddress?.city,
          isLiftAvailable: itemObj.dropAddress?.isLiftAvailable
        }
      };
      const id:IUpdateEnquiryStatus = {
        enquiryId: itemObj._id,
        status: 'true'
      }
      dispatch(updateEnquiryStatusRequest({id, requestBody}))
      // TODO: call update enquiry shifting detail api here
    }
  },[itemObj, shiftingType, shiftingLuggages, dateOfMoving])

  

  const handleShiftingLuggage = (isChecked: boolean, value: string) => {
    let temp = [...shiftingLuggages];
    const itemIndex = temp.findIndex(itm => itm == value);
    if (itemIndex == -1 && isChecked) {
      temp.push(value);
    } else if (itemIndex != -1 && !isChecked) {
      temp = temp.filter(itm => itm != value);
    }
    setShiftingLuggages(temp);
  };

  useEffect(() => {
    if(itemObj) {
      if(shiftingTypeDropdownRef) {
        const dropdownItem: TDropdownItem = {
          label: itemObj.shiftingType,
          value: itemObj.shiftingType == 'DOMESTIC' ? '2' : '1',
        }
        //@ts-ignore
        shiftingTypeDropdownRef?.current.setDefaultValue(dropdownItem);
        setShiftingLuggages([...itemObj.shiftingLuggage])
      }
    }
  }, []);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Shifting Type" style={styles.label} />
            <DropdownComponent
              data={shiftingTypeOptions}
              onSelect={handleShiftingType}
              //@ts-ignore
              ref={shiftingTypeDropdownRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Date of Moving" style={styles.label} />
            <DatePickerComponent
              onDateSelect={handleDateOfMoving}
              defaultValue={new Date(itemObj.shiftingDate)}
            />
          </View>
        </View>
        <View style={styles.elementContainer3}>
          <Label text="Carriage Vehicle" style={styles.label} />
          <Input
            onChangeText={handleCarriageVehicleInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Shifting Luggage" style={styles.label} />
        </View>
        <View style={styles.elementContainer2}>
          {shiftingLuggageOptions.map((item, index) => {
            return (
              <BouncyCheckbox
                key={item.value}
                size={25}
                unfillColor="#FFFFFF"
                text={item.label}
                fillColor={COLOR_BLUE}
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 16,
                  height: 16,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 16,
                  height: 16,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15, marginBottom: 10}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                    handleShiftingLuggage(isChecked, item.label);
                }}
                isChecked={itemObj.shiftingLuggage.some(e => e == item.label)}
              />
            );
          })}
        </View>
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Date of Delivery" style={styles.label} />
            <DatePickerComponent onDateSelect={handleDateOfDelivery} />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Date of Delivered" style={styles.label} />
            <DatePickerComponent onDateSelect={handleDateOfDelivered} />
          </View>
        </View>
        <Spacer height={20} />
        <Button
          text="UPDATE"
          onPress={handleUpdate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spinner show={updateEnquiryStatusRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ShifingDetailForm;
