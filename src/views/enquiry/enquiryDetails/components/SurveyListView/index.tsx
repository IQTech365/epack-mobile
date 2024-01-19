import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {COLOR_BLACK} from '../../../../../utils/colors';
import styles from './style';

import {formatDate2, formatDate4} from '../../../../../utils/formatter';
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
import {getSerialNoRequest} from '../../../../../redux/slices/SerialNoSettingSlice';
import {ToastType, showToast} from '../../../../../utils/utility';

interface ISurveyListViewProps {
  enquiryId: string;
}

const SurveyListView: React.FC<ISurveyListViewProps> = ({enquiryId}) => {
  const {addSurveyItemRequesting, addSurveyItemSuccess, addSurveyItemFailure} =
    useAppSelector(state => state.Enquiry);
  const [surveyNo, setSurveyNo] = useState('');
  const [date, setDate] = useState<string>(formatDate4(new Date()));
  const [itemName, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [valueOfGoods, setValueOfGoods] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  const [surveyItems, setSurveyItems] = useState<ISurveyListItem[]>([]);
  const authId = useAuthId();
  const serialNo: number = useSerialNoHook();
  const initialValue: string = useInitialValueHook('658d3d2f585e3dde644da9b2');

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

  const dispatch = useAppDispatch();

  const handleSurveyListInputTextChange = (text: string) => {
    setSurveyNo(text);
  };

  const handleReceiptDate = (date: Date) => {
    setDate(formatDate2(date));
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
    const copy = [...surveyItems];
    const newItem: ISurveyListItem = {
      itemName: itemName,
      quantity: quantity,
      valueOfGoods: valueOfGoods,
      remarks: remarks,
    };
    copy.push(newItem);
    setSurveyItems(copy);
  };

  const handleSave = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: IAddSurveyItemRequest = {
          enquiryId: enquiryId,
          surveyListNo: surveyNo,
          surveyDate: date,
          surveyItems: surveyItems,
          addedBy: authId,
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
        dispatch(getSurveyItemListRequest(payload));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    _getSerialNoRequest();
  }, []);

  useEffect(() => {
    if (serialNo) {
      setSurveyNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if (!addSurveyItemRequesting && addSurveyItemSuccess) {
      showToast('Survey Item List Created.', ToastType.SUCCESS);
      dispatch(resetAddSurveyItemRequest());
      _getSurveyItemListRequest();
    } else if (!addSurveyItemRequesting && addSurveyItemFailure) {
      showToast('Survey Item List not Created.', ToastType.ERROR);
      dispatch(resetAddSurveyItemRequest());
    }
  }, [addSurveyItemRequesting, addSurveyItemSuccess, addSurveyItemFailure]);

  const showSurveyItemList = () => {
    if (surveyItems.length > 0) {
      return surveyItems.map((d: ISurveyListItem) => {
        return (
          <View style={styles.itemWrapper}>
            <View style={styles.elementContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Item Name:</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{d.itemName}</Text>
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Quantity:</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{d.quantity}</Text>
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Goods Value:</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{d.valueOfGoods}</Text>
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Remarks:</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{d.remarks}</Text>
              </View>
            </View>
          </View>
        );
      });
    }
    return null;
  };

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
                placeholder="Serial#"
                value={surveyNo}
                editable={false}
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
              placeholder='Enter particular/item name'
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
                placeholder='Enter quantity'
              />
            </View>
            <View style={styles.itemContainer}>
              <Label text="Value Of Goods" style={styles.label} />
              <Input
                onChangeText={handleGoodsInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter goods value"
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
              placeholder='Enter remarks'
            />
          </View>
        </View>
        <Spacer height={12} />
        <Button
          text="Add item/Particular"
          onPress={handleAddItem}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        {showSurveyItemList()}
        <Spacer height={12} />
        <Button
          text="Save"
          onPress={handleSave}
          disabled={surveyItems.length == 0}
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
