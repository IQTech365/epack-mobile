import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import { COLOR_BLACK } from '../../../../../utils/colors';
import styles from './style';

import {formatDate2} from '../../../../../utils/formatter';
import Button from '../../../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import Spinner from '../../../../../common/Spinner';
import Toast from 'react-native-toast-message';
import { IAddSurveyItemRequest } from '../../../../../interface/enquiry/IAddSurveyItemRequest';
import { addSurveyItemRequest, getSurveyItemListRequest, resetAddSurveyItemRequest } from '../../../../../redux/slices/EnquirySlice';
import useAuthId from '../../../../../hooks/useAuthId';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { IGetSurvyeItemListRequestPayload } from '../../../../../interface/enquiry/IGetSurveyItemListResponse';

interface ISurveyListViewProps {
  enquiryId:string
}

const SurveyListView: React.FC<ISurveyListViewProps> = ({ enquiryId}) => {

  const {
    addSurveyItemRequesting,
    addSurveyItemSuccess,
    addSurveyItemFailure,
    addSurveyItemInfo,
  } = useAppSelector(state => state.Enquiry);
  const [surveyList, setServeyList] = useState('');
  const [date, setDate] = useState<string>('');
  const [itemName, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [goods, setGoods] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const authId = useAuthId();

  const dispatch = useAppDispatch();

  const handleSurveyListInputTextChange = (text: string) => {
    setServeyList(text);
  };

  const handleReceiptDate = (date: Date) => {
    setDate(formatDate2(date))
  };

  const handleParticularNameInputTextChange = (text: string) => {
    setItem(text);
  };

  const handleQuantityInputTextChange = (text: string) => {
    setQuantity(text);
  };

  const handleGoodsInputTextChange = (text: string) => {
    setGoods(text);
  };

  const handleDescriptionInputTextChange = (text: string) => {
    setRemarks(text);
  };


  const handleCreate = () => {
    getCurrentCompanyId().then(id => {
      const payload:IAddSurveyItemRequest = {
        companyId: id as string,
        enquiryId: enquiryId,
        surveyListNo: surveyList,
        surveyDate:date,
        itemName: itemName,
        quantity:quantity,
        valueOfGoods: goods,
        remarks: remarks,
        addedBy:authId,
    }
      dispatch(addSurveyItemRequest(payload))
    }).catch(err => console.log(err));
  };

  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId().then(id => {
      const payload :IGetSurvyeItemListRequestPayload= {
        enquiryId:enquiryId,
        id: id as string,
      }
      dispatch(getSurveyItemListRequest(payload));
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    if (!addSurveyItemRequesting && addSurveyItemSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Survey Item List',
        text2: 'Survey Item List has been added successfully',
      });
      dispatch(resetAddSurveyItemRequest());
      _getSurveyItemListRequest();
    } else if (!addSurveyItemRequesting && addSurveyItemFailure) {
      Toast.show({
        type: 'error',
        text1: 'Survey Item List',
        text2: 'Error in adding Survey Item List. Please try again!',
      });
      dispatch(resetAddSurveyItemRequest());
    }
  }, [addSurveyItemRequesting, addSurveyItemSuccess, addSurveyItemFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <View>
          <View style={styles.elementContainer}>
            <View style={styles.itemContainer}>
              <Label text="Survey List No." style={styles.label} />
              <Input
                onChangeText={handleSurveyListInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder='HR 55 hY 2259'
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Date" style={styles.label} />
              <DatePickerComponent onDateSelect={handleReceiptDate} />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer2}>
            <Label text="Item/Particulars Name" style={styles.label} />
            <Input
              onChangeText={handleParticularNameInputTextChange}
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
                onChangeText={handleQuantityInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of goods" style={styles.label} />
              <Input
                onChangeText={handleGoodsInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder='2000'
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
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>

        <Spacer height={12} />
        <Button
          text="Add item/Particular"
          onPress={handleCreate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        <Spinner show={addSurveyItemRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};
export default SurveyListView;