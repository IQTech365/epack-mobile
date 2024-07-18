import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import DatePickerComponent, {
  IDateMethods,
} from '../../../../../common/DatePickerComponent';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';
import {useAppSelector, useAppDispatch} from '../../../../../redux/hooks';
import Button from '../../../../../common/Button';
import {IBilty} from '../../../../../interface/order/IGetBiltyListResponse';
import {formatDate4} from '../../../../../utils/formatter';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {
  createNocDocRequest,
  getBiltyListRequest,
  getNocDocRequest,
  resetNocDocRequest,
} from '../../../../../redux/slices/OrderSlice';
import NocListItemView from '../NocListView';
import {IGetSurvyeItemListRequestPayload} from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import {showToast, ToastType} from '../../../../../utils/utility';
import Spinner from '../../../../../common/Spinner';
import {INocPayload} from '../../../../../interface/order/IGetNocListResponse';
import NocView from '../NocView';
import { ICreateNocFormRequest } from '../../../../../interface/order/ICreateNocFormRequest';

interface INocFormViewProps {
  navigation: NavigationProp<any, any>;
  orderId?: string;
  // onSuccess: () => void;
}
interface INocFormPayload {
  companyId: string;
  enquiryId: string;
}

const NocFormView: React.FC<INocFormViewProps> = ({navigation, orderId}) => {
  const [nocTypes, setNocTypes] = useState<string>('');
  const [lrNumber, setLrNumber] = useState<string>('');
  const [lrDate, setLrDate] = useState<Date | null>(null);
  const [selectedLrNumber, setSelectedLRNumber] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString());
  const [isLRDateDisabled, setIsLRDateDisabled] = useState<boolean>(false);
  const [selectedNocType,setSelectedNocType] = useState<string>("")

  const {
    biltyList,
    getNocDocRequesting,
    getNocDocFailure,
    getNocDocSuccess,
    createNocDocRequesting,
    createNocDocSuccess,
    createNocDocFailure,
  } = useAppSelector(state => state.Order);
  const dispatch = useAppDispatch();
  const DateInputRef = useRef<IDateMethods>(null);
  const dateofLr = useRef<IDateMethods>(null);
  const nocType = useRef<IDropdownHandler>(null);

  console.log("selectedNocType",selectedNocType)

  const transformBiltyData = () => {
    let _data: string[] = [];
    const {data} = biltyList || {};
    if (data && Array.isArray(data) && data.length > 0) {
      _data = data
        .filter((e: IBilty) => e.enquiryId === orderId)
        .map((bilty: IBilty) => bilty?.biltyNumber);
    }
    return _data;
  };

  const handleLrNumberSelect = (selectedLrNumber: string) => {
    setSelectedLRNumber(selectedLrNumber);
    const {data} = biltyList || {};
    if (data && Array.isArray(data) && data.length > 0) {
      const selectedBilty = data.find(
        (bilty: IBilty) => bilty.biltyNumber === selectedLrNumber,
      );
      if (selectedBilty) {
        console.log("selectedBilty",selectedBilty)
        setSelectedNocType(selectedBilty.materialsType)
        setLrNumber(selectedBilty.biltyNumber);
        setLrDate(new Date(selectedBilty.biltyDate));
        dateofLr.current?.setDefaultValue(new Date(selectedBilty.biltyDate));
        setIsLRDateDisabled(true);
      }
    }
  };

  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: INocFormPayload = {
          companyId: id as string,
          enquiryId: orderId as string,
          // id: id as string,
        };
        dispatch(getNocDocRequest(payload));
      })
      .catch(err => console.log(err));
  };

  const handleNocDate = (date: Date) => {
    setDate(date.toISOString());
  };

  const handleLRDate = (date: Date) => {
    setDate(date.toISOString());
  };

  const handleNocFormView = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: ICreateNocFormRequest = {
          enquiryId: orderId || '',
          companyId: id as string,
          nocType: packingType,
          nocDate: date,
          biltyDate: lrDate ? lrDate.toISOString() : date,
          biltyNo: selectedLrNumber,
          addedBy: id as string,
        };
        dispatch(createNocDocRequest(payload));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (selectedLrNumber && biltyList) {
      handleLrNumberSelect(selectedLrNumber);
      console.log("selectedLrNumber",selectedLrNumber)
    }
  }, [selectedLrNumber, biltyList]);

  useEffect(() => {
    if (!createNocDocRequesting && createNocDocSuccess) {
      showToast('Noc Doc Created.', ToastType.SUCCESS);
      dispatch(resetNocDocRequest());
      _getSurveyItemListRequest();
    } else if (!createNocDocRequesting && createNocDocFailure) {
      showToast('Noc Doc not Created.', ToastType.ERROR);
      dispatch(resetNocDocRequest());
    }
  }, [createNocDocRequesting, createNocDocSuccess, createNocDocFailure]);

  useEffect(() => {
    setDate(new Date().toISOString());
    transformBiltyData();
    dispatch(getBiltyListRequest(orderId as string));
    DateInputRef.current?.setDefaultValue(new Date());
  }, []);


  useEffect(()=>{
    if(selectedNocType){
      console.log("selectedNocType",selectedNocType)
      nocType.current?.setDefaultValue(selectedNocType)
      setNocTypes(selectedNocType)
    }
  },[])

  useEffect(() => {
    if (lrNumber) {
      setIsLRDateDisabled(true);
      setNocTypes(selectedNocType)
    } else {
      setIsLRDateDisabled(false);
    }
  }, [lrNumber]);

  return (
    <AvoidSoftInputViewHOC>
      <>
        <View style={styles.container}>
          <Spacer height={4} />
          <CollapsibleView title={'NOC DETAILS'} collapsed={false}>
            <View>
              <Spacer height={4} />
              <View style={styles.elementContainer}>
                <View style={styles.itemContainer}>
                  <Label text="NOC Type" style={styles.label} />
                  <DropdownComponent
                    data={shiftingLuggages}
                    // defaultValue={packingType}
                    onSelect={(item: any) => {
                      setNocTypes(item.label);
                    }}
                    ref={nocType}
                  />
                </View>
                <View style={styles.itemContainer}>
                  <Label text="Date" style={styles.label} />
                  <DatePickerComponent
                    onDateSelect={handleNocDate}
                    defaultValue={new Date(date)}
                  />
                </View>
              </View>

              <Spacer height={4} />
              <View style={styles.elementContainer}>
                <View style={styles.itemContainer}>
                  <Label text="LR Number" style={styles.label} />
                  <DropdownWithTextInput
                    options={transformBiltyData()}
                    onSelect={handleLrNumberSelect}
                    containerStyle={styles.itemContainer}
                  />
                </View>
                <View style={styles.itemContainer}>
                  <Label text="LR Date" style={styles.label} />
                  <DatePickerComponent
                    onDateSelect={(date: Date) => handleLRDate(date)}
                    disabled={isLRDateDisabled}
                    ref={dateofLr}
                  />
                </View>
              </View>
            </View>
          </CollapsibleView>

          <Spacer height={12} />
          <Button
            text="Save"
            onPress={handleNocFormView}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={8} />
          <Spinner show={getNocDocRequesting} />
        </View>
        <NocView orderId={orderId as string} items={[]} />

        {/* <NocListItemView orderId={orderId} onShowPreview={_showSurveyListItemTemplate} /> */}
      </>
    </AvoidSoftInputViewHOC>
  );
};

export default NocFormView;
