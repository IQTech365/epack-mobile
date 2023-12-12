import React, { useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import CollapsibleView from "../../../../../../../common/CollapsibleView";
import Spacer from "../../../../../../../common/Spacer";
import Label from "../../../../../../../common/Label";
import BouncyCheckboxGroup, { ICheckboxButton } from "react-native-bouncy-checkbox-group";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Input from "../../../../../../../common/Input";
import { COLOR_BLACK, COLOR_BLUE } from "../../../../../../../utils/colors";
import DropdownComponent from "../../../../../../../common/DropdownComponent";
import Button from "../../../../../../../common/Button";
import packingMaterilUnitOptions from '../../../../../../../data/packingMaterialUnitOptions.json';
import packingOptions from '../../../../../../../data/packingOptions.json';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import { IMaterial } from "../../biltyReducer2";
import { useBiltyFormContextHook } from "../../../../../../../provider/BiltyFormContextProvider";
import packingMaterilOptions from '../../../../../../../data/packingMaterialOptions.json';
import { TDropdownItem } from "../../../../../../../type/TDropdownItem";
import { riskTypeOptions, typeOfMovingOptions } from "./utils";

const MaterialDetails:React.FC<{}> = ({}) => {
    const {state, setMaterials} = useBiltyFormContextHook();
    const [materialName, setMaterialName] = useState<string>('');
    const [noOfArticles, setNoOfArticles] = useState<string>('');
    const [packingType, setPackingType] = useState<string>('');
    const [hsnCode, setHsnCode] = useState<string>('');
    const [billInvoiceNo, setBillInvoiceNo] = useState<string>('');
    const [actualWeight, setActualWeight] = useState<string>('');
    const [applicableWeight, setApplicableWeight] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [valueOfGoods, setValueOfGoods] = useState<string>('');

    const handleDeleteMaterialItem = (index: number) => {
        const clone = [...state.materials];
        const filter = clone.filter((_, i) => i !== index);
        setMaterials(filter);
    };

    const handleAddMaterial = () => {
        const clone = [...state.materials];
        const materil: IMaterial = {
          material_name: materialName,
          no_of_articles: noOfArticles,
          packing_type: packingType,
          hsn_code: hsnCode,
          bill_invoice_no: billInvoiceNo,
          actual_weight: actualWeight,
          applicable_weight: applicableWeight,
          units: unit,
          value_of_goods: valueOfGoods,
        };
        clone.push(materil);
        setMaterials(clone);
        // dispatch({
        //   type: BILTY_FORM_ACTION.RESET_ADD_MATERIAL_STATE,
        //   payload: '',
        // });
    };

    const showMaterialList = () => {
        if (state.materials.length > 0) {
          return state.materials.map((item, index) => {
            return (
              <>
                <Spacer height={12} />
                <View style={styles.materialItemContainer}>
                  <View
                    style={[
                      styles.materialItem,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.materialLabelText}>SNO# - </Text>
                      <Text style={styles.materialValueText}>{index + 1}</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.4}
                      onPress={() => handleDeleteMaterialItem(index)}>
                      <DeleteIcon width={25} height={25} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>Material Name - </Text>
                    <Text style={styles.materialValueText}>{item.material_name}</Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>
                      Number of Articles -{' '}
                    </Text>
                    <Text style={styles.materialValueText}>
                      {item.no_of_articles}
                    </Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>Packing Type - </Text>
                    <Text style={styles.materialValueText}>{item.packing_type}</Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>HSN Code - </Text>
                    <Text style={styles.materialValueText}>{item.hsn_code}</Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>
                      Bill/Invoice Number -{' '}
                    </Text>
                    <Text style={styles.materialValueText}>{item.bill_invoice_no}</Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>Net Weight - </Text>
                    <Text style={styles.materialValueText}>
                      {item.actual_weight}
                    </Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>Unit - </Text>
                    <Text style={styles.materialValueText}>{item.units}</Text>
                  </View>
                  <View style={styles.materialItem}>
                    <Text style={styles.materialLabelText}>Value Of Goods - </Text>
                    <Text style={styles.materialValueText}>
                      {item.value_of_goods}
                    </Text>
                  </View>
                </View>
                <Spacer height={12} />
              </>
            );
          });
        }
        return null;
      };

    return (
        <CollapsibleView title="MATERIAL DETAILS" collapsed={true}>
          <View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Type of Moving" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              <BouncyCheckboxGroup
                data={typeOfMovingOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  //
                }}
                style={{flexDirection: 'row', flexWrap: 'wrap'}}
              />
            </View>
            {state.type_of_moving == 'Household' ||
            state.type_of_moving == 'Vehicle' ? (
              <>
                <Spacer height={16} />
                <View style={styles.elementContainer}>
                  <BouncyCheckbox
                    size={25}
                    fillColor={COLOR_BLUE}
                    unfillColor="#FFFFFF"
                    text="Want to add Material Detail"
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 18,
                      height: 18,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 18,
                      height: 18,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                    //   dispatch({
                    //     type: BILTY_FORM_ACTION.ADD_MATERIAL_STATUS,
                    //     payload: isChecked ? 'YES' : 'NO',
                    //   });
                    }}
                    // isChecked={reducerState.addMaterialsStatus == 'YES'}
                  />
                </View>
              </>
            ) : null}
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Material Name" style={styles.label} />
              <Input
                onChangeText={setMaterialName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="No. of Articles" style={styles.label} />
                <Input
                  onChangeText={setNoOfArticles}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={packingMaterilOptions}
                  onSelect={(item:TDropdownItem) => {
                    setPackingType(item.label);
                  }}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="HSN Code" style={styles.label} />
                <Input
                  onChangeText={setHsnCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Invoice No." style={styles.label} />
                <Input
                  onChangeText={setBillInvoiceNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Actual Weight" style={styles.label} />
                <Input
                  onChangeText={setActualWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType='numeric'
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Applicable Weight" style={styles.label} />
                <Input
                  onChangeText={setApplicableWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType='numeric'
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Units" style={styles.label} />
                <DropdownComponent
                  data={packingMaterilUnitOptions}
                  onSelect={(item:TDropdownItem) => {
                    setUnit(item.label);
                  }}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Value of Goods" style={styles.label} />
                <Input
                  onChangeText={setValueOfGoods}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType='numeric'
                />
              </View>
            </View>
            <Spacer height={12} />
            <Button
              text="ADD"
              onPress={handleAddMaterial}
              disabled={false}
              style={styles.previewButtonStyle}
              textStyle={styles.textStyle}
            />
            {showMaterialList()}
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Risk Type" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={riskTypeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                //   dispatch({
                //     type: BILTY_FORM_ACTION.RISK_TYPE,
                //     payload: selectedItem.text as string,
                //   });
                }}
              />
            </View>
          </View>
        </CollapsibleView>
    );
}

export default MaterialDetails;