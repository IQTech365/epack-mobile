import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';
import Button from '../../../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import Spinner from '../../../../../common/Spinner';
import {
  IAddSurveyItemRequest,
  ISurveyListItem,
} from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import {
  addSurveyItemRequest,
  getSurveyItemListRequest,
  resetAddSurveyItemRequest,
} from '../../../../../redux/slices/EnquirySlice';
import useAuthId from '../../../../../hooks/useAuthId';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {IGetSurvyeItemListRequestPayload} from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import {
  DOCUMENT_TYPE,
  IGetSerialNoRequest,
} from '../../../../../interface/setting/serialNo/serialNo';
import {
  getSerialNoRequest,
  resetGetSerialNoRequest,
} from '../../../../../redux/slices/SerialNoSettingSlice';
import {ToastType, showToast} from '../../../../../utils/utility';
import CollapsibleView from '../../../../../common/CollapsibleView';
import {
  getSurveyCategoryRequest,
  getSurveyMaterialRequest,
} from '../../../../../redux/slices/CommonSlice';
import {prepareSurveyItemFormList, TSurveyItemListGroup} from '../../utility';
import SurveyGroupItem from './SurveyGroupItem';

interface ISurveyListViewProps {
  enquiryId: string;
  items: string[];
  item: string;
  quantity: number;
}

