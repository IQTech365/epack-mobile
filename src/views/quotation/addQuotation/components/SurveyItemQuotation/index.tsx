import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Button from '../../../../../common/Button';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import {options2} from '../FreightDetailsView/components/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';

import {ISingleQuotationData} from '../../../../../interface/quotation/IGetSingleQuotationResponse';
import {IGetQuotationData} from '../../../../../interface/quotation/IGetQuotationsResponse';
import _ from 'underscore';
import {useAppSelector} from '../../../../../redux/hooks';
import SelectCheckBoxText from '../../../../../common/SelectCheckBoxText';
import Spacer from '../../../../../common/Spacer';
import { resetGetSerialNoRequest } from '../../../../../redux/slices/SerialNoSettingSlice';
import { getSurveyCategoryRequest, getSurveyMaterialRequest } from '../../../../../redux/slices/CommonSlice';
import { useDispatch } from 'react-redux';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import { IAddSurveyItemRequest, ISurveyListItem } from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import { getCurrentCompanyId } from '../../../../../utils/storage';
interface Props {
  isEdit?: boolean;
  item?: IGetQuotationData;
  quotationData?: ISingleQuotationData;
  onItemSelect: (text: string, qty: number) => void;
  onItemDeselect: (text: string) => void;
  surveyOtherItemList: ISurveyListItem[]; // New prop
  handleOtherItemsList: (item: ISurveyListItem) => void;
  onSurveyItemRequired: (value: boolean) => void;
}

