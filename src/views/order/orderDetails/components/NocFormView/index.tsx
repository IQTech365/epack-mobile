import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import styles from './style';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import DatePickerComponent, { IDateMethods } from '../../../../../common/DatePickerComponent';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';
import { useAppSelector, useAppDispatch } from '../../../../../redux/hooks';
import Button from '../../../../../common/Button'; 
import { IBilty } from '../../../../../interface/order/IGetBiltyListResponse';
import { formatDate4 } from '../../../../../utils/formatter';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { ICreateNocRequest } from '../../../../../interface/order/IPackingMaterialResponse';
import { createNocDocRequest, getBiltyListRequest, getNocDocRequest, resetNocDocRequest } from '../../../../../redux/slices/OrderSlice';
import NocListItemView from '../NocListView';
import { IGetSurvyeItemListRequestPayload } from '../../../../../interface/enquiry/IGetSurveyItemListResponse';
import { showToast, ToastType } from '../../../../../utils/utility';
import Spinner from '../../../../../common/Spinner';
import { INocPayload } from '../../../../../interface/order/IGetNocListResponse';

interface INocFormViewProps {
  navigation: NavigationProp<any, any>;
  orderId?: string;
  // onSuccess: () => void;
}
interface INocFormPayload {
  companyId: string;
  enquiryId: string;
  }

const NocFormView: React.FC<INocFormViewProps> = ({ navigation, orderId }) => {
  const [packingType, setPackingType] = useState<string>('');
  const [lrNumber, setLrNumber] = useState<string>('');
  const [lrDate, setLrDate] = useState<Date | null>(null);
  const [selectedLrNumber, setSelectedLRNumber] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString());
  const { biltyList,getNocDocRequesting,getNocDocFailure,getNocDocSuccess,createNocDocRequesting,createNocDocSuccess,createNocDocFailure } = useAppSelector(state => state.Order);
  const dispatch = useAppDispatch();
  const DateInputRef = useRef<IDateMethods>(null)
  const dateofLr = useRef<IDateMethods>(null);

  const transformBiltyData = () => {
    let _data: string[] = [];
    const { data } = biltyList || {};
    if (data && Array.isArray(data) && data.length > 0) {
      _data = data
        .filter((e: IBilty) => e.enquiryId === orderId)
        .map((bilty: IBilty) => bilty?.biltyNumber);
    }
    return _data;
  };

  const handleLrNumberSelect = (selectedLrNumber: string) => {
    setSelectedLRNumber(selectedLrNumber);
    const { data } = biltyList || {};
    if (data && Array.isArray(data) && data.length > 0) {
      const selectedBilty = data.find(
        (bilty: IBilty) => bilty.biltyNumber === selectedLrNumber
      );
      if (selectedBilty) {
        setLrNumber(selectedBilty.biltyNumber);
        setLrDate(new Date(selectedBilty.biltyDate));
        dateofLr.current?.setDefaultValue(new Date(selectedBilty.biltyDate));
      }
    }
  };

  const _getSurveyItemListRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        const payload: INocFormPayload = {
          companyId: id as string,
          enquiryId: orderId
          // id: id as string,
        };
        console.log("payload1212",payload)
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
      .then((id) => {
        const payload: ICreateNocRequest = {
          enquiryId: orderId || '',   
          companyId: id as string, 
          nocType: packingType,
          nocDate: date,
          biltyDate: lrDate ? lrDate.toISOString() : date,
          biltyNo: selectedLrNumber,
          addedBy: id as string
        };
        console.log("payload",payload)
        dispatch(createNocDocRequest(payload));
      })
      .catch((err) => console.log(err));
  };


  

  useEffect(() => {
    if (selectedLrNumber && biltyList) {
      handleLrNumberSelect(selectedLrNumber);
    }
  }, [selectedLrNumber, biltyList]);


  useEffect(() => {
    if (!createNocDocRequesting && createNocDocSuccess) {
      showToast('Noc Doc Created.', ToastType.SUCCESS);
      dispatch(resetNocDocRequest());
      _getSurveyItemListRequest()
      
    } else if (!createNocDocRequesting && createNocDocFailure) {
      showToast('Noc Doc not Created.', ToastType.ERROR);
      dispatch(resetNocDocRequest());
    }
  }, [createNocDocRequesting, createNocDocSuccess, createNocDocFailure]);

  useEffect(()=>{
    setDate(new Date().toISOString());
    transformBiltyData()
    dispatch(getBiltyListRequest(orderId))
    DateInputRef.current?.setDefaultValue(new Date())
    setPackingType("Household")
  },[])

  return (
   <>
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title={"NOC DETAILS"} collapsed={false}>
          <View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="NOC Type" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={(item: any) => {
                    setPackingType(item.label);
                  }}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleNocDate}
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
                  disabled={!!selectedLrNumber}
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
      <NocListItemView orderId={orderId}/>
    </AvoidSoftInputViewHOC>
   </>
  );
};

export default NocFormView;
