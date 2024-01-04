import React, { FC } from "react";
import { Text, View } from 'react-native';
import styles from '../style';
import CollapsibleView from "../../../../common/CollapsibleView";
import Label from "../../../../common/Label";
import DropdownComponent from "../../../../common/DropdownComponent";
import Spacer from "../../../../common/Spacer";
import { useEnquiryFormContextHook } from "../../../../provider/EnquiryFormContextProvider";
import shiftingTypeOptions from '../../../../data/shiftingType.json';
import billingByOptions from '../../../../data/billingByOptions.json';
import shiftingLuggageOptions from '../../../../data/shiftingLuggage.json';
import { TDropdownItem } from "../../../../type/TDropdownItem";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLOR_BLUE } from "../../../../utils/colors";
import BillingIndividualView from "./BillingIndividualView";
import BillingCompanyView from "./BillingCompanyView";
interface IProps {}

const GeneralInfoView:FC<IProps> = ({}) => {

    const {state, setShiftingType, setBillingBy, setShiftingLuggages} = useEnquiryFormContextHook();

    const showShiftingLuggageErrorView = () => {
        //@ts-ignore
        const {shifting_luggages} = state || {};
        if (shifting_luggages.length == 0) {
          return (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Please select shifting luggage</Text>
            </View>
          );
        }
        return null;
      };

    const handleShiftingLuggagesSelection = (value: string) => {
        const {shifting_luggages} = state;
        let tempObj = [...shifting_luggages];
        const itemIndex = tempObj.findIndex(e => e == value);
        if (itemIndex == -1) {
          tempObj.push(value);
        } else {
          tempObj = tempObj.filter(e => e != value);
        }
        setShiftingLuggages(tempObj);
      };

    return <CollapsibleView title="GENERAL INFO" collapsed={false}>
    <View>
      <View style={styles.elementContainer}>
        <Label text="Shifting Type" style={styles.label} />
        <DropdownComponent
          data={shiftingTypeOptions}
          onSelect={(item: TDropdownItem) => {
            setShiftingType(item.label);
          }}
        />
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
      <View style={styles.labelContainer}>
        <Label
          text="Shifting Luggage"
          style={styles.label}
          required={true}
        />
      </View>
      <View style={styles.elementContainer2}>
        {shiftingLuggageOptions.map((item, index) => {
          return (
            <BouncyCheckbox
              key={index}
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
                handleShiftingLuggagesSelection(item.label);
              }}
              isChecked={
                state.shifting_luggages.findIndex(e => e == item.label) !==
                -1
              }
              disableBuiltInState={true}
            />
          );
        })}
      </View>
      {showShiftingLuggageErrorView()}
    </View>
  </CollapsibleView>
}

export default GeneralInfoView;