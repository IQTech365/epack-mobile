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
import Spacer from '../../../../../common/Spacer';
import { getSurveyCategoryRequest, getSurveyMaterialRequest } from '../../../../../redux/slices/CommonSlice';
import { useDispatch } from 'react-redux';
import Label from '../../../../../common/Label';
import Input, { InputMethods } from '../../../../../common/Input';
import { ISurveyListItem } from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import { prepareSurveyItemFormList, TSurveyItemListGroup } from '../../../../enquiry/enquiryDetails/utility';
import SurveyGroupItem from '../../../../enquiry/enquiryDetails/components/SurveyListView/SurveyGroupItem';
interface Props {
  isEdit?: boolean;
  item?: IGetQuotationData;
  quotationData?: ISingleQuotationData;
  surveyOtherItemList: ISurveyListItem[]; // New prop
  handleOtherItemsList: (item: ISurveyListItem) => void;
  onSurveyItemRequired: (value: boolean) => void;
  onSelectGroupItems: (itemName: string, qty: string, cft: string) => void;
  surveyItemList: []
}

const SurveyItemQuotation: React.FC<Props> = ({
  isEdit,
  item,
  surveyOtherItemList,
  handleOtherItemsList,
  onSurveyItemRequired,
  onSelectGroupItems,
  surveyItemList

}) => {
  const {state, setSurveyItem} = useQuotationFormContextHook();
  const [itemName, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [cftValue, setCftValue] = useState<string>('0');
  const [remarks, setRemarks] = useState<string>('');

  const dispatch = useDispatch()
  const itemNameCompRef = useRef<InputMethods>(null);
  const quantityCompRef = useRef<InputMethods>(null);
  const valueOfGoodsCompRef = useRef<InputMethods>(null);
  const remarksCompRef = useRef<InputMethods>(null);
  const cftCompRef = useState(null);

  // const { data } = surveyItemList
  console.log("surveyItemList44444",surveyItemList)

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

  const transformSurveyData = (): TSurveyItemListGroup[] => {
    const {data: surveyMaterials} = surveyMaterial || {};
    const {data: surveyCategories} = surveyCategory || {};
    return prepareSurveyItemFormList(surveyCategories, surveyMaterials);
  };
  const handleAddItem = () => {
    const newItem: ISurveyListItem = {
      itemName,
      quantity,
      valueOfGoods,
      remarks,
      cftValue,
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
    setCftValue('');
    //@ts-ignore
    cftCompRef && cftCompRef?.current?.reset();
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

  useEffect(() => {
    if(isEdit && surveyItemList){
      //@ts-ignore
      if ( surveyItemList && surveyItemList.data && surveyItemList.data.length > 0) {
        setSurveyItem('Required');
      }
      else {
        setSurveyItem('Not Required')
      }
    }
  }, [isEdit,surveyItemList]);


  // useEffect(()=>{
  //   const {data} = surveyItemList
  //   const surveyItemListData = data.surveyItems;
  //   if(surveyItemListData){
  //     setSurveyItem(surveyItemListData.)
  //   }
  // },[])


  // if (isEdit && quotationData) {
  //   const quotationfreight: IQuotationFreight =
  //     quotationData.quotationfreights;
  //   if (_.isObject(quotationfreight)) {
  //     const storageCharge: IStorage = quotationfreight.storageCharges;
  //     if (_.isObject(storageCharge)) {
  //       setStorage(storageCharge?.isRequired);
  //     } else if (_.isNull(storageCharge)) {
  //       setStorage(options2[1]);
  //     }
  //   }
  // }

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
        {transformSurveyData().map((it, index) => {
          return (
            <>
              <Spacer height={8} />
              <CollapsibleView
                title={it.groupName}
                collapsed={true}
                constainerStyle={styles.surveyItemGroupContainer}>
                <View>
                  {it.items.map((cit, index) => (
                    <SurveyGroupItem data={cit} key={index.toString()} onSelect={onSelectGroupItems} />
                  ))}
                </View>
              </CollapsibleView>
            </>
          );
        })}
      </View>
      <Spacer height={8} />
    <CollapsibleView title ="Add Other Items" collapsed={true} constainerStyle={styles.surveyItemGroupContainer}>
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
