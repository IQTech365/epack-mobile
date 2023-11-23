import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../../../common/AvoidSoftInputViewHOC';
import Label from '../../../../../../../common/Label';
import {COLOR_BLUE} from '../../../../../../../utils/colors';
import styles from './style';
import shiftingTypeOptions from '../../../../../../../data/shiftingType.json';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import shiftingLuggageOptions from '../../../../../../../data/shiftingLuggage.json';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import Button from '../../../../../../../common/Button';
import {MODULE_NAME} from '../../enum/EModuleName';
import {formatDate4} from '../../../../../../../utils/formatter';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hooks';
import {
  getEnquiryRequest,
  resetUpdateShiftingInfoRequest,
  updateShiftingInfoRequest,
} from '../../../../../../../redux/slices/EnquirySlice';
import Spinner from '../../../../../../../common/Spinner';
import {IUpdateShiftingInfoRequest} from '../../../../../../../interface/enquiry/IUpdateShiftingInfo';
import Toast from 'react-native-toast-message';
import {ISingleEnquiryData} from '../../../../../../../interface/enquiry/ISingleEnquiryResponse';
import { getOrderRequest } from '../../../../../../../redux/slices/OrderSlice';
import { ISingleOrderRequest } from '../../../../../../../interface/order/ISingleOrderRequest';
interface IShiftingFormProps {
  moduleName: MODULE_NAME;
  item: ISingleEnquiryData;
  enquiryId: string;
  onClose: () => void;
}

interface IErrors {
  shiftingDate: string | null,
  deliveryDate: string | null,
  deliveredDate: string | null,
}

