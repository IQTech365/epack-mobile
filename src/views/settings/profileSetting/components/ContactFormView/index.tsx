/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import contactDetail from '../../../../../data/contactDetail.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Button from '../../../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import Toast from 'react-native-toast-message';
import { addContactRequest, getContactsRequest, resetAddContactRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import { IAddContactDetailRequest } from '../../../../../interface/setting/packerProfile/contactDetail/IAddContactDetailRequest';
import Spinner from '../../../../../common/Spinner';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { ISubmodule } from '../../../../../interface/common/common';
import useAuthId from '../../../../../hooks/useAuthId';

interface IContactDetailsProps {}

const ContactDetailUpdateView: React.FC<IContactDetailsProps> = ({}) => {
  const [contactType, setContactType] = useState<string>('EMAIL');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [contactNumberError, setContactNumberError] = useState<string>('');
  const [modules, setModules] = useState<string[]>([]);
  const {
    addContactRequesting,
    addContactSuccess,
    addContactFailure,
  } = useAppSelector(state => state.Setting);
  const {submodules} = useAppSelector(state => state.Common);
  
  const dispatch = useAppDispatch()
  const authId = useAuthId();

  const handleTextInputChange = (text: string) => {
    if(contactNumberError) {
      setContactNumberError('');
    }
    setContactNumber(text);
  }

  const handleSwitchContactDetail = () => {
    switch (contactType) {
      case 'EMAIL':
        return (
          <View style={styles.textContainer2}>
            <Label text="Email" style={styles.label} required={true} />
            <Input
              onChangeText={handleTextInputChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              error={contactNumberError}
            />
          </View>
        );
      case 'LANDLINE':
        return (
          <View style={styles.textContainer2}>
            <Label text="Landline" style={styles.label} required={true} />
            <Input
              onChangeText={handleTextInputChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              error={contactNumberError}
            />
          </View>
        );
      case 'MOBILE':
        return (
          <View style={styles.textContainer2}>
            <Label text="Mobile" style={styles.label} required={true} />
            <Input
              onChangeText={handleTextInputChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              error={contactNumberError}
            />
          </View>
        );
    }
  };

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

  const handleContactDetail = (item: TDropdownItem) => {
    setContactType(item.label);
  };

  const handleSave = () => {
    if(contactNumber && modules.length > 0) {
      setContactNumberError('');
      getCurrentCompanyId().then(id => {
        const payload: IAddContactDetailRequest = {
          companyId: id as string,
          modulesView: modules,
          contactType: contactType || contactDetail[0].label,
          contactValue: contactNumber,
          otherTitle: '',
          createdBy: authId,
        }
        dispatch(addContactRequest(payload));
      }).catch(err => console.log(err));
    } else if(contactNumber == '') {
      setContactNumberError(`${contactType} field is required.`);
    } else if(modules.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Modules',
        text2: `Please select atleast one module for which this ${contactNumber}`,
      });
    }
   
  }

  const _getContactsRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getContactsRequest(id as string));
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

  useEffect(() => {
    if (!addContactRequesting && addContactSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Contact Detail',
        text2: 'Contact detail has been added successfully',
      });
      setContactNumber('');
      dispatch(resetAddContactRequest());
      _getContactsRequest();
    } else if (!addContactRequesting && addContactFailure) {
      Toast.show({
        type: 'error',
        text1: 'Contact Detail',
        text2: 'Error in adding Contact Detail. Please try again!',
      });
      dispatch(resetAddContactRequest());
    }
  }, [addContactRequesting, addContactSuccess, addContactFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.wrapper}>
        <Spacer height={4} />

        <View style={styles.textContainer2}>
          <Label text="Contact Detail" style={styles.label} />
          <DropdownComponent
            data={contactDetail}
            onSelect={handleContactDetail}
          />
        </View>
        <Spacer height={12} />
        {handleSwitchContactDetail()}
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
                  isChecked={false}
                />
              </View>
            );
          })}
        </View>
        <Spacer height={20} />
        <Button
          text="SAVE"
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
