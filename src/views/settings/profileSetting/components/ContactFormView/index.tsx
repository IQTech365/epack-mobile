/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY,
  COLOR_GRAY2,
} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import contactDetail from '../../../../../data/contactDetail.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Button from '../../../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  addContactRequest,
  getContactsRequest,
  resetAddContactRequest,
  resetUpdateContactRequest,
  updateContactRequest,
} from '../../../../../redux/slices/ProfileSettingSlice';
import {IAddContactDetailRequest} from '../../../../../interface/setting/packerProfile/contactDetail/IAddContactDetailRequest';
import Spinner from '../../../../../common/Spinner';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {ISubmodule} from '../../../../../interface/common/common';
import useAuthId from '../../../../../hooks/useAuthId';
import {IContactListItem} from '../ContactView/components/ContactDetailListItem';
import {ToastType, showToast} from '../../../../../utils/utility';
import {IUpdateContactDetailPayload} from '../../../../../interface/setting/packerProfile/contactDetail/IUpdateContactDetail';

interface IContactDetailsProps {
  isEdit?: boolean;
  contactInfo?: IContactListItem;
  onSuccess?: () => void;
}

const ContactDetailUpdateView: React.FC<IContactDetailsProps> = ({
  isEdit,
  contactInfo,
  onSuccess,
}) => {
  const [contactType, setContactType] = useState<string>('EMAIL');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactNumberError, setContactNumberError] = useState<string>('');
  const [modules, setModules] = useState<string[]>([]);
  const [labelText, setLabelText] = useState<string>('EMAIL');
  const [helperText, setHelperText] = useState<string>('Enter Email address');
  const {
    addContactRequesting,
    addContactSuccess,
    addContactFailure,
    updateContactRequesting,
    updateContactSuccess,
    updateContactFailure,
  } = useAppSelector(state => state.Setting);
  const {submodules} = useAppSelector(state => state.Common);

  const dispatch = useAppDispatch();
  const authId = useAuthId();

  const contactTypeRef = useRef(null);
  const inputRef = useRef(null);

  const handleTextInputChange = (text: string) => {
    if (contactNumberError) {
      setContactNumberError('');
    }
    setContactNumber(text);
  };

  const handleModulesApplyFor = (moduleName: string, isChecked: boolean) => {
    const tempArr = [...modules];
    const itemIndex = tempArr.findIndex(e => e == moduleName);
    if (itemIndex == -1) {
      tempArr.push(moduleName);
      setModules(tempArr);
    } else {
      const filterArr = tempArr.filter(e => e !== moduleName);
      setModules(filterArr);
    }
  };

  const handleContactDetail = (item: TDropdownItem) => {
    setContactType(item.label);
    if (contactNumber) {
      setContactNumber('');
      //@ts-ignore
      inputRef && inputRef?.current?.reset();
    }
    if (item.label == 'EMAIL') {
      setHelperText('Enter Email');
    } else if (item.label == 'LANDLINE') {
      setHelperText('Enter Landline No#');
    }
    if (item.label == 'MOBILE') {
      setHelperText('Enter Mobile No#');
    }
    if (item.label == 'TOLL-FREE NUMBER') {
      setHelperText('Enter Toll-free No#');
    }
    setLabelText(item.label);
  };

  const handleSave = () => {
    if (contactNumber) {
      setContactNumberError('');
      getCurrentCompanyId()
        .then(id => {
          const payload: IAddContactDetailRequest = {
            companyId: id as string,
            modulesView: modules,
            contactType: contactType || contactDetail[0].label,
            contactValue: contactNumber,
            otherTitle: '',
            createdBy: authId,
          };
          if (isEdit) {
            const data: IUpdateContactDetailPayload = {
              id: contactInfo?.id as string,
              payload: payload,
            };
            dispatch(updateContactRequest(data));
          } else {
            dispatch(addContactRequest(payload));
          }
        })
        .catch(err => console.log(err));
    } else if (contactNumber == '') {
      setContactNumberError(`${contactType} field is required.`);
    }
  };

  const _getContactsRequest = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getContactsRequest(id as string));
      })
      .catch(err => console.log(err));
  };

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d: ISubmodule) => d.availableOnDocument);
  };

  useEffect(() => {
    if (isEdit && contactInfo) {
      const {contactType, contactNumber, modules} = contactInfo || {};
      setContactType(contactType);
      setModules(modules);
      setLabelText(contactType);
      setContactNumber(contactNumber);
      //@ts-ignore
      inputRef && inputRef?.current?.setValue(contactNumber);
      const contactTypeItem: TDropdownItem = contactDetail.find(
        (d: TDropdownItem) => d.label == contactType,
      ) as TDropdownItem;
      if (contactTypeItem !== undefined) {
        //@ts-ignore
        contactTypeRef &&
          contactTypeRef?.current?.setDefaultValue(contactTypeItem);
      }
    }
  }, [isEdit]);

  useEffect(() => {
    if (!addContactRequesting && addContactSuccess) {
      showToast('Contact Added', ToastType.SUCCESS);
      setContactNumber('');
      dispatch(resetAddContactRequest());
      _getContactsRequest();
    } else if (!addContactRequesting && addContactFailure) {
      showToast('Contact Not Added. Try again!', ToastType.ERROR);
      dispatch(resetAddContactRequest());
    }
  }, [addContactRequesting, addContactSuccess, addContactFailure]);

  useEffect(() => {
    if (!updateContactRequesting && updateContactSuccess) {
      showToast('Contact Updated', ToastType.SUCCESS);
      setContactNumber('');
      dispatch(resetUpdateContactRequest());
      _getContactsRequest();
      onSuccess && onSuccess();
    } else if (!updateContactRequesting && updateContactFailure) {
      showToast('Contact Not Updated. Try again!', ToastType.ERROR);
      dispatch(resetUpdateContactRequest());
    }
  }, [updateContactRequesting, updateContactSuccess, updateContactFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.wrapper}>
        <Spacer height={4} />

        <View style={styles.textContainer2}>
          <Label text="Contact Detail" style={styles.label} />
          <DropdownComponent
            data={contactDetail}
            onSelect={handleContactDetail}
            //@ts-ignore
            ref={contactTypeRef}
          />
        </View>
        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text={labelText} style={styles.label} required={true} />
          <Input
            onChangeText={handleTextInputChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            error={contactNumberError}
            //@ts-ignore
            ref={inputRef}
            placeholder={helperText}
            placeholderTextColor={COLOR_GRAY}
          />
        </View>
        <Spacer height={12} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {_getSubmodules().map((item: ISubmodule, index: number) => {
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
        <Spacer height={20} />
        <Button
          text={isEdit ? 'UPDATE' : 'SAVE'}
          onPress={handleSave}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={addContactRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ContactDetailUpdateView;