const SurveyItemQuotation: React.FC<Props> = ({
  isEdit,
  item,
  onItemSelect,
  onItemDeselect,
  quotationData,
  surveyOtherItemList,
  handleOtherItemsList,
  onSurveyItemRequired

}) => {
  const {state, setSurveyItem} = useQuotationFormContextHook();
  const [itemName, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');

  const dispatch = useDispatch()
  const itemNameCompRef = useRef(null);
  const quantityCompRef = useRef(null);
  const valueOfGoodsCompRef = useRef(null);
  const remarksCompRef = useRef(null);

  const [transformedData, setTransformedData] = useState<
    TPackingMateiralItem[]
  >([]);

  const {surveyCategory, surveyMaterial} = useAppSelector(
    state => state.Common,
  );

  const handleParticularNameInputTextChange = (text: string) => {
    setItem(text);
  };
  const handleQuantityInputTextChange = (text: string) => {
    setQuantity(text);
  };

  const handleGoodsInputTextChange = (text: string) => {
    setValueOfGoods(text);
  };

  const handleDescriptionInputTextChange = (text: string) => {
    setRemarks(text);
  };

  type TPackingMateiralItem = {
    _id: string;
    surveyCategoryId: string;
    surveyMaterialItem: string;
    surveyCategoryName: string;
  };

  const transformSurveyData = () => {
    let _data: TPackingMateiralItem[] = [];
    const {data: surveyMaterials} = surveyMaterial || {};
    const {data: surveyCategories} = surveyCategory || {};

    if (
      surveyMaterials &&
      Array.isArray(surveyMaterials) &&
      surveyMaterials.length > 0
    ) {
      const groupedData = surveyMaterials.reduce((acc, curr) => {
        const {surveyCategoryId, surveyMaterialItem} = curr;
        const category = surveyCategories?.find(
          (cat: TPackingMateiralItem) => cat._id === surveyCategoryId,
        );

        if (category) {
          const surveyCategoryName = category.surveyCategoryName;

          if (!acc[surveyCategoryName]) {
            acc[surveyCategoryName] = {
              surveyCategoryName,
              surveyMaterialItem: [],
            };
          }

          acc[surveyCategoryName].surveyMaterialItem.push(surveyMaterialItem);
        }

        return acc;
      }, {});

      _data = Object.values(groupedData);
    }
    setTransformedData(_data);
  };
  const handleAddItem = () => {
    const newItem: ISurveyListItem = {
      itemName,
      quantity,
       valueOfGoods,
       remarks,
    };
    handleOtherItemsList(newItem);
    resetForm();
  };

  const resetForm = () => {
    setItem('');
    //@ts-ignore
    itemNameCompRef && itemNameCompRef?.current?.reset();
    setQuantity('');
    //@ts-ignore
    quantityCompRef && quantityCompRef?.current?.reset();
    setValueOfGoods('');
    //@ts-ignore
    valueOfGoodsCompRef && valueOfGoodsCompRef?.current?.reset();
    setRemarks('');
    //@ts-ignore
    remarksCompRef && remarksCompRef?.current?.reset();
  }


  useEffect(() => {
    transformSurveyData();
  }, [surveyMaterial]);

  useEffect(() => {
    dispatch(getSurveyMaterialRequest())
    dispatch(getSurveyCategoryRequest())
  }, []);


  const showSurveyItemList = () => {
    if (surveyOtherItemList.length > 0) {
      return surveyOtherItemList.map((d: ISurveyListItem, index: number) => {
        return (
          <View style={styles.itemWrapper} key={`${index}`}>
            <View style={styles.elementContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Item Name:</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{d.itemName}</Text>
              </View>
            </View>
            {d.quantity ? (
              <View style={styles.elementContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Quantity:</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{d.quantity}</Text>
                </View>
              </View>
            ) : null}
            {d.valueOfGoods ? (
              <View style={styles.elementContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Goods Value:</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{d.valueOfGoods}</Text>
                </View>
              </View>
            ) : null}
            {d.remarks ? (
              <View style={styles.elementContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Remarks:</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{d.remarks}</Text>
                </View>
              </View>
            ) : null}
          </View>
        );
      });
    }
    return null;
  };


  return (
    <CollapsibleView title="SURVEY ITEM" collapsed={true}>
      <View>
        <View style={styles.optionContainer}>
          {options2.map((option: string, index: number) => (
            <BouncyCheckbox
              key={`${index}`}
              size={25}
              unfillColor="#FFFFFF"
              text={option}
              fillColor={COLOR_BLUE}
              iconStyle={styles.iconStyle}
              innerIconStyle={styles.innerIconStyle}
              textStyle={styles.textStyle}
              style={styles.style}
              textContainerStyle={styles.textContainerStyle}
              onPress={(isChecked: boolean) => {
                  onSurveyItemRequired(option === 'Required');
                  setSurveyItem(option);
              }}
              isChecked={state.surveyItem == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        {state.surveyItem === options2[0] && (
          <>
          <View>
            {transformedData.length > 0 && (
              <View>
                {transformedData.map((item, index) => (
                    
                    <View key={index}>
                      <Spacer height={4} />
                    <CollapsibleView title={item.surveyCategoryName} collapsed={true}>
                      <View>
                        <SelectCheckBoxText
                          items={Array.isArray(item.surveyMaterialItem) ? item.surveyMaterialItem : [item.surveyMaterialItem]}
                          onItemSelect={onItemSelect}
                         onItemDeselect={onItemDeselect}
                        />
                      </View>
                    </CollapsibleView>
                  </View>
                ))} 
              </View>
            )}
          </View>
          <Spacer height={8} />
    <CollapsibleView title ="Add Other Items" collapsed={true}>
      <>
      <View>
      <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Item/Particulars Name" style={styles.label} />
            <Input
              onChangeText={handleParticularNameInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={itemName}
              selectionColor={COLOR_BLACK}
              placeholder='Enter particular/item name'
              //@ts-ignore
              ref={itemNameCompRef}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Quantity" style={styles.label} />
              <Input
                onChangeText={handleQuantityInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={quantity}
                selectionColor={COLOR_BLACK}
                inputType="numeric"
                placeholder='Enter quantity'
                //@ts-ignore
                ref={quantityCompRef}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of Goods" style={styles.label} />
              <Input
                onChangeText={handleGoodsInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={valueOfGoods}
                inputType="numeric"
                selectionColor={COLOR_BLACK}
                placeholder="Enter goods value"
                //@ts-ignore
                ref={valueOfGoodsCompRef}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Remark" style={styles.label} />
            <Input
              onChangeText={handleDescriptionInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={remarks}
              selectionColor={COLOR_BLACK}
              placeholder='Enter remarks'
              //@ts-ignore
              ref={remarksCompRef}
            />
          </View>
      </View>
      <Spacer height={12} />
        <Button
          text="Add item/Particular"
          onPress={handleAddItem}
          disabled={itemName === ''}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle2}
        />
        <Spacer height={12} />
        {showSurveyItemList()}
      </>
    </CollapsibleView>
          </>
          
        )}
      </View>
    </CollapsibleView>
  );
};

export default SurveyItemQuotation;
