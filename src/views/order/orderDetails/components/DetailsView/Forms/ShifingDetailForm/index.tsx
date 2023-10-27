import React, { useEffect, useRef, useState } from 'react';
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
import { resetUpdateShiftingInfoRequest, updateShiftingInfoRequest } from '../../../../../../../redux/slices/EnquirySlice';
import Spinner from '../../../../../../../common/Spinner';
import { IUpdateShiftingInfoRequest } from '../../../../../../../interface/enquiry/IUpdateShiftingInfo';
import Toast from 'react-native-toast-message';
interface IShiftingFormProps {
  moduleName: MODULE_NAME;
  item: IGetOrdersData | IGetEnquiriesData;
  enquiryId: string;
}

const ShifingDetailForm: React.FC<IShiftingFormProps> = ({moduleName, item, enquiryId}) => {
  const shiftingTypeDropdownRef = useRef();
  const itemObj = moduleName == MODULE_NAME.ORDER ? item as IGetOrdersData : item as IGetEnquiriesData;

  const [shiftingLuggages, setShiftingLuggages] = useState<string[]>([]);
  const [shiftingType, setShiftingType] = useState<string>('');
  const [dateOfMoving, setDateOfMoving] = useState<string>(itemObj.shiftingDate);
  const [dateOfDelivery, setDateOfDelivery] = useState<string>('');
  const [dateOfDelivered, setDateOfDelivered] = useState<string>('');
  const [carriageVehicle, setCarriageVehicle] = useState<string>('');
  const {updateShiftingInfoRequesting, updateShiftingInfoSuccess, updateShiftingInfoFailure} = useAppSelector(state => state.Enquiry);

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

  const handleUpdate = () => {
    const payload:IUpdateShiftingInfoRequest ={
      shiftingType: shiftingType.toUpperCase(),
      shiftingLuggage: shiftingLuggages,
      shiftingDate: dateOfMoving,
      deliveryDate: dateOfDelivery,
      deliveredDate: dateOfDelivered,
    };
    dispatch(updateShiftingInfoRequest({id: enquiryId, requestBody: payload}))
  }

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
        const findPreviousShiftingTypeItemIndex = shiftingTypeOptions.findIndex(e => e.label.toLowerCase() == itemObj.shiftingType.toLowerCase());
        //@ts-ignore
        shiftingTypeDropdownRef?.current.setDefaultValue(shiftingTypeOptions[findPreviousShiftingTypeItemIndex]);
        setShiftingLuggages([...itemObj.shiftingLuggage]);
        setShiftingType(itemObj.shiftingType);
        setDateOfMoving(itemObj.shiftingDate);
        //@ts-ignore
        setDateOfDelivery(itemObj.deliveryDate);
        //@ts-ignore
        setDateOfDelivered(itemObj.dateOfDelivered);
      }
    }
  }, []);

  useEffect(() => {
    if (!updateShiftingInfoRequesting && updateShiftingInfoSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Shifting Info',
        text2: 'Shifting Info has been updated successfully',
      });
      dispatch(resetUpdateShiftingInfoRequest());
    } else if (!updateShiftingInfoRequesting && updateShiftingInfoFailure) {
      Toast.show({
        type: 'error',
        text1: 'Shifting Info',
        text2: 'Error in updating shifing info. Please try again!',
      });
      dispatch(resetUpdateShiftingInfoRequest());
    }
  }, [updateShiftingInfoRequesting, updateShiftingInfoSuccess, updateShiftingInfoFailure]);

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
        <Spinner show={updateShiftingInfoRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ShifingDetailForm;
