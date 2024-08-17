import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY} from '../../../../../utils/colors';
import {TSurveyMaterialCategory} from '../../utility';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import { ISurveyListItem } from '../../../../../interface/enquiry/IAddSurveyItemRequest';

export type TSurveyGroupItemProps = {
  data: TSurveyMaterialCategory;
  onSelect: (itemName: string, qty: string, cft: string, groupID: string) => void;
  groupID: string;
  selectedItem?:ISurveyListItem|undefined;
};

const SurveyGroupItem: React.FC<TSurveyGroupItemProps> = ({data, onSelect, groupID, selectedItem}) => {
  const isItemSelected = selectedItem?.itemName === data.surveyMaterialItem;
  const [isRequired, setIsRequired] = useState<boolean>(isItemSelected);
  const [quantity, setQuantity] = useState<string>(selectedItem ? selectedItem.quantity : '1');
  const [cftValue, setCftValue] = useState<string>(selectedItem ? selectedItem.cftValue as string : '0');

  const toggle = () => {
    setIsRequired(!isRequired);
  };

  


  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={25}
        unfillColor="#FFFFFF"
        text={data.surveyMaterialItem}
        fillColor={COLOR_BLUE}
        iconStyle={styles.iconStyle}
        innerIconStyle={styles.innerIconStyle}
        textStyle={styles.textStyle}
        style={styles.style}
        textContainerStyle={styles.textContainerStyle}
        onPress={(isChecked: boolean) => {
          toggle();
        }}
        isChecked={isRequired}
        disableBuiltInState={true}
      />
      {(isRequired) ? (
        <View style={styles.inputBoxContainer}>
          <View style={styles.inputWrapper}>
            <Label text="CFT" style={styles.label} />
            <Input
              onChangeText={text => {
                if(isRequired) {
                    setCftValue(text);
                    onSelect(data.surveyMaterialItem, quantity, text, groupID);
                } else {
                    onSelect(data.surveyMaterialItem, '0', '0', groupID);
                }
              }}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={cftValue}
              selectionColor={COLOR_BLACK}
              placeholder="Enter CFT"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Label text="Unit/Quantity" style={styles.label} />
            <Input
              onChangeText={text => {
                if(isRequired) {
                    setQuantity(text);
                    onSelect(data.surveyMaterialItem, text, cftValue, groupID);
                } else {
                    onSelect(data.surveyMaterialItem, '0', '0', groupID);
                }
              }}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={quantity}
              selectionColor={COLOR_BLACK}
              placeholder="Enter Quantity"
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SurveyGroupItem;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    paddingHorizontal: 5,
    margin: 8,
  },
  inputBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  style: {
    marginRight: 20,
    marginBottom: 15,
  },
  textContainerStyle: {
    paddingLeft: 0,
    marginLeft: 5,
  },
  iconStyle: {
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  innerIconStyle: {
    borderWidth: 1,
    borderRadius: 12,
    width: 22,
    height: 22,
  },
  textStyle: {
    fontFamily: 'WorkSans-Medium',
    color: COLOR_BLACK,
    textDecorationLine: 'none',
    fontSize: 15,
  },
  inputWrapper: {
    width: '48%',
  },
  inputContainer: {
    width: '100%',
    borderColor: COLOR_GRAY,
    paddingLeft: 4,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
  label: {
    color: COLOR_BLACK,
    fontSize: 14,
  },
});
