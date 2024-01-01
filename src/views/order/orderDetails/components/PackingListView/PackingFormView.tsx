import React, {useReducer, useState} from 'react';
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
import {createPackingMaterialsRequest} from '../../../../../redux/slices/OrderSlice';
import {Shadow} from 'react-native-shadow-2';
import Spinner from '../../../../../common/Spinner';
import {IPackingType} from '../../../../../interface/common/common';
import DeleteIcon from '../../../../../images/icons/delete.svg';

interface Props {
  orderId: string;
}

const ListHeaderView: React.FC<Props> = ({orderId}) => {
  const [state, dispatch] = useReducer(packingReducer, initialState);
  const [particularName, setParticularName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [packingType, setPackingType] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [items, setItems] = useState<IPackingItem[]>([]);
  const {createPackingMaterialRequesting} = useAppSelector(
    state => state.Order,
  );
  const {packingTypes} = useAppSelector(state => state.Common);

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

  const authId = useAuthId();
  const dispatch2 = useAppDispatch();

  const handleCreate = () => {
    const payload: ICreatePackingMaterialRequest = {
      enquiryId: orderId,
      packingListNo: state.packing_no,
      packingDate: state.packing_date,
      packingItems: items,
      addedBy: authId,
    };
    dispatch2(createPackingMaterialsRequest(payload));
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
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="HR 55 hY 2259"
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
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of goods" style={styles.label} />
              <Input
                onChangeText={setValueOfGoods}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="2000"
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
