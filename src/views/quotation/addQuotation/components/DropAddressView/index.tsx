import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import EpackDropdown from '../../../../../common/DropdownComponent2';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent from '../../../../../common/DropdownComponent';
import liftStatusOptions from '../../../../../data/liftStatusOptions.json';
import floorOptions from '../../../../../data/floorOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
interface Props {
  //
}

const DropAddressView: React.FC<Props> = ({}) => {
  const {
    state,
    setDropPincode,
    setDropState,
    setDropCity,
    setDropAddress,
    setDropCurrentFloor,
    setDropLiftStatus
  } = useQuotationFormContextHook();

  return (
    <CollapsibleView title="DROP ADDRESS" collapsed={true}>
      <View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Pincode" style={styles.label} required={true} />
            <Input
              onChangeText={setDropPincode}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="pincode"
              //@ts-ignore
              // error={showErrors && errors.pickupPincode}
              value={state?.drop_pincode}
              type="text"
              required={true}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="State" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select State'}
              hanldeData={setDropState}
              //@ts-ignore
              // ref={pickupStateDropwdownRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={[]}
            placeholder={'Select City'}
            hanldeData={setDropCity}
            //@ts-ignore
            //   ref={pickupCityDropdownRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setDropAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            //@ts-ignore
            // error={showErrors && errors.pickupPincode}
            value={state?.drop_address}
            type="text"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Current Floor" style={styles.label} />
            <DropdownComponent
              data={floorOptions}
              onSelect={(item: TDropdownItem) => {
                setDropCurrentFloor(item.label);
              }}
              defaultValue={floorOptions[3]}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="Lift Status" style={styles.label} />
            <DropdownComponent
              data={liftStatusOptions}
              onSelect={(item: TDropdownItem) => {
                setDropLiftStatus(item.label);
              }}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default DropAddressView;
