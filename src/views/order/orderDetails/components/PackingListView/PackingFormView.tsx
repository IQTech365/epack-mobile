import React, {useEffect, useReducer, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import {
  ICreatePackingMaterialRequest,
  IPackingItem,
} from '../../../../../interface/order/IPackingMaterialResponse';
import {ACTION, initialState, packingReducer} from './packingReducer';
import {formatDate4} from '../../../../../utils/formatter';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Button from '../../../../../common/Button';
import useAuthId from '../../../../../hooks/useAuthId';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  createPackingMaterialsRequest,
  resetCreatePackingMaterialsRequest,
} from '../../../../../redux/slices/OrderSlice';
import {Shadow} from 'react-native-shadow-2';
import Spinner from '../../../../../common/Spinner';
import {IPackingType} from '../../../../../interface/common/common';
import DeleteIcon from '../../../../../images/icons/delete.svg';
import {ToastType, showToast} from '../../../../../utils/utility';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {
  DOCUMENT_TYPE,
  IGetSerialNoRequest,
} from '../../../../../interface/setting/serialNo/serialNo';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import {
  getSerialNoRequest,
  resetGetSerialNoRequest,
} from '../../../../../redux/slices/SerialNoSettingSlice';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
import CollapsibleView from '../../../../../common/CollapsibleView';
import SurveyList from '../../../../../data/surveyList.json';
import {
  getSurveyCategoryRequest,
  getSurveyMaterialRequest,
} from '../../../../../redux/slices/CommonSlice';
import SelectCheckBoxTextPackingList from '../../../../../common/SelectCheckBoxPackingList';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  IGetSurvyeItemListByIdRequestPayload,
  IGetSurvyeItemListRequestPayload,
} from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import {getSurveyItemListRequest} from '../../../../../redux/slices/EnquirySlice';
import {ISurveyListItem} from '../../../../../interface/enquiry/IAddSurveyItemRequest';

interface Props {
  orderId: string;
  items: string[];
  item: string;
  quantity: number;
  // enquiryId: string;
  onSuccess: () => void;
}

