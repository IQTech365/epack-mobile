import React, {useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {formatDate4} from '../../../../../../../utils/formatter';
import { IBilty } from '../../../../../../../interface/order/IGetBiltyListResponse';

interface IProps {
  item?:IBilty;
  isEdit?:boolean;
}

const EWayBillDetails: React.FC<IProps> = ({item, isEdit}) => {
  const {state, setEWayBillNo, setGeneratedOn, setExpiryDate} =
    useBiltyFormContextHook();
  const ewayBillNoInputCompRef = useRef(null);

  return (
    <CollapsibleView title="E-Way BILL DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer2}>
          <Label text="E-Way Bill No." style={styles.label} />
          <Input
            onChangeText={setEWayBillNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            //@ts-ignore
            ref={ewayBillNoInputCompRef}
            autoCapitalize="characters"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Generated On" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setGeneratedOn(formatDate4(date));
              }}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Expiry Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setExpiryDate(formatDate4(date));
              }}
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default EWayBillDetails;
