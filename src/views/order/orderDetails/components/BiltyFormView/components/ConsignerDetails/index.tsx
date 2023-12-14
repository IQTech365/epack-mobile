import React, {useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import LoadingAddressView from './LoadingAddressView';

const ConsignerDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setConsignerName,
    setConsignerGst,
    setConsignerMobileNo,
    setConsignerAddress,
    setConsignerPincode,
    setConsignerState,
    setConsignerCity,
    setIsLoadingAddressSameAsConsigner,
    setLoadingAddress,
    setLoadingState,
    setLoadingPincode,
    setLoadingCity,
  } = useBiltyFormContextHook();

  const stateDropdwonCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);

  return (
    <CollapsibleView title="CONSIGNER DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer2}>
          <Label text="Consigner Name" style={styles.label} />
          <Input
            onChangeText={setConsignerName}
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
              onChangeText={setConsignerGst}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Consigner Mobile No." style={styles.label} />
            <Input
              onChangeText={setConsignerMobileNo}
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
            onChangeText={setConsignerAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={setConsignerPincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select State'}
              hanldeData={setConsignerState}
              //@ts-ignore
              ref={stateDropdwonCompRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <EpackDropdown
              data={[]}
              placeholder={'Select City'}
              hanldeData={setConsignerCity}
              //@ts-ignore
              ref={cityDropdownCompRef}
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
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
              setIsLoadingAddressSameAsConsigner(
                !state.loading_address_same_as_consigner,
              );
            }}
            isChecked={state.loading_address_same_as_consigner}
            disableBuiltInState={true}
          />
        </View>
        <LoadingAddressView />
      </View>
    </CollapsibleView>
  );
};

export default ConsignerDetails;