const ListHeaderView: React.FC<Props> = ({orderId, onSuccess}) => {
  const [state, dispatch] = useReducer(packingReducer, initialState);
  const [itemName, setItemName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [packingType, setPackingType] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [surveyListNumber, setSurveyListNumber] = useState<string>('');
  const [items, setItems] = useState<IPackingItem[]>([]);
  const [transformedData, setTransformedData] = useState<
    TPackingMateiralItem[]
  >([]);
  const [packingOtherItemList, setPackingOtherItemList] = useState<
    IPackingItem[]
  >([]);

  const [checkboxPackingItems, setCheckboxPackingItems] = useState<
    IPackingItem[]
  >([]);
  const [filterOtherItem, setFilterOtherItem] = useState<boolean>(false);
  const [showSurveyDropdown, setShowSurveyDropdown] = useState<boolean>(false); // New state to control dropdown visibility
  const [surveyDataFetch, setSurveyDataFetch] = useState<boolean>(false);
  const {
    createPackingMaterialRequesting,
    createPackingMaterialSuccess,
    createPackingMaterialFailure,
    packingListTemplateRequesting,
    packingListTemplateSuccess
  } = useAppSelector(state => state.Order);
  const {packingTypes} = useAppSelector(state => state.Common);
  const {surveyMaterial, surveyCategory} = useAppSelector(
    state => state.Common,
  );
  const {initialValue, prefix} = useInitialValueHook(
    '658d3cc6585e3dde644da985',
  );
  const serialNo: number = useSerialNoHook();

  const {surveyItemList} = useAppSelector(state => state.Enquiry);
  const [initialPackingList, setInitialPackingLIst] = useState<boolean>(false);

  const itemNameInputRef = useRef(null);
  const quntityInputRef = useRef(null);
  const productCodeInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

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

  const _getPackingTypes = () => {
    let packTypes: TDropdownItem[] = [];
    const {data} = packingTypes || {};
    if (data && Array.isArray(data) && data.length > 0) {
      packTypes = data.map((d: IPackingType) => {
        const item: TDropdownItem = {
          label: d.packingType,
          value: d.packingType,
        };
        return item;
      });
    }
    return packTypes;
  };

  const _resetInputs = () => {
    setItemName('');
    //@ts-ignore
    itemNameInputRef && itemNameInputRef?.current?.reset();

    setQuantity('');
    //@ts-ignore
    quntityInputRef && quntityInputRef?.current?.reset();

    setProductCode('');
    //@ts-ignore
    productCodeInputRef && productCodeInputRef?.current?.reset();

    setValueOfGoods('');
    //@ts-ignore
    amountInputRef && amountInputRef?.current?.reset();

    setDescription('');
    //@ts-ignore
    descriptionInputRef && descriptionInputRef?.current?.reset();
  };

  const authId = useAuthId();
  const dispatch2 = useAppDispatch();

  const handleItemSelect = (itemCollection: IPackingItem[]) => {
    setCheckboxPackingItems(prevItems => {
      const updatedItems = [...prevItems];

      itemCollection.forEach(newItem => {
        const existingItemIndex = updatedItems.findIndex(
          item => item.itemName === newItem.itemName,
        );

        if (existingItemIndex > -1) {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...newItem,
          };
        } else {
          updatedItems.push({...newItem, productCode: 'NA', description: 'NA'});
        }
      });

      return updatedItems;
    });
  };

  const handleItemDeselect = (itemName: string) => {
    setCheckboxPackingItems(prevItems => {
      const updatedItems = prevItems.filter(
        packingItem => packingItem.itemName !== itemName,
      );
      return updatedItems;
    });
  };

  const handleCreate = () => {
    if (
      state.packing_no === '' ||
      state.packing_no === null ||
      state.packing_no === undefined
    ) {
      Alert.alert('Error', 'Please set serial NO# from Setting.');
      return;
    }
    getCurrentCompanyId()
      .then(id => {
        const payload: ICreatePackingMaterialRequest = {
          companyId: id as string,
          enquiryId: orderId,
          packingListNo: state.packing_no,
          packingDate: state.packing_date,
          packingItems: [...checkboxPackingItems, ...packingOtherItemList],
          addedBy: authId,
          isAuto: true,
          isHeadOffice: true,
        };
        dispatch2(createPackingMaterialsRequest(payload));
      })
      .catch(err => console.log('error in getting company id'));
  };
  const addPackingItem = () => {
    // const clone = [...items];
    const item: IPackingItem = {
      itemName,
      quantity,
      packingType,
      productCode,
      valueOfGoods,
      description,
    };
    // clone.push(item);
    setPackingOtherItemList([...packingOtherItemList, item]);
    _resetInputs();
  };

  const deletePackingItem = (index: number) => {
    const clone = [...items];
    const filter = clone.filter((_, indx: number) => indx !== index);
    setItems(filter);
  };

  const renderPackingListItem = () => {
    if (packingOtherItemList.length > 0) {
      return (
        <>
          {packingOtherItemList.map((item: IPackingItem, index: number) => {
            return (
              <Shadow distance={1}>
                <View style={styles.listItemContainer} key={`${index}`}>
                  <View style={styles.rowItemContainer}>
                    <View style={styles.leftItemContainer}>
                      <View style={styles.itemContainer2}>
                        <Text style={styles.labelText}>Item Name: </Text>
                        <Text style={styles.valueText}>{item.itemName}</Text>
                      </View>
                      <View style={styles.itemContainer2}>
                        <Text style={styles.labelText}>Quantity: </Text>
                        <Text style={styles.valueText}>{item.quantity}</Text>
                      </View>
                      <View style={styles.itemContainer2}>
                        <Text style={styles.labelText}>Packing Type: </Text>
                        <Text style={styles.valueText}>{item.packingType}</Text>
                      </View>
                      <View style={styles.itemContainer2}>
                        <Text style={styles.labelText}>Product Code: </Text>
                        <Text style={styles.valueText}>{item.productCode}</Text>
                      </View>
                      <View style={styles.itemContainer2}>
                        <Text style={styles.labelText}>Value of Goods: </Text>
                        <Text style={styles.valueText}>
                          {item.valueOfGoods}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.deleteIconContainer}>
                      <TouchableOpacity
                        onPress={() => deletePackingItem(index)}>
                        <DeleteIcon width={30} height={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Shadow>
            );
          })}
        </>
      );
    }
    return null;
  };

  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSurvyeItemListRequestPayload = {
          enquiryId: orderId,
          // id: id as string,
        };

        dispatch2(getSurveyItemListRequest(payload));
      })
      .catch(err => console.log(err));
  };

  // const dataOfSurvey = surveyItemList.data.map((item)=> item.surveyItems)
  // console.log("dataOfSurvey",dataOfSurvey)

  // console.log("surveyItemList1111",surveyItemList.data.)

  const getSurveyListNoData = () => {
    const surveyData = surveyItemList.data.map((item: any) => {
      return {label: item.surveyListNo, value: item._id};
    });
    console.log('surveyData', surveyItemList);
    return surveyData;
  };

  const handleSurveyDropdownSelect = (selectedValue: string) => {
    const payload: IGetSurvyeItemListByIdRequestPayload = {
      id: selectedValue,
    };
    dispatch2(getSurveyItemListRequest(payload));
    setInitialPackingLIst(true);
  };

  const handleCheckboxPress = () => {
    setShowSurveyDropdown(!showSurveyDropdown);
  };

  useEffect(() => {
    if (surveyListNumber) {
      _getSurveyItemListRequest();
    }
  }, [surveyListNumber]);

  const _getSerialNoRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IGetSerialNoRequest = {
          document: DOCUMENT_TYPE.PACKING_LIST,
          payload: {
            activeCount: initialValue,
            companyId: id as string,
            isAuto: true,
            isHeadOffice: true,
          },
        };
        dispatch2(getSerialNoRequest(payload));
      })
      .catch(err => console.log('err--', err));
  };

  useEffect(() => {
    dispatch2(resetGetSerialNoRequest());
    dispatch2(getSurveyMaterialRequest());
    dispatch2(getSurveyCategoryRequest());
    _getSerialNoRequest();
    _getSurveyItemListRequest();
  }, []);

  useEffect(() => {
    if (serialNo) {
      dispatch({
        type: ACTION.PACKING_NO,
        payload: serialNo.toString(),
      });
    }
  }, [serialNo]);

  // useEffect(()=>{
  //   if(!packingListTemplateRequesting && packingListTemplateSuccess){
  //   }
  // },[])

  useEffect(() => {
    if (!createPackingMaterialRequesting && createPackingMaterialSuccess) {
      showToast('Packing Item List Created', ToastType.SUCCESS);
      dispatch2(resetCreatePackingMaterialsRequest());
      dispatch2(resetGetSerialNoRequest());
      onSuccess && onSuccess();
    } else if (
      !createPackingMaterialRequesting &&
      createPackingMaterialFailure
    ) {
      showToast('Packing Item List Not Created', ToastType.ERROR);
      dispatch2(resetCreatePackingMaterialsRequest());
    }
  }, [
    createPackingMaterialRequesting,
    createPackingMaterialSuccess,
    createPackingMaterialFailure,
  ]);

  useEffect(() => {
    transformSurveyData();
  }, [surveyMaterial]);

  // console.log("surveyItemList",surveyItemList.data.surveyItems[0])

  useEffect(() => {
    if (surveyItemList && surveyItemList.data) {
      const transformedSurveyItemList = surveyItemList.data.flatMap(
        (item: {surveyItems: any[]}) => {
          console.log("transformedSurveyItemList",transformedSurveyItemList)
          return item.surveyItems.map(
            (surveyItem: {
              itemName: any;
              productCode: any;
              quantity: any;
              valueOfGoods: any;
              remarks: any;
            }) => ({
              itemName: surveyItem.itemName,
              productCode: surveyItem.productCode,
              quantity: surveyItem.quantity,
              valueOfGoods: surveyItem.valueOfGoods,
              remarks: surveyItem.remarks,
            }),
          );
        },
      );
      const filteredOtherItemData = transformedData.flatMap(
        item => item.surveyMaterialItem,
      );

      const otherItems = transformedSurveyItemList.filter(
        (surveyItem: {itemName: string}) =>
          !filteredOtherItemData.includes(surveyItem.itemName),
      );
      if(initialPackingList){
        setPackingOtherItemList(otherItems);
      }
      // setInitialPackingLIst(false)
      const filteredCheckBoxData = transformedSurveyItemList.filter(
        (surveyItem: any) => !otherItems.includes(surveyItem),
      );
      setCheckboxPackingItems(filteredCheckBoxData);
    }
  }, [surveyItemList, transformedData]);

  return (
    <>
      {surveyItemList && surveyItemList.data.length > 0 && (
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            fillColor={COLOR_BLUE}
            size={35}
            text="Convert Survey List to Packing List"
            unfillColor="#FFFFFF"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.iconStyle}
            textStyle={styles.textStyleCheck}
            onPress={() => handleCheckboxPress()}
          />
        </View>
      )}

      {showSurveyDropdown && (
        <View style={styles.itemContainerSurvey}>
          <Label text="Select Survey No" style={styles.label} />
          <DropdownComponent
            data={getSurveyListNoData()}
            onSelect={(item: TDropdownItem) => {
              handleSurveyDropdownSelect(item.value);
            }}
            // onSelect={item => handleSurveyDropdownSelect(item.value)}
          />
        </View>
      )}
      <CollapsibleView title="Basic Details" collapsed={false}>
        <View>
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Packing List No." style={styles.label} />
              <Input
                onChangeText={(text: string) => {
                  dispatch({
                    type: ACTION.PACKING_NO,
                    payload: text,
                  });
                }}
                value={state.packing_no}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Serial#"
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Date" style={styles.label} />
              <DatePickerComponent
                onDateSelect={(date: Date) => {
                  dispatch({
                    type: ACTION.PACKING_DATE,
                    payload: formatDate4(date),
                  });
                }}
              />
            </View>
          </View>
        </View>
      </CollapsibleView>
      <View>
        {transformedData.map((item, index) => (
          <View key={index}>
            <Spacer height={8} />
            <CollapsibleView title={item.surveyCategoryName} collapsed={true}>
              <View>
                <SelectCheckBoxTextPackingList
                  items={
                    Array.isArray(item.surveyMaterialItem)
                      ? item.surveyMaterialItem
                      : [item.surveyMaterialItem]
                  }
                  onItemSelect={handleItemSelect}
                  onItemDeselect={handleItemDeselect}
                  initialValues={checkboxPackingItems}
                  initialPackingList={initialPackingList}
                />
              </View>
            </CollapsibleView>
          </View>
        ))}
      </View>
      <Spacer height={8} />
      <CollapsibleView title="Add Other Items" collapsed={true}>
        <>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Item/Particulars Name" style={styles.label} />
              <Input
                onChangeText={setItemName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={itemName}
                selectionColor={COLOR_BLACK}
                placeholder="Enter item name"
                //@ts-ignore
                ref={itemNameInputRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Quantity" style={styles.label} />
                <Input
                  onChangeText={setQuantity}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  placeholder="Enter quantity"
                  inputType="numeric"
                  //@ts-ignore
                  ref={quntityInputRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={_getPackingTypes()}
                  onSelect={(item: TDropdownItem) => {
                    setPackingType(item.label);
                  }}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Product Code" style={styles.label} />
                <Input
                  onChangeText={setProductCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  placeholder="Enter code"
                  autoCapitalize="characters"
                  //@ts-ignore
                  ref={productCodeInputRef}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Value Of goods" style={styles.label} />
                <Input
                  onChangeText={setValueOfGoods}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  value={valueOfGoods}
                  selectionColor={COLOR_BLACK}
                  placeholder="Enter amount"
                  inputType="numeric"
                  //@ts-ignore
                  ref={amountInputRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Description" style={styles.label} />
              <Input
                onChangeText={setDescription}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter Description"
                //@ts-ignore
                ref={descriptionInputRef}
              />
            </View>
          </View>
          <Spacer height={12} />
          <Button
            text="Add item/Particular"
            onPress={addPackingItem}
            disabled={itemName === ''}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={20} />
          {renderPackingListItem()}
        </>
      </CollapsibleView>
      <Spacer height={12} />
      <Button
        text="Save"
        onPress={handleCreate}
        disabled={createPackingMaterialRequesting}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spinner show={createPackingMaterialRequesting} />
    </>
  );
};

export default ListHeaderView;
