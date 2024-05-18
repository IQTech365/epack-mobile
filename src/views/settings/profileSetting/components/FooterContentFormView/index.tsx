/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
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
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import Input, { InputMethods } from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import footerContentOptions from '../../../../../data/footerContentOptions.json';
import Button from '../../../../../common/Button';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import { IAddFooterContentRequest } from '../../../../../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { addFooterContentRequest, getFooterContentsRequest, resetFooterContentRequest, resetUpdateFooterContentRequest, updateFooterContentRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import { ToastType, showToast } from '../../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { ISubmodule } from '../../../../../interface/common/common';
import { IGetFooterContentData } from '../../../../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import { IUpdateFooterContent, IUpdateFooterContentPayload } from '../../../../../interface/setting/packerProfile/footerContent/IUpdateFooterContent';

interface IContentUpdateProps {
  isEdit?:boolean;
  footerInfo?:IGetFooterContentData;
  onSuccess?: () => void;
}

//@ts-ignore
const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;

const FooterContentUpdateView: React.FC<IContentUpdateProps> = ({isEdit, footerInfo, onSuccess}) => {
  const [accountType, setAccountType] = useState<string>(footerContentOptions[0].label);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [modules, setModules] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const {submodules} = useAppSelector(state => state.Common);

  const {
    addFooterContentRequesting, 
    addFooterContentSuccess, 
    addFooterContentFailure,
    updateFooterContentRequesting,
    updateFooterContentSuccess,
    updateFooterContentFailure
  } = useAppSelector(state => state.Setting);
  const richText = React.useRef<RichEditor>(null);
  const scrollRef = React.useRef<ScrollView>(null);
  const contentTitleRef = React.useRef<InputMethods>(null);
  const contentTypeRef = useRef<IDropdownHandler>(null);

  const handleAccountType = (item: TDropdownItem) => {
    setAccountType(item.label);
  };

  const handleTitleTextInputChange = (text: string) => {
    setTitle(text);
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

  const handleSave = () => {
    getCurrentCompanyId().then(id => {
      const payload: IAddFooterContentRequest = {
        companyId: id as string,
        moduleId: modules,
        contentType: accountType,
        content: content,
        title: title

      }
      if(isEdit) {
        const payload:IUpdateFooterContent = {
          moduleId: modules,
          contentType: accountType,
          content: content,
          isAdmin: false,
          title: title
        }
        const data:IUpdateFooterContentPayload = {
          id: footerInfo?._id as string,
          payload: payload,
        }
        dispatch(updateFooterContentRequest(data));
      } else {
        dispatch(addFooterContentRequest(payload));
      }
    }).catch(err => console.log(err));
  }

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d:ISubmodule) => d.availableOnDocument);
  };

  const _getFooterContentsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getFooterContentsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if(isEdit && footerInfo) {
      const {contentType, moduleId,title} = footerInfo || {}
      setModules(moduleId);
      setAccountType(contentType);
      const contentTypeItem:TDropdownItem = footerContentOptions.find((e:TDropdownItem) => e.label == contentType) as TDropdownItem;
      if(contentTypeItem !== undefined) {
        contentTypeRef && contentTypeRef?.current?.setDefaultValue(contentTypeItem);
      }
      contentTitleRef && contentTitleRef.current?.setValue(title)
      setTitle(title)
    }
  }, [isEdit]);

  useEffect(() => {
    if (!addFooterContentRequesting && addFooterContentSuccess) {
      showToast('Footer Content Added', ToastType.SUCCESS);
      dispatch(resetFooterContentRequest());
      _getFooterContentsRequest();
      onSuccess && onSuccess();
    } else if (!addFooterContentRequesting && addFooterContentFailure) {
      showToast('Footer Content Not Added', ToastType.ERROR);
      dispatch(resetFooterContentRequest());
    }
  }, [addFooterContentRequesting, addFooterContentSuccess, addFooterContentFailure]);

  useEffect(() => {
    if (!updateFooterContentRequesting && updateFooterContentSuccess) {
      showToast('Footer Content Updated.', ToastType.SUCCESS);
      dispatch(resetUpdateFooterContentRequest());
      _getFooterContentsRequest();
      onSuccess && onSuccess();
    } else if (!updateFooterContentRequesting && updateFooterContentFailure) {
      showToast('Footer Content Not Updated', ToastType.ERROR);
      dispatch(resetUpdateFooterContentRequest());
    }
  }, [updateFooterContentRequesting, updateFooterContentSuccess, updateFooterContentFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.wrapper}>
        <View style={styles.textContainer2}>
          <Label text="Choose Content Type" style={styles.label} />
          <DropdownComponent
            data={footerContentOptions}
            onSelect={handleAccountType}
            ref={contentTypeRef}
          />
        </View>
        {accountType == 'Other' ? <View style={styles.textContainer2}>
          <Label text="Add Title" style={styles.label} />
          <Input
            onChangeText={handleTitleTextInputChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            value={title}
            selectionColor={COLOR_BLACK}
            ref={contentTitleRef}
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
            <ScrollView ref={scrollRef}>
              <RichEditor
                ref={richText}
                onChange={descriptionText => {
                  setContent(descriptionText);
                }}
                initialContentHTML={footerInfo?.content}
                useContainer={true}
                placeholder='Write your content here...'
                initialFocus={true}
                onCursorPosition={(scrollY) => {
                  scrollRef.current?.scrollTo({y: scrollY - 30, animated: true});
                }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </ScrollView>

        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {_getSubmodules().map((item:ISubmodule, index: number) => {
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
