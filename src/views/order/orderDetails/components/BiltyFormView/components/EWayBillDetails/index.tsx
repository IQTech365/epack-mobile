import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input, {InputMethods} from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import DatePickerComponent, { IDateMethods } from '../../../../../../../common/DatePickerComponent';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {IBilty} from '../../../../../../../interface/order/IGetBiltyListResponse';

interface IProps {
  item?: IBilty;
  isEdit?: boolean;
}

const EWayBillDetails: React.FC<IProps> = ({item, isEdit}) => {
  const {state, setEWayBillNo, setGeneratedOn, setExpiryDate} =
    useBiltyFormContextHook();
  const ewayBillNoInputCompRef = useRef<InputMethods>(null);
  const generatedOnCompRef = useRef<IDateMethods>(null);
  const expirayDateCompRef = useRef<IDateMethods>(null);


  useEffect(() => {
    if (isEdit && item) {
      setEWayBillNo(item.eWayBill.number);
      ewayBillNoInputCompRef.current?.setValue(item.eWayBill.number);
      if(item?.eWayBill?.generationDate){
        setGeneratedOn(item.eWayBill.generationDate);
        generatedOnCompRef.current?.setDefaultValue(new Date(item.eWayBill.generationDate));
      }
      if(item?.eWayBill?.expiryDate){
        setExpiryDate(item.eWayBill.expiryDate);
        expirayDateCompRef.current?.setDefaultValue(new Date(item.eWayBill.expiryDate));
      }
      

    }
  }, [isEdit, item]);

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
              onDateSelect={(date: Date|null) => {
                if(date) {
                  setGeneratedOn(date.toISOString());
                }
              }}
              ref={generatedOnCompRef}
              datePickerType="date"
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Expiry Date" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date|null) => {
                if(date) {
                  setExpiryDate(date.toISOString());
                }
              }}
              ref={expirayDateCompRef}
              datePickerType="date"
            />
          </View>
        </View>
      </View>
    </CollapsibleView>
  );
};

export default EWayBillDetails;
