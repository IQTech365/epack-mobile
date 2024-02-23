import React, {FC, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Header from '../../../common/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Spacer from '../../../common/Spacer';
import {formatPrice} from '../../../utils/formatter';
import EditIcon from '../../../images/icons/edit2.svg';
import DeleteIcon from '../../../images/icons/delete.svg';
import ModalHOC from '../../../common/ModalHOC';
import PackingItemFormView from './PackingItemFormView';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import { ToastType, showToast } from '../../../utils/utility';
import { OrderStackParamList } from '../../../navigation/params/OrderStackParamList';
import { IGetPackingListRequest, IPackingItem, IPackingListData, IUpdatePackingListRequest } from '../../../interface/order/IPackingMaterialResponse';
import { getPackingMaterialsRequest, resetUpdatePackingListRequest, updatePackingListRequest } from '../../../redux/slices/OrderSlice';
import { getCurrentCompanyId } from '../../../utils/storage';

type IProps = NativeStackScreenProps<OrderStackParamList, 'EditPackingItems'>;

const EditPackingItemsView: FC<IProps> = ({route, navigation}) => {
  const item: IPackingListData | undefined = route.params?.item;
  const orderId: string | undefined = route.params?.orderId;
  const items: IPackingItem[] = item?.packingItems as IPackingItem[];
  const [packingItems, setPackingItems] = useState<IPackingItem[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [surveyItem, setPackingItem] = useState<IPackingItem | null>(null);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const [shouldSave, setShouldSave] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    updatePackingListUpdateRequesting,
    updatePackingListSuccess,
    updatePackingListFailure,
  } = useAppSelector(state => state.Order);

  useEffect(() => {
    setPackingItems(items);
  }, []);

  const _handleDelete = (index: number) => {
    const copy = [...packingItems];
    copy.splice(index, 1);
    setPackingItems(copy);
    setShouldSave(true);
  };

  const _handleUpdate = (index: number, item: IPackingItem) => {
    setPackingItem(item);
    setItemIndex(index);
    setOpenModal(true);
  };

  const _handleModalClose = () => {
    setOpenModal(false);
  };

  const _onUpdate = (index: number, item: IPackingItem) => {
    const copy = [...packingItems];
    if(addNew) {
      copy.push(item);
    } else {
      copy.splice(index, 1, item);
    }
    setOpenModal(false);
    setPackingItems(copy);
    setShouldSave(true);
  };

  const _handleSaveChanges = () => {
    const payload:IUpdatePackingListRequest = {
      packingListId: item?._id as string,
      payload: {
        packingListNo: item?.packingListNo as string,
        packingDate: item?.packingDate as string,
        packingItems: packingItems
      }
    }
    dispatch(updatePackingListRequest(payload));
  };

  const _handleAddNewItem = () => {
    setAddNew(true);
    setOpenModal(true);
  }

  const _getPackingMaterialsRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload:IGetPackingListRequest = {
        enquiryId: orderId
    }
      dispatch(getPackingMaterialsRequest(payload));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if(shouldSave) {
      _handleSaveChanges();
    }
  }, [shouldSave]);

  useEffect(() => {
    if(!updatePackingListUpdateRequesting && updatePackingListSuccess) {
      showToast('Packing List Updated', ToastType.SUCCESS);
      dispatch(resetUpdatePackingListRequest());
      setShouldSave(false);
      setAddNew(false);
      _getPackingMaterialsRequest();
      navigation.goBack();
    } else if(!updatePackingListUpdateRequesting && updatePackingListFailure) {
      showToast('Survey List Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdatePackingListRequest());
      setShouldSave(false);
      setAddNew(false);
    }
  }, [updatePackingListUpdateRequesting, updatePackingListSuccess, updatePackingListFailure]);

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="PACKING ITEMS" />
      <Spacer height={5} />
      <View style={styles.saveActionContainer}>
        <TouchableOpacity
          style={styles.saveChangeButton}
          activeOpacity={0.4}
          onPress={_handleAddNewItem}>
          <Text style={styles.saveText}>Add New Item</Text>
        </TouchableOpacity>
      </View>
      <Spacer height={5} />
      <FlatList
        data={packingItems}
        extraData={packingItems}
        keyExtractor={item => `${item.itemName}`}
        renderItem={({item, index}) => {
          return (
            <View style={styles.surveyItemContainer}>
              <View style={styles.contentWraperContainer}>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>{`Item Name: `}</Text>
                  <Text style={styles.contentLabelText}>{item.itemName}</Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>{`Quantity: `}</Text>
                  <Text style={styles.contentLabelText}>{item.quantity}</Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>
                    {`Value Of Goods: `}
                  </Text>
                  <Text style={styles.contentLabelText}>
                    {formatPrice(item.valueOfGoods)}
                  </Text>
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.contentLabelText2}>{`Description: `}</Text>
                  <Text style={styles.contentLabelText}>{item.description}</Text>
                </View>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => _handleUpdate(index, item)}>
                  <EditIcon width={24} height={24} />
                </TouchableOpacity>
                <Spacer height={20} />
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => _handleDelete(index)}>
                  <DeleteIcon width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <ModalHOC
        visible={openModal}
        onClose={_handleModalClose}
        title="PACKING ITEM"
        modalStyle={styles.modalStyle}>
        <View style={styles.modalStyle}>
          <PackingItemFormView
            item={surveyItem as IPackingItem}
            packingListId={item?._id as string}
            packingListNo={item?.packingListNo as string}
            packingDate={item?.packingDate as string}
            index={itemIndex}
            onUpdate={_onUpdate}
            isNew={addNew}
          />
        </View>
      </ModalHOC>
    </View>
  );
};

export default EditPackingItemsView;
