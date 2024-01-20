import React, {FC, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Header from '../../../common/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EnquiryStackParamList} from '../../../navigation/params/EnquiryStackParamList';
import {IGetSurveyItemListData, IGetSurvyeItemListRequestPayload} from '../../../interface/enquiry/IGetSurveyItemListResponse';
import Spacer from '../../../common/Spacer';
import {ISurveyListItem} from '../../../interface/enquiry/IAddSurveyItemRequest';
import {formatPrice} from '../../../utils/formatter';
import EditIcon from '../../../images/icons/edit2.svg';
import DeleteIcon from '../../../images/icons/delete.svg';
import ModalHOC from '../../../common/ModalHOC';
import UpdateSurveyItemView from './UpdateSurveyItemView';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import { IUpdateSurveyItemRequest } from '../../../interface/enquiry/enquiry';
import { getSurveyItemListRequest, resetUpdateSurveryItemListRequest, updateSurveryItemListRequest } from '../../../redux/slices/EnquirySlice';
import { ToastType, showToast } from '../../../utils/utility';

type IProps = NativeStackScreenProps<EnquiryStackParamList, 'EditSurveyItems'>;

const EditSurveyItemsView: FC<IProps> = ({route, navigation}) => {
  const item: IGetSurveyItemListData | undefined = route.params?.item;
  const enquiryId: string | undefined = route.params?.enquiryId;
  const items: ISurveyListItem[] = item?.surveyItems as ISurveyListItem[];
  const [surveyItems, setSurveyItems] = useState<ISurveyListItem[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [surveyItem, setSurveyItem] = useState<ISurveyListItem | null>(null);
  const [itemIndex, setItemIndex] = useState<number>(-1);

  const dispatch = useAppDispatch();
  const {
    updateSurveyItemRequesting,
    updateSurveyItemSuccess,
    updateSurveyItemFailure,
  } = useAppSelector(state => state.Enquiry);

  useEffect(() => {
    setSurveyItems(items);
  }, []);

  const _handleDelete = (index: number) => {
    const copy = [...surveyItems];
    copy.splice(index, 1);
    setSurveyItems(copy);
  };

  const _handleUpdate = (index: number, item: ISurveyListItem) => {
    setSurveyItem(item);
    setItemIndex(index);
    setOpenModal(true);
  };

  const _handleModalClose = () => {
    setOpenModal(false);
  };

  const _onUpdate = (index: number, item: ISurveyListItem) => {
    const copy = [...surveyItems];
    copy.splice(index, 1, item);
    setOpenModal(false);
    setSurveyItems(copy);
  };

  const _handleSaveChanges = () => {
    const payload:IUpdateSurveyItemRequest = {
      surveyId: item?._id as string,
      payload: {
        surveyListNo: item?.surveyListNo as string,
        surveyDate: item?.surveyDate as string,
        surveyItems: surveyItems
      }
    }
    dispatch(updateSurveryItemListRequest(payload));
  };

  const _getSurveyItemListRequest = () => {
    const payload: IGetSurvyeItemListRequestPayload = {
      enquiryId: enquiryId as string,
    };
    dispatch(getSurveyItemListRequest(payload));
  };

  useEffect(() => {
    if(!updateSurveyItemRequesting && updateSurveyItemSuccess) {
      showToast('Survey Item List Updated', ToastType.SUCCESS);
      dispatch(resetUpdateSurveryItemListRequest());
      _getSurveyItemListRequest();
      navigation.goBack();
    } else if(!updateSurveyItemRequesting && updateSurveyItemFailure) {
      showToast('Survey Item List Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdateSurveryItemListRequest());
    }
  }, [updateSurveyItemRequesting, updateSurveyItemSuccess, updateSurveyItemFailure]);

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="SURVEY ITEMS" />
      <Spacer height={5} />
      <View style={styles.saveActionContainer}>
        <TouchableOpacity
          style={styles.saveChangeButton}
          activeOpacity={0.4}
          onPress={_handleSaveChanges}>
          <Text style={styles.saveText}>Save Change</Text>
        </TouchableOpacity>
      </View>
      <Spacer height={5} />
      <FlatList
        data={surveyItems}
        extraData={surveyItems}
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
                  <Text style={styles.contentLabelText2}>{`Remarks: `}</Text>
                  <Text style={styles.contentLabelText}>{item.remarks}</Text>
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
        title="SURVEY ITEM"
        modalStyle={styles.modalStyle}>
        <View style={styles.modalStyle}>
          <UpdateSurveyItemView
            item={surveyItem as ISurveyListItem}
            surveyId={item?._id as string}
            surveyNo={item?.surveyListNo as string}
            surveyDate={item?.surveyDate as string}
            index={itemIndex}
            onUpdate={_onUpdate}
          />
        </View>
      </ModalHOC>
    </View>
  );
};

export default EditSurveyItemsView;
