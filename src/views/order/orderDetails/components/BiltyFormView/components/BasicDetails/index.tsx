import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import styles from './style';
import {Switch} from 'react-native-switch';
import Input, {InputMethods} from '../../../../../../../common/Input';
import DatePickerComponent, {
  IDateMethods,
} from '../../../../../../../common/DatePickerComponent';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {formatDate4} from '../../../../../../../utils/formatter';
import useSerialNoHook from '../../../../../../../hooks/useSerialNo';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';

interface IProps {
  item?: IBilty;
  isEdit?: boolean;
}

const BasicDetails: React.FC<IProps> = ({item, isEdit}) => {
  const [switchState, setSwitchState] = useState<boolean>(true);
  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;
  const {state, setBiltyLrCrNo, setDateOfBiltyLrCrNo} =
    useBiltyFormContextHook();
  const serialNo: number = useSerialNoHook();
  const biltyNoInputCompRef = useRef<InputMethods>(null);
  const dateCompRef = useRef<IDateMethods>(null);

  useEffect(() => {
    if (!isEdit && serialNo) {
      setBiltyLrCrNo(serialNo.toString());
    }
  }, [serialNo, isEdit]);

  useEffect(() => {
    if (switchState) {
      if (!isEdit && serialNo) {
        setBiltyLrCrNo(serialNo.toString());
        biltyNoInputCompRef &&
          biltyNoInputCompRef?.current?.setValue(serialNo.toString());
      }
    } else {
      if (!isEdit) {
        setBiltyLrCrNo('');
        biltyNoInputCompRef && biltyNoInputCompRef?.current?.setValue('');
      }
    }
  }, [switchState]);

  useEffect(() => {
    if (isEdit && item) {
      biltyNoInputCompRef.current?.setValue(item.biltyNumber);
      setSwitchState(true);
      setBiltyLrCrNo(item.biltyNumber);
      dateCompRef.current?.setDefaultValue(new Date(item.biltyDate));
      setDateOfBiltyLrCrNo(formatDate4(new Date(item.biltyDate)));
    }
  }, [isEdit, item]);

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
              disabled={isEdit}
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
              ref={biltyNoInputCompRef}
            />
          </View>
        </View>
        <View style={styles.elementContainer2}>
          <Label text="Date of Bilty/LR/CN No." style={styles.label} />
          <DatePickerComponent
            style={{width: '100%'}}
            onDateSelect={(date: Date|null) => {
              if(date) {
                setDateOfBiltyLrCrNo(formatDate4(date));
              }
            }}
            ref={dateCompRef}
          />
        </View>
        <Spacer height={4} />
      </View>
    </CollapsibleView>
  );
};

export default BasicDetails;
