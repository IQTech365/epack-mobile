/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import footerContentOptions from '../../../../../data/footerContentOptions.json';
import applicableForOptions from '../../../../../data/applicableForOptions.json';
import Button from '../../../../../common/Button';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import { IAddFooterContentRequest } from '../../../../../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { addFooterContentRequest, resetFooterContentRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import Toast from 'react-native-toast-message';
import Spinner from '../../../../../common/Spinner';
import { ISubmoduleData } from '../../../../../interface/setting/packerProfile/ISubmodule';
import useCompanyId from '../../../../../hooks/useCompanyId';
import { ToastType, showToast } from '../../../../../utils/utility';

interface IContentUpdateProps {}

//@ts-ignore
const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const FooterContentUpdateView: React.FC<IContentUpdateProps> = ({}) => {
  const [accountType, setAccountType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [modules, setModules] = useState<string[]>(['']);
  const dispatch = useAppDispatch();
  const companyId = useCompanyId();

  const {addFooterContentRequesting, addFooterContentSuccess, addFooterContentFailure, submodules} = useAppSelector(state => state.Setting);
  const richText = React.useRef();
  const {data: submodulesData = []} = submodules || {};

  const handleAccountType = (item: TDropdownItem) => {
    setAccountType(item.label);
  };

  const handleTitleTextInputChange = (text: string) => {
    setTitle(text);
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

  const handleSave = () => {
    const payload: IAddFooterContentRequest = {
      companyId: companyId,
      modulesView: modules,
      accountType: accountType,
      title: title,
      content: content,
    }
    console.log('FooterContent-payload--', JSON.stringify(payload));
    dispatch(addFooterContentRequest(payload));
  }

  useEffect(() => {
    if (!addFooterContentRequesting && addFooterContentSuccess) {
      showToast('Footer Content Added', ToastType.SUCCESS);
      dispatch(resetFooterContentRequest());
      // dispatch(getEnquiriesRequest(companyId));
      // navigation.goBack();
    } else if (!addFooterContentRequesting && addFooterContentFailure) {
      showToast('Footer Content Not Added', ToastType.ERROR);
      dispatch(resetFooterContentRequest());
    }
  }, [addFooterContentRequesting, addFooterContentSuccess, addFooterContentFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.wrapper}>
        <View style={styles.textContainer2}>
          <Label text="Choose Content Type" style={styles.label} />
          <DropdownComponent
            data={footerContentOptions}
            onSelect={handleAccountType}
          />
        </View>
        {accountType == 'Other' ? <View style={styles.textContainer2}>
          <Label text="Add Title" style={styles.label} />
          <Input
            onChangeText={handleTitleTextInputChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View> : null}
        <Spacer height={12} />
        <View style={styles.toolbarContentContainer}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.setParagraph
            ]}
            iconMap={{[actions.heading1]: handleHead}}
          />
        </View>

        <ScrollView contentContainerStyle={styles.editorContentContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <Text>Write here:</Text>
            <RichEditor
            //@ts-ignore
              ref={richText}
              onChange={descriptionText => {
                console.log('descriptionText:', descriptionText);
                setContent(descriptionText);
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>

        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {submodulesData.map((item:ISubmoduleData, index: number) => {
            return (
              <View style={styles.checkboxItem} key={`${index}`}>
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
        <Spinner show={addFooterContentRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default FooterContentUpdateView;
