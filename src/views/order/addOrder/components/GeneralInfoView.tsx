import React, {FC} from 'react';
import {Text, View} from 'react-native';
import styles from '../style';
import CollapsibleView from '../../../../common/CollapsibleView';
import Label from '../../../../common/Label';
import DropdownComponent from '../../../../common/DropdownComponent';
import DatePickerComponent from '../../../../common/DatePickerComponent';
import Spacer from '../../../../common/Spacer';
import Input from '../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import shiftingTypeOptions from '../../../../data/shiftingType.json';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import {useOrderFormContextHook} from '../../../../provider/OrderFormContextProvider';
import {formatDate4} from '../../../../utils/formatter';
import billingByOptions from '../../../../data/billingByOptions.json';
import shiftingLuggageOptions from '../../../../data/shiftingLuggage.json';
import BillingIndividualView from './BillingIndividualView';
import BillingCompanyView from './BillingCompanyView';

interface IProps {}

const GeneralInfoView: FC<IProps> = ({}) => {
  const {
    state,
    setShiftingType,
    setShiftingLuggages,
    setDateOfMoving,
    setBillingBy,
    setOrderAmount,
    setTokenAmount,
  } = useOrderFormContextHook();

  const handleShiftingLuggage = (value: string) => {
    const {shifting_luggages} = state;
    let temp = [...shifting_luggages];
    const itemIndex = temp.findIndex(itm => itm == value);
    if (itemIndex == -1) {
      temp.push(value);
    } else if (itemIndex != -1) {
      temp = temp.filter(itm => itm != value);
    }
    setShiftingLuggages(temp);
  };

  const showShiftingLuggageErrorView = () => {
    //@ts-ignore
    const {shifting_luggages} = state;
    if (shifting_luggages.length == 0) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>Please select shifting luggages</Text>
        </View>
      );
    }
    return null;
  };
  return (
    <CollapsibleView title="GENERAL INFO" collapsed={false}>
      <View>
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Shifting Type" style={styles.label} />
            <DropdownComponent
              data={shiftingTypeOptions}
              onSelect={(item: TDropdownItem) => {
                setShiftingType(item.label);
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="Date of Moving" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setDateOfMoving(formatDate4(date));
              }}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Billing By" style={styles.label} />
          <DropdownComponent
            data={billingByOptions}
            onSelect={(item: TDropdownItem) => {
              setBillingBy(item.label);
            }}
          />
        </View>
        <Spacer height={4} />
        {state.billing_by == billingByOptions[0].label ? <BillingIndividualView /> : <BillingCompanyView />}
        <Spacer height={4} />
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Order Amount" style={styles.label} />
            <Input
              onChangeText={setOrderAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="Token Amount" style={styles.label} />
            <Input
              onChangeText={setTokenAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
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
                iconStyle={styles.iconStyle}
                innerIconStyle={styles.innerIconStyle}
                textStyle={styles.textStyle2}
                style={{marginRight: 15, marginBottom: 10}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  handleShiftingLuggage(item.label);
                }}
                isChecked={
                  state.shifting_luggages.findIndex(e => e == item.label) !== -1
                }
                disableBuiltInState={true}
              />
            );
          })}
        </View>
        {showShiftingLuggageErrorView()}
      </View>
    </CollapsibleView>
  );
};

export default GeneralInfoView;
