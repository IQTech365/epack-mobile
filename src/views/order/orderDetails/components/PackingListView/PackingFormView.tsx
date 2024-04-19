import React, {useEffect, useReducer, useRef, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
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
import {createPackingMaterialsRequest, resetCreatePackingMaterialsRequest} from '../../../../../redux/slices/OrderSlice';
import {Shadow} from 'react-native-shadow-2';
import Spinner from '../../../../../common/Spinner';
import {IPackingType} from '../../../../../interface/common/common';
import DeleteIcon from '../../../../../images/icons/delete.svg';
import { ToastType, showToast } from '../../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { DOCUMENT_TYPE, IGetSerialNoRequest } from '../../../../../interface/setting/serialNo/serialNo';
import useInitialValueHook from '../../../../../hooks/useInitialValueHook';
import { getSerialNoRequest, resetGetSerialNoRequest } from '../../../../../redux/slices/SerialNoSettingSlice';
import useSerialNoHook from '../../../../../hooks/useSerialNo';

interface Props {
  orderId: string;
  onSuccess: () => void;
}

const ListHeaderView: React.FC<Props> = ({orderId, onSuccess}) => {
  const [state, dispatch] = useReducer(packingReducer, initialState);
  const [particularName, setParticularName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [packingType, setPackingType] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [items, setItems] = useState<IPackingItem[]>([]);
  const {
    createPackingMaterialRequesting,
    createPackingMaterialSuccess,
    createPackingMaterialFailure,
  } = useAppSelector(state => state.Order);
  const {packingTypes} = useAppSelector(state => state.Common);
  const {initialValue, prefix} = useInitialValueHook('658d3cc6585e3dde644da985');
  const serialNo:number = useSerialNoHook();

  const itemNameInputRef = useRef(null);
  const quntityInputRef = useRef(null);
  const productCodeInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

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
    setParticularName('');
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
  }

  const authId = useAuthId();
  const dispatch2 = useAppDispatch();

  const handleCreate = () => {
    getCurrentCompanyId().then(id => {
      const payload: ICreatePackingMaterialRequest = {
        companyId: id as string,
        enquiryId: orderId,
        packingListNo: state.packing_no,
        packingDate: state.packing_date,
        packingItems: items,
        addedBy: authId,
        isAuto:true,
        isHeadOffice: true,
      };
      dispatch2(createPackingMaterialsRequest(payload));
    }).catch(err => console.log('error in getting company id'));
  };

  const addPackingItem = () => {
    const clone = [...items];
    const item: IPackingItem = {
      itemName: particularName,
      quantity: quantity,
      packingType: packingType,
      productCode: productCode,
      valueOfGoods: valueOfGoods,
      description: description,
    };
    clone.push(item);
    setItems(clone);
    _resetInputs();
  };

  const deletePackingItem = (index:number) => {
    const clone = [...items];
    const filter = clone.filter((_, indx:number) => indx !== index);
    setItems(filter);
  }

  const renderPackingListItem = () => {
    if (items.length > 0) {
      return (
        <>
          {items.map((item: IPackingItem, index: number) => {
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
                      <TouchableOpacity onPress={() => deletePackingItem(index)}>
                        <DeleteIcon width={30} height={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Shadow>
            );
          })}
          <Spacer height={12} />
          <Button
            text="Save"
            onPress={handleCreate}
            disabled={false}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={12} />
        </>
      );
    }
    return null;
  };

  const _getSerialNoRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload: IGetSerialNoRequest = {
        document: DOCUMENT_TYPE.PACKING_LIST,
        payload: {
          activeCount: initialValue,
          companyId: id as string,
          isAuto: true,
          isHeadOffice: true,
        }
      }
      dispatch2(getSerialNoRequest(payload));
    }).catch(err => console.log('err--', err));
  }

  useEffect(() => {
    dispatch2(resetGetSerialNoRequest());
    _getSerialNoRequest();
  }, []);

  useEffect(() => {
    if (serialNo) {
      dispatch({
        type: ACTION.PACKING_NO,
        payload: serialNo.toString(),
      });
    }
  }, [serialNo]);

  useEffect(() => {
    if(!createPackingMaterialRequesting && createPackingMaterialSuccess) {
      showToast("Packing Item List Created", ToastType.SUCCESS);
      dispatch2(resetCreatePackingMaterialsRequest());
      dispatch2(resetGetSerialNoRequest());
      onSuccess && onSuccess();
    } else if(!createPackingMaterialRequesting && createPackingMaterialFailure) {
      showToast("Packing Item List Not Created", ToastType.ERROR);
      dispatch2(resetCreatePackingMaterialsRequest())
    }
  }, [createPackingMaterialRequesting, createPackingMaterialSuccess, createPackingMaterialFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <Label text="Item / Particular Name" style={styles.labelHeading} />
        <Spacer height={4} />
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
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Item/Particulars Name" style={styles.label} />
            <Input
              onChangeText={setParticularName}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
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
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={20} />
        {renderPackingListItem()}
        <Spinner show={createPackingMaterialRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ListHeaderView;
