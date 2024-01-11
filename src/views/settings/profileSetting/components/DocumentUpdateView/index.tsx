/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import Button from '../../../../../common/Button';
import documentTypeOptions from '../../../../../data/documentTypeOptions.json';
import isoTypeOptions from '../../../../../data/isoTypeOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { ISubmoduleData } from '../../../../../interface/setting/packerProfile/ISubmodule';
import { formatDate } from '../../../../../utils/formatter';
import { IAddDocumentRequest } from '../../../../../interface/setting/packerProfile/document/IAddDocumentRequest';
import { addDocumentRequest, resetAddDocumentRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import Toast from 'react-native-toast-message';
import Spinner from '../../../../../common/Spinner';
import { getCurrentCompanyId } from '../../../../../utils/storage';

interface IDocumentUpdateProps {}

const DocumentUpdateView: React.FC<IDocumentUpdateProps> = ({}) => {
  const [documentType, setDocumentType] = useState<string>(documentTypeOptions[0].label);
  const [isoType, setISOType] = useState<string>(isoTypeOptions[0].label);
  const [isoNumber, setISONumber] = useState<string>('');
  const [ibaCode, setIBACode] = useState<string>('');
  const [ibaValidTillDate, setIBAValidTillDate] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [modules, setModules] = useState<string[]>(['']);
  const dispatch = useAppDispatch();

  const {otpData} = useAppSelector(state => state.OTP);
  const {submodules, addDocumentRequesting, addDocumentSuccess, addDocumentFailure} = useAppSelector(state => state.Setting);
  const {data: submodulesData = []} = submodules || {};

  const handleDocumentType = (item: TDropdownItem) => {
    setDocumentType(item.label);
  };

  const handleISOType = (item: TDropdownItem) => {
    setISOType(item.label);
  };

  const handleISONumber = (text: string) => {
    setISONumber(text);
  }

  const handleIBACode = (text: string) => {
    setIBACode(text);
  }

  const handleValidTillDate = (date: Date) => {
    setIBAValidTillDate(formatDate(date));
  };

  const handleDocumentNumber = (text: string) => {
    setDocumentNumber(text);
  }

  const handleDocumentTitle = (text: string) => {
    setDocumentTitle(text);
  }

  const handleModulesApplyFor = (moduleName: string, isChecked: boolean) => {
    const tempArr = [...modules];
    if(isChecked) {
      const itemIndex = tempArr.findIndex(e => e == moduleName);
      if(itemIndex == -1) {
        tempArr.push(moduleName);
        setModules(tempArr);
      }
    } else {
      const filterArr = tempArr.filter(e => e !== moduleName);
      setModules(filterArr);
    }
  }

  const getDocumentValue = () => {
    let _value:string = documentNumber;
    if(documentType == 'ISO Certificate') {
      _value = isoNumber;
    } else if(documentType == 'IBA Approval') {
      _value = ibaCode;
    }
    return _value;
  }

  const getDocumentTitle = () => {
    let _value:string = documentTitle;
    if(documentType == 'ISO Certificate') {
      _value = isoType;
    }
    return _value;
  }

  const handleSave = () => {
    getCurrentCompanyId().then(id => {
      const payload:IAddDocumentRequest = {
        companyId: id as string,
        moduleId: modules,
        documentType: documentType,
        documentTypeValue: getDocumentValue(),
        documentTypeTitle: getDocumentTitle(),
        ibaValidTillDate: ibaValidTillDate,
        createdBy: otpData?.data.id as string,
      }
      dispatch(addDocumentRequest(payload));
    }).catch(err => console.log(err));
    
  }

  useEffect(() => {
    if (!addDocumentRequesting && addDocumentSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Company Document',
        text2: 'Document Number has been added successfully',
      });
      dispatch(resetAddDocumentRequest());
      // dispatch(getContactsRequest(companyId));
    } else if (!addDocumentRequesting && addDocumentFailure) {
      Toast.show({
        type: 'error',
        text1: 'Company Document',
        text2: 'Error in adding Document Number. Please try again!',
      });
      dispatch(resetAddDocumentRequest());
    }
  }, [addDocumentRequesting, addDocumentSuccess, addDocumentFailure]);

  const showISOTypeSelectionView = () => {
    if (documentType == 'ISO Certificate') {
      return (
        <>
          <View style={styles.textContainer2}>
            <Label text="Choose ISO Type" style={styles.label} />
            <DropdownComponent data={isoTypeOptions} onSelect={handleISOType} />
          </View>
          {isoType == 'Other' ? (
            <>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Enter ISO Number" style={styles.label} />
                <Input
                  onChangeText={handleISONumber}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </>
          ) : null}
        </>
      );
    }
    return null;
  };

  const showIBAApprovalView = () => {
    if (documentType == 'IBA Approval') {
      return (
        <>
          <View style={styles.mainWrapper}>
            <View style={styles.textContainer}>
              <Label text="Enter Code" style={styles.label} />
              <Input
                onChangeText={handleIBACode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Valid Till" style={styles.label} />
              <DatePickerComponent onDateSelect={handleValidTillDate} />
            </View>
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.wrapper}>
        <View style={styles.textContainer2}>
          <Label text="Choose Document Type" style={styles.label} />
          <DropdownComponent
            data={documentTypeOptions}
            onSelect={handleDocumentType}
          />
        </View>
        {showISOTypeSelectionView()}
        {showIBAApprovalView()}
        {documentType == 'Other' ? (
          <>
            <View style={styles.textContainer2}>
              <Label text="Enter Document Title" style={styles.label} />
              <Input
                onChangeText={handleDocumentTitle}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </>
        ) : null}
        {(documentType != 'ISO Certificate' && documentType != 'IBA Approval') ? (
          <>
            <View style={styles.textContainer2}>
              <Label text="Enter Number" style={styles.label} />
              <Input
                onChangeText={handleDocumentNumber}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </>
        ) : null}
        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {submodulesData.map((item:ISubmoduleData, index: number) => {
            return (
              <View style={styles.checkboxItem}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.submoduleName}
                  iconStyle={styles.iconStyle}
                  innerIconStyle={styles.innerIconStyle}
                  textStyle={styles.textStyle2}
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0}}
                  onPress={(isChecked: boolean) => {
                    handleModulesApplyFor(item.submoduleId, isChecked);
                  }}
                  isChecked={false}
                />
              </View>
            );
          })}
        </View>
        <Spacer height={12} />
        <Button
          text="SAVE"
          onPress={handleSave}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={addDocumentRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DocumentUpdateView;
