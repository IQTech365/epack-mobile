/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
import accountType from '../../../../../data/accountType.json';
import applicableForOptions from '../../../../../data/applicableForOptions.json';
import documentTypeOptions from '../../../../../data/documentTypeOptions.json';
import isoTypeOptions from '../../../../../data/isoTypeOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { ISubmoduleData } from '../../../../../interface/setting/packerProfile/ISubmodule';

interface IDocumentUpdateProps {}

const DocumentUpdateView: React.FC<IDocumentUpdateProps> = ({}) => {
  const [documentType, setDocumentType] = useState<string>(documentTypeOptions[0].label);
  const [isoType, setISOType] = useState<string>(isoTypeOptions[0].label);
  const [isoNumber, setISONumber] = useState<string>('');
  const [modules, setModules] = useState<string[]>(['']);
  const dispatch = useAppDispatch();
  const {submodules, addDocumentRequesting, addDocumentSuccess, addDocumentFailure} = useAppSelector(state => state.Setting);
  const {data: submodulesData = []} = submodules || {};

  const handleDocumentType = (item: TDropdownItem) => {
    setDocumentType(item.label);
  };

  const handleISOType = (item: TDropdownItem) => {
    setISOType(item.label);
  };

  const handleValidTillDate = (date: Date) => {};

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

  const handleSave = () => {
    //
  }

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
                  onChangeText={() => {}}
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
                onChangeText={() => {}}
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
                onChangeText={() => {}}
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
                onChangeText={() => {}}
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
                  iconStyle={{
                    borderColor: 'red',
                    borderRadius: 0,
                    width: 18,
                    height: 18,
                  }}
                  innerIconStyle={{
                    borderWidth: 1,
                    borderRadius: 0,
                    width: 18,
                    height: 18,
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
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
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default DocumentUpdateView;