const ShifingDetailForm: React.FC<IShiftingFormProps> = ({
  moduleName,
  item,
  enquiryId,
  onClose,
}) => {
  const shiftingTypeDropdownRef = useRef();
  const dateOfMoivingCompRef = useRef();
  const dateOfDeliveryCompRef = useRef();
  const dateOfDeliveredCompRef = useRef();

  const [shiftingLuggages, setShiftingLuggages] = useState<string[]>([]);
  const [shiftingType, setShiftingType] = useState<string>('');
  const [dateOfMoving, setDateOfMoving] = useState<string>(item?.shiftingDate);
  const [dateOfDelivery, setDateOfDelivery] = useState<string>('');
  const [dateOfDelivered, setDateOfDelivered] = useState<string>('');
  const [carriageVehicle, setCarriageVehicle] = useState<string>('');
  // Error states
  const [errors, setErrors] = useState<IErrors|undefined>(undefined);
  const [shiftingDateError, setShiftingDateError] = useState<string>('');
  const [deliveryDateError, setDeliveryDateError] = useState<string>('');
  const [deliveredDateError, setDeliveredDateError] = useState<string>('');
  const {
    updateShiftingInfoRequesting,
    updateShiftingInfoSuccess,
    updateShiftingInfoFailure,
    getEnquiryRequesting,
  } = useAppSelector(state => state.Enquiry);

  const dispatch = useAppDispatch();
  const handleShiftingType = (item: TDropdownItem) => {
    setShiftingType(item.label);
  };

  const handleDateOfMoving = (date: Date) => {
    setDateOfMoving(formatDate4(date));
  };

  const handleDateOfDelivery = (date: Date) => {
    setDateOfDelivery(formatDate4(date));
  };

  const handleDateOfDelivered = (date: Date) => {
    setDateOfDelivered(formatDate4(date));
  };

  const handleCarriageVehicleInputTextChange = (text: string) => {
    setCarriageVehicle(text);
  };


  const handleUpdate = () => {
    if(!dateOfMoving) {
      setShiftingDateError('Shifting date required');
    } else {
      setShiftingDateError('');
    }
    if(!dateOfDelivery) {
      setDeliveryDateError('Delivery date required');
    } else {
      setDeliveryDateError('');
    }
    if(!dateOfDelivered) {
      setDeliveredDateError('Delivered date required');
    } else {
      setDeliveredDateError('');
    }
  };

  useEffect(() => {
    const noErrors = !shiftingDateError && !deliveryDateError && !deliveredDateError;
    const allValues = dateOfMoving && dateOfDelivery && dateOfDelivered;
    if(noErrors && allValues) {
      const payload: IUpdateShiftingInfoRequest = {
        shiftingType: shiftingType.toUpperCase(),
        shiftingLuggage: shiftingLuggages,
        shiftingDate: dateOfMoving,
        deliveryDate: dateOfDelivery,
        deliveredDate: dateOfDelivered,
      };
      dispatch(updateShiftingInfoRequest({id: enquiryId, requestBody: payload}));
    }
  }, [shiftingDateError, deliveryDateError, deliveredDateError]);

  const handleShiftingLuggage = (value: string) => {
    let temp = [...shiftingLuggages];
    const itemIndex = temp.findIndex(itm => itm == value);
    if (itemIndex == -1) {
      temp.push(value);
    } else if (itemIndex != -1) {
      temp = temp.filter(itm => itm != value);
    }
    setShiftingLuggages(temp);
  };

  useEffect(() => {
    if (item) {
      if (shiftingTypeDropdownRef) {
        const findPreviousShiftingTypeItemIndex = shiftingTypeOptions.findIndex(
          e => e.label.toLowerCase() == item.shiftingType.toLowerCase(),
        );
        //@ts-ignore
        shiftingTypeDropdownRef?.current.setDefaultValue(
          shiftingTypeOptions[findPreviousShiftingTypeItemIndex],
        );
        setShiftingLuggages([...item.shiftingLuggage]);
        setShiftingType(item.shiftingType);
        setDateOfMoving(item.shiftingDate);
        if(item.shiftingDate) {
          //@ts-ignore
          dateOfMoivingCompRef && dateOfMoivingCompRef.current?.setDefaultValue(new Date(item.shiftingDate))
        }
        //@ts-ignore
        setDateOfDelivery(item.deliveryDate);
        if(item.deliveryDate) {
          //@ts-ignore
          dateOfDeliveryCompRef && dateOfDeliveryCompRef.current?.setDefaultValue(new Date(item.deliveryDate))
        }
        //@ts-ignore
        setDateOfDelivered(item.deliveredDate);
        if(item.deliveredDate) {
          //@ts-ignore
          dateOfDeliveredCompRef && dateOfDeliveredCompRef.current?.setDefaultValue(new Date(item.deliveredDate))
        }
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
      if(moduleName == MODULE_NAME.ENQUIRY) {
        dispatch(getEnquiryRequest(enquiryId));
      } else if(moduleName == MODULE_NAME.ORDER) {
        const payload: ISingleOrderRequest = {
          _id: enquiryId
        }
        dispatch(getOrderRequest(payload));
      }
      onClose();
    } else if (!updateShiftingInfoRequesting && updateShiftingInfoFailure) {
      Toast.show({
        type: 'error',
        text1: 'Shifting Info',
        text2: 'Error in updating shifing info. Please try again!',
      });
      dispatch(resetUpdateShiftingInfoRequest());
    }
  }, [
    updateShiftingInfoRequesting,
    updateShiftingInfoSuccess,
    updateShiftingInfoFailure,
  ]);

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
              //@ts-ignore
              ref={dateOfMoivingCompRef}
              error={shiftingDateError}
            />
          </View>
        </View>
        {/* <View style={styles.elementContainer3}>
          <Label text="Carriage Vehicle" style={styles.label} />
          <Input
            onChangeText={handleCarriageVehicleInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View> */}
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Shifting Luggage" style={styles.label} />
        </View>
        <View style={styles.elementContainer2}>
          {shiftingLuggageOptions.map((itm, index) => {
            return (
              <BouncyCheckbox
                key={itm.value}
                size={25}
                unfillColor="#FFFFFF"
                text={itm.label}
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
                  handleShiftingLuggage(itm.label);
                }}
                isChecked={shiftingLuggages.findIndex(e => e == itm.label) != -1}
                disableBuiltInState={true}
              />
            );
          })}
        </View>
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Date of Delivery" style={styles.label} />
            <DatePickerComponent
              onDateSelect={handleDateOfDelivery} 
              //@ts-ignore
              ref={dateOfDeliveryCompRef}
              error={deliveryDateError}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Date of Delivered" style={styles.label} />
            <DatePickerComponent 
              onDateSelect={handleDateOfDelivered}
              //@ts-ignore
              ref={dateOfDeliveredCompRef}
              error={deliveredDateError}
             />
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
        <Spinner show={updateShiftingInfoRequesting || getEnquiryRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ShifingDetailForm;
