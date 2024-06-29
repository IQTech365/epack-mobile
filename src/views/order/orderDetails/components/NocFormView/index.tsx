import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import styles from './style';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import DatePickerComponent, { IDateMethods } from '../../../../../common/DatePickerComponent';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';
import { useAppSelector } from '../../../../../redux/hooks';
import Button from '../../../../../common/Button'; 
import { IBilty } from '../../../../../interface/order/IGetBiltyListResponse';
import { formatDate4 } from '../../../../../utils/formatter';

interface INocFormViewProps {
  navigation: NavigationProp<any, any>;
  orderId: string | undefined;
  // onSuccess: () => void;
}

const NocFormView: React.FC<INocFormViewProps> = ({ navigation,  orderId,
}) => {
  const [nocType, setNocType] = useState<string>('Household Goods');
  const [lrNumber, setLrNumber] = useState<string>('');
  const [lrDate, setLrDate] = useState<Date | null>(null);
  const [selectedLrNumber,setSelectedLRNumber] = useState<string>('')
  const { biltyList } = useAppSelector(state => state.Order);

  const dateofLr = useRef<IDateMethods>(null)

  const transformBiltyData = () => {
    let _data: string[] = [];
    const { data } = biltyList || {};
    if (
      data &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      _data = data
        .filter((e: IBilty) => e.enquiryId === orderId)
        .map((bilty: IBilty) => bilty?.biltyNumber);
    }
    return _data;
  };

  const handleLrNumberSelect = (selectedLrNumber: string) => {
    // const selectedBilty = biltyList.find(
    //   (bilty: IBilty) => bilty.biltyNumber === selectedLrNumber
    // );
    // if (selectedBilty) {
    //   setLrNumber(selectedBilty.biltyNumber);
    //   setLrDate(new Date(selectedBilty.biltyDate));
    // }
  };
  const handleNocType = () => {
    // setNocType(selectedType);
  };

  const handleLrNumber = (selectedValue: string) => {
    setSelectedLRNumber(selectedValue)

  }

  const handleNocFormView = () => {

  }

  useEffect(() => {
    if(selectedLrNumber && biltyList) {
      const {data} = biltyList || {};
      if(data && Array.isArray(data) && data.length > 0) {
        const selectedBilty = data.find(
          (bilty: IBilty) => bilty.biltyNumber === selectedLrNumber
        );
        if (selectedBilty) {
          setLrNumber(selectedBilty.biltyNumber);
          setLrDate(new Date(selectedBilty.biltyDate));
          dateofLr.current?.setDefaultValue(new Date(selectedBilty.biltyDate));
        }
      }
    }
  }, [selectedLrNumber]);

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
                <DatePickerComponent onDateSelect={(date: Date) => {
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
                  options={transformBiltyData()}
                  onSelect={handleLrNumber}
                  // onSelect={handleLrNumber}
                  containerStyle={styles.itemContainer}
                //   ref={quotationNoDropCompRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="LR Date" style={styles.label} />
                <DatePickerComponent onDateSelect={(date: Date) => {
                    handleLrNumberSelect(formatDate4(date))
                }}
                disabled={selectedLrNumber.length>0}
                // defaultValue={lrDate}
                ref={dateofLr}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>

        <Spacer height={12} />
        <Button
          text="Save"
          onPress={handleNocFormView}
          // disabled={createPackingMaterialRequesting}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        {/* <Spinner
          show={createMoneyReceiptRequesting || editMoneyReceiptListRequesting}
        /> */}
      </View>
    </AvoidSoftInputViewHOC>
  );
}

export default NocFormView;
