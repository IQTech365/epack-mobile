/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import Input, { InputMethods } from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import Button from '../../../../../common/Button';
import documentTypeOptions from '../../../../../data/documentTypeOptions.json';
import isoTypeOptions from '../../../../../data/isoTypeOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import DatePickerComponent, { IDateMethods } from '../../../../../common/DatePickerComponent';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { IAddDocumentRequest, IUpdateDocumentRequest } from '../../../../../interface/setting/packerProfile/document/IAddDocumentRequest';
import { addDocumentRequest, getDocumentsRequest, resetAddDocumentRequest, resetUpdateDocumentRequest, updateDocumentRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import useAuthId from '../../../../../hooks/useAuthId';
import { ISubmodule } from '../../../../../interface/common/common';
import { ToastType, showToast } from '../../../../../utils/utility';
import { IGetDocumentData } from '../../../../../interface/setting/packerProfile/document/IGetDocumentsResponse';
import { IUpdateDocumentPayload } from '../../../../../interface/setting/packerProfile/document/IUpdateDocument';

interface IDocumentFormViewProps {
  onSuccess:() => void;
  isEdit?:boolean;
  documentInfo?:IGetDocumentData;
}

const DocumentFormView: React.FC<IDocumentFormViewProps> = ({onSuccess, isEdit, documentInfo}) => {
  const [documentType, setDocumentType] = useState<string>(documentTypeOptions[0].label);
  const [isoType, setISOType] = useState<string>(isoTypeOptions[0].label);
  const [isoNumber, setISONumber] = useState<string>('');
  const [ibaCode, setIBACode] = useState<string>('');
  const [ibaValidTillDate, setIBAValidTillDate] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const [modules, setModules] = useState<string[]>([]);
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    addDocumentRequesting,
    addDocumentSuccess,
    addDocumentFailure,
    updateDocumentRequesting,
    updateDocumentSuccess,
    updateDocumentFailure,
  } = useAppSelector(state => state.Setting);
  const {submodules} = useAppSelector(state => state.Common);

  const documentTypeRef = useRef<IDropdownHandler>(null);
  const docNumberInputRef = useRef(null);
  const isoTypeRef = useRef<IDropdownHandler>(null);
  const isoNumberInputRef = useRef<InputMethods>(null);
  const ibaCodeInputRef = useRef<InputMethods>(null);
  const ibaValidTillDateRef = useRef<IDateMethods>(null);
  const otherDocTitleInputRef = useRef<InputMethods>(null);

  const authId = useAuthId();
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

  const handleValidTillDate = (date: Date|null) => {
    if(date) {
      setIBAValidTillDate(date.toDateString());
    }
    setShowCalender(false);
  };

  const handleDocumentNumber = (text: string) => {
    setDocumentNumber(text);
  }

  const handleDocumentTitle = (text: string) => {
    setDocumentTitle(text);
  }

  const handleModulesApplyFor = (moduleName: string, isChecked: boolean) => {
    const tempArr = [...modules];
      const itemIndex = tempArr.findIndex(e => e == moduleName);
      if(itemIndex == -1) {
        tempArr.push(moduleName);
        setModules(tempArr);
      } else {
        const filterArr = tempArr.filter(e => e !== moduleName);
        setModules(filterArr);
      }
  }

  const getDocumentValue = () => {
    let _value:string = documentNumber;
    if(documentType == 'ISO Certificate') {
      _value = isoType == "Other" ?  isoNumber : isoType;
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
        createdBy: authId,
      }
      if(isEdit) {
        const payload:IUpdateDocumentRequest = {
          id: documentInfo?._id as string,
          moduleId: modules,
          documentType: documentType,
          documentTypeValue: getDocumentValue(),
          documentTypeTitle: getDocumentTitle(),
          ibaValidTillDate: ibaValidTillDate,
        }
        const data:IUpdateDocumentPayload = {
          id: id as string,
          payload: payload,
        }
        dispatch(updateDocumentRequest(data));
      } else {        
        dispatch(addDocumentRequest(payload));
      }
    }).catch(err => console.log(err));
    
  }

  const _getDocumentsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getDocumentsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d:ISubmodule) => d.availableOnDocument);
  };

  useEffect(() => {
    if(isEdit && documentInfo) {
      const {ibaValidTillDate, documentType, moduleId, documentTypeValue, documentTypeTitle, createdBy} = documentInfo || {};
      setModules(moduleId);
      setDocumentType(documentType);
      setDocumentNumber(documentTypeValue)
      //@ts-ignore
      docNumberInputRef && docNumberInputRef?.current?.setValue(documentTypeValue);

      const documentTypeItem:TDropdownItem = documentTypeOptions.find((d:TDropdownItem) => d.label == documentType) as TDropdownItem;
      if(documentTypeItem !== undefined){
        documentTypeRef && documentTypeRef?.current?.setDefaultValue(documentTypeItem);
      }
      if(documentType == 'ISO Certificate') {
        setISOType(documentTypeValue);
        const isoTypeItem:TDropdownItem = isoTypeOptions.find((d:TDropdownItem) => d.label == documentTypeValue) as TDropdownItem;
        if(isoTypeItem !== undefined){
          isoTypeRef && isoTypeRef?.current?.setDefaultValue(isoTypeItem);
        }
      }
      if(documentType == 'ISO Certificate' && documentTypeTitle == "Other") {
        setISOType(documentTypeTitle);
        const isoTypeItem:TDropdownItem = isoTypeOptions.find((d:TDropdownItem) => d.label == documentTypeTitle) as TDropdownItem;
        if(isoTypeItem !== undefined){
          isoTypeRef && isoTypeRef?.current?.setDefaultValue(isoTypeItem);
        }
        isoNumberInputRef && isoNumberInputRef?.current?.setValue(documentTypeValue);
      }
      if(documentType == 'IBA Approval') {
        setIBACode(documentTypeValue);
        ibaCodeInputRef && ibaCodeInputRef?.current?.setValue(documentTypeValue);
        if(ibaValidTillDate) {
          ibaValidTillDateRef && ibaValidTillDateRef?.current?.setDefaultValue(new Date(ibaValidTillDate));
        }
      }

      if(documentType === 'Other') {        
        if(otherDocTitleInputRef){
           otherDocTitleInputRef?.current?.setValue(documentTypeTitle);
        }
        setDocumentTitle(documentTypeTitle);

      }
    }
  }, [isEdit]);

  useEffect(() => {
    if (!addDocumentRequesting && addDocumentSuccess) {
      showToast('Document Added.', ToastType.SUCCESS);
      dispatch(resetAddDocumentRequest());
      _getDocumentsRequest();
      onSuccess && onSuccess();
    } else if (!addDocumentRequesting && addDocumentFailure) {
      showToast('Document Not Added. Try again!', ToastType.ERROR);
      dispatch(resetAddDocumentRequest());
    }
  }, [addDocumentRequesting, addDocumentSuccess, addDocumentFailure]);

  useEffect(() => {
    if (!updateDocumentRequesting && updateDocumentSuccess) {
      showToast('Document Updated.', ToastType.SUCCESS);
      dispatch(resetUpdateDocumentRequest());
      _getDocumentsRequest();
      onSuccess && onSuccess();
    } else if (!updateDocumentRequesting && updateDocumentFailure) {
      showToast('Document Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdateDocumentRequest());
    }
  }, [updateDocumentRequesting, updateDocumentSuccess, updateDocumentFailure]);

  const showISOTypeSelectionView = () => {
    if (documentType == 'ISO Certificate') {
      return (
        <>
          <View style={styles.textContainer2}>
            <Label text="Choose ISO Type" style={styles.label} />
            <DropdownComponent 
              data={isoTypeOptions} 
              onSelect={handleISOType}
              ref={isoTypeRef}
            />
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
                  placeholder='Enter document ID'
                  autoCapitalize="characters"
                  ref={isoNumberInputRef}
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
                placeholder='Enter document ID'
                autoCapitalize="characters"
                ref={ibaCodeInputRef}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Valid Till" style={styles.label} />
              <DatePickerComponent 
                onDateSelect={handleValidTillDate}
                ref={ibaValidTillDateRef}
              />
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
            ref={documentTypeRef}
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
                value={documentTitle}
                placeholder='Enter Document Title'
                ref={otherDocTitleInputRef}
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
                placeholder='Enter Document Number'
                autoCapitalize="characters"
                ref={docNumberInputRef}
              />
            </View>
          </>
        ) : null}
        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {_getSubmodules()?.map((item:ISubmodule, index: number) => {
            return (
              <View style={styles.checkboxItem} key={`${index}`}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.subModuleName}
                  iconStyle={styles.iconStyle}
                  innerIconStyle={styles.innerIconStyle}
                  textStyle={styles.textStyle2}
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0}}
                  onPress={(isChecked: boolean) => {
                    handleModulesApplyFor(item._id, isChecked);
                  }}
                  isChecked={modules.includes(item._id)}
                  disableBuiltInState={true}
                />
              </View>
            );
          })}
        </View>
        <Spacer height={12} />
        <Button
          text={isEdit ? "UPDATE" : "SAVE"}
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

export default DocumentFormView;
