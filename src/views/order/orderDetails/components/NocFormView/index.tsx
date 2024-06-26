import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, Button } from 'react-native';
import styles from './style';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import paymentTypeOptions from '../../../../../data/paymentTypeOptions.json';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import { COLOR_BLACK } from '../../../../../utils/colors';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';
import { useAppSelector } from '../../../../../redux/hooks';
import { IQuotation } from '../../../../../interface/quotation/quotation';

interface INocFormViewProps {
  navigation: NavigationProp<any, any>;
  orderId: string | undefined;

}

const NocFormView: React.FC<INocFormViewProps> = ({ navigation }) => {
  const [nocType, setNocType] = useState<string>('Household Goods');
  const [lrNumber, setLrNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [moveFromCity, setMoveFromCity] = useState<string>('');
  const [moveToCity, setMoveToCity] = useState<string>('');
  const {quotationList} = useAppSelector(state => state.Quotation);


  const transformQuotationData = () => {
    let _data: string[] = [];
    const {data} = quotationList || {};
    if (
      data &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      _data = data
        .filter((e: IQuotation) => e.enquiryId == 'orderId')
        .map((quotation: IQuotation) => quotation?.quotationNumber);
    }
    return _data;
  };

  const handleNocType = () => {
    // setNocType(selectedType);
  };

  const handleofNumber =()=>{

  }

  const handleReceiptNoInputTextChange =()=>{

  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title={"NOC DETAILS"} collapsed={false}>
          <View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="NOC Type" style={styles.label} />
              <DropdownComponent
                data={shiftingLuggages}
                onSelect={handleNocType}
                // defaultValue={isEdit ? editData.paymentType : ''}
                // ref={paymentTypeDropCompRef}
              />
            </View>
            <View style={styles.itemContainer}>
                <Label text="Date" style={styles.label} />
                <DatePickerComponent onDateSelect={(date: Date)=>{
                //   handleReceiptDate(formatDate4(date))
                }}
                // ref={dateOfMoneyReceiptRef}
                 />
              </View>
                </View>

            
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="LR Number" style={styles.label} />
                <DropdownWithTextInput
                  options={transformQuotationData()}
                  onSelect={handleofNumber}
                  containerStyle={styles.itemContainer}
                //   ref={quotationNoDropCompRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="LR Date" style={styles.label} />
                <DatePickerComponent onDateSelect={(date: Date) =>{
                //   handleArivalDate(formatDate4(date))
                }}
                // ref={dateOfArrivalRef}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        
        <Spacer height={12} />
        {/* <Button
        //   text={'CREATE'}
        //   onPress={handleCreate}
        //   disabled={createMoneyReceiptRequesting || editMoneyReceiptListRequesting}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        /> */}
        <Spacer height={8} />
        {/* <Spinner
          show={createMoneyReceiptRequesting || editMoneyReceiptListRequesting}
        /> */}
      </View>
    </AvoidSoftInputViewHOC>
  );
}

export default NocFormView;