const SurveyListView: React.FC<ISurveyListViewProps> = ({enquiryId}) => {
  const {addSurveyItemRequesting, addSurveyItemSuccess, addSurveyItemFailure} = useAppSelector(state => state.Enquiry);
  const [surveyNo, setSurveyNo] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [itemName, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [cftValue, setCftValue] = useState<string>('0');
  const [remarks, setRemarks] = useState<string>('');
  const [surveyItems, setSurveyItems] = useState<ISurveyListItem[]>([]);
  const [surveyOtherItemList, setSurveyOtherItemList] = useState<ISurveyListItem[]>([]);
  const [groupSruveyItems, setGroupSurveyItems] = useState<ISurveyListItem[]>([]);
  const [resetSelection, setResetSelection] = useState(false);

  const authId = useAuthId();

  const {surveyMaterial, surveyCategory} = useAppSelector(state => state.Common);

  const itemNameCompRef = useRef(null);
  const quantityCompRef = useRef(null);
  const valueOfGoodsCompRef = useRef(null);
  const remarksCompRef = useRef(null);
  const cftCompRef = useState(null);

  const serialNo: number = useSerialNoHook();

  const {initialValue, prefix} = useInitialValueHook('658d3d2f585e3dde644da9b2');

  const _getSerialNoRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSerialNoRequest = {
          document: DOCUMENT_TYPE.SURVEY_ITEM,
          payload: {
            activeCount: initialValue,
            companyId: id as string,
            isAuto: true,
            isHeadOffice: true,
          },
        };
        dispatch(getSerialNoRequest(payload));
      })
      .catch(err => console.log('err--', err));
  };

  const handleReset = () => {
    setResetSelection(true);
  };

  const transformSurveyData = (): TSurveyItemListGroup[] => {
    const {data: surveyMaterials} = surveyMaterial || {};
    const {data: surveyCategories} = surveyCategory || {};
    return prepareSurveyItemFormList(surveyCategories, surveyMaterials);
  };

  const dispatch = useAppDispatch();

  const handleSurveyListInputTextChange = (text: string) => {
    setSurveyNo(text);
  };

  const handleReceiptDate = (date: Date) => {
    // setDate(formatDate2(date));
    setDate(date.toISOString());
  };

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

  const handleAddItem = () => {
    if (
      serialNo.toString() === '' ||
      serialNo.toString() === null ||
      serialNo.toString() === undefined ||
      serialNo === 0
    ) {
      Alert.alert('Error', 'Please set serial NO# from Setting.');
      return;
    }
    const newItem: ISurveyListItem = {
      itemName,
      quantity,
      valueOfGoods,
      remarks,
    };
    setSurveyOtherItemList([...surveyOtherItemList, newItem]);
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
  };

  const handleSave = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IAddSurveyItemRequest = {
          companyId: id as string,
          enquiryId: enquiryId,
          surveyListNo: serialNo.toString(),
          surveyDate: date,
          surveyItems: [...groupSruveyItems, ...surveyOtherItemList], // Combine both lists here
          addedBy: authId,
          isAuto: true,
          isHeadOffice: true,
        };
        dispatch(addSurveyItemRequest(payload));
      })
      .catch(err => console.log(err));
  };

  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSurvyeItemListRequestPayload = {
          enquiryId: enquiryId,
          // id: id as string,
        };
        console.log('payload1212', payload);
        dispatch(getSurveyItemListRequest(payload));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    dispatch(resetGetSerialNoRequest());
    dispatch(getSurveyMaterialRequest());
    dispatch(getSurveyCategoryRequest());
    _getSerialNoRequest();
  }, []);

  useEffect(() => {
    if (resetSelection) {
      setResetSelection(false); // Reset the flag after the component has been reset
    }
  }, [resetSelection]);

  useEffect(() => {
    if (serialNo) {
      setSurveyNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if (!addSurveyItemRequesting && addSurveyItemSuccess) {
      showToast('Survey Item List Created.', ToastType.SUCCESS);
      handleReset();
      setSurveyOtherItemList([]);
      dispatch(resetAddSurveyItemRequest());
      dispatch(resetGetSerialNoRequest());
      setSurveyItems([]);
      _getSurveyItemListRequest();
    } else if (!addSurveyItemRequesting && addSurveyItemFailure) {
      showToast('Survey Item List not Created.', ToastType.ERROR);
      dispatch(resetAddSurveyItemRequest());
    }
  }, [addSurveyItemRequesting, addSurveyItemSuccess, addSurveyItemFailure]);

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
            {d.cftValue ? (
              <View style={styles.elementContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>CFT Value:</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{d.cftValue}</Text>
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

  const collectSelectedGroupItems = (itemName: string, qty: string, cft: string) => {
    const copy = [...groupSruveyItems];
    const isItemExist = copy.find(it => it.itemName === itemName);
    if(isItemExist && qty === '0' && cft === '0') {
      const filteredItems = copy.filter(it => it.itemName !== itemName);
      setGroupSurveyItems(filteredItems);
    } else if (isItemExist && qty !== '0'){
      const itemIndex = copy.findIndex(it => it.itemName === itemName);
      if(itemIndex !== -1) {
        const updatedItem:ISurveyListItem = {
          itemName: itemName,
          quantity: qty,
          cftValue: cft,
          valueOfGoods: '',
          remarks: '',
        }
        copy[itemIndex] = updatedItem;
        setGroupSurveyItems(copy);
      }
    } else {
      const newItem:ISurveyListItem = {
        itemName: itemName,
        quantity: qty,
        cftValue: cft,
        valueOfGoods: '',
        remarks: '',
      }
      copy.push(newItem);
      setGroupSurveyItems(copy);
    }
  }

  useEffect(() => {
    transformSurveyData();
  }, [surveyMaterial]);

  return (
    <>
      <CollapsibleView
        title="Basic Details"
        collapsed={false}
        constainerStyle={styles.surveyItemGroupContainer}>
        <View>
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Survey List No." style={styles.label} />
              <Input
                onChangeText={handleSurveyListInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Serial#"
                value={surveyNo}
                editable={false}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Date" style={styles.label} />
              <DatePickerComponent
                onDateSelect={handleReceiptDate}
                style={styles.itemContainer}
              />
            </View>
          </View>
        </View>
        {/* </View> */}
      </CollapsibleView>
      <Spacer height={8} />
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
                    <SurveyGroupItem data={cit} key={index.toString()} onSelect={collectSelectedGroupItems} />
                  ))}
                </View>
              </CollapsibleView>
            </>
          );
        })}
      </View>
      <Spacer height={8} />
      <CollapsibleView
        title="Add Other Items"
        collapsed={true}
        constainerStyle={styles.surveyItemGroupContainer}>
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
                placeholder="Enter particular/item name"
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
                  placeholder="Enter quantity"
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
              <Label text="CFT" style={styles.label} />
              <Input
                onChangeText={(text) => {
                  setCftValue(text);
                }}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={cftValue}
                selectionColor={COLOR_BLACK}
                placeholder="Enter CFT value"
                //@ts-ignore
                ref={cftCompRef}
              />
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
                placeholder="Enter remarks"
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
            textStyle={styles.textStyle}
          />
          <Spacer height={12} />
          {showSurveyItemList()}
        </>
      </CollapsibleView>
      <Spacer height={12} />
      <Button
        text="Save"
        onPress={handleSave}
        disabled={addSurveyItemRequesting}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={8} />
      <Spinner show={addSurveyItemRequesting} />
    </>
  );
};
export default SurveyListView;
