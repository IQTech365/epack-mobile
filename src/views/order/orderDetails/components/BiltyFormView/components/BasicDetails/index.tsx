import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import styles from './style';
import {Switch} from 'react-native-switch';
import Input from '../../../../../../../common/Input';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {formatDate4} from '../../../../../../../utils/formatter';
import useSerialNoHook from '../../../../../../../hooks/useSerialNo';

const BasicDetails: React.FC<{}> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;
  const {state, setBiltyLrCrNo, setDateOfBiltyLrCrNo} =
    useBiltyFormContextHook();
  const serialNo: number = useSerialNoHook();
  const biltyNoInputCompRef = useRef(null);

  useEffect(() => {
    if (serialNo) {
      setBiltyLrCrNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if (switchState) {
      if (serialNo) {
        setBiltyLrCrNo(serialNo.toString());
      }
      //@ts-ignore
      biltyNoInputCompRef && biltyNoInputCompRef?.current?.setValue(serialNo);
    } else {
      setBiltyLrCrNo('');
      //@ts-ignore
      biltyNoInputCompRef && biltyNoInputCompRef?.current?.setValue('');
    }
  }, [switchState]);

  return (
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
              onChangeText={setBiltyLrCrNo}
              containerStyle={styles.switchInputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              editable={!switchState}
              value={state.bilty_lr_cr_no}
              placeholder="Bilty / LR / CN No."
              //@ts-ignore
              ref={biltyNoInputCompRef}
            />
          </View>
        </View>
        <View style={styles.elementContainer2}>
          <Label text="Date of Bilty/LR/CN No." style={styles.label} />
          <DatePickerComponent
            style={{width: '100%'}}
            onDateSelect={(date: Date) => {
              setDateOfBiltyLrCrNo(formatDate4(date));
            }}
          />
        </View>
        <Spacer height={4} />
      </View>
    </CollapsibleView>
  );
};

export default BasicDetails;
