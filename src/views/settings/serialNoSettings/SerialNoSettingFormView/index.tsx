import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Spacer from '../../../../common/Spacer';
import Label from '../../../../common/Label';
import DropdownComponent from '../../../../common/DropdownComponent';
import chooseEntity from '../../../../data/chooseEntity.json';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import Input from '../../../../common/Input';
import {COLOR_BLACK} from '../../../../utils/colors';
import Button from '../../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  getBranchsRequest,
  getFranchiseRequest,
} from '../../../../redux/slices/MyProfile';
import {ICreateSerialNoRequest} from '../../../../interface/setting/serialNo/ICreateSerialNoRequest';
import {createSerialNoRequest, resetCreateSerialNoRequest} from '../../../../redux/slices/SerialNoSettingSlice';
import Toast from 'react-native-toast-message';
import Spinner from '../../../../common/Spinner';

interface IMoneyReceiptSNProps {
  moduleId: string;
  moduleName: string;
}

const SerialNoSettingFormView:React.FC<IMoneyReceiptSNProps> = ({moduleId, moduleName}) => {
  const [entityType, setEntityType] = useState<string>(chooseEntity[0].label);
  const [subEntityType, setSubEntityType] = useState<string>('0');
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const dispatch = useAppDispatch();
  const {Franchises, Branchs} = useAppSelector(state => state.Myprofile);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const {otpData} = useAppSelector(state => state.OTP);
  const {
    createSerialNumberRequesting,
    createSerialNumberSuccess,
    createSerialNumberFailure,
  } = useAppSelector(state => state.SNSetting);

  const {data: brancheData = []} = Branchs || {};
  const {data: franchiseData = []} = Franchises || {};

  const getCompanyId = () => {
    let id;
    const {data} = addCompanyInfo || {};
    const {data: companiesData} = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
      id = companiesData._id;
    }
    return id;
  };

  const transformBranchData = () => {
    let _data: TDropdownItem[] = [];
    if (brancheData && Array.isArray(brancheData) && brancheData.length > 0) {
      _data = brancheData.map(d => {
        return {label: d.branchName, value: d._id};
      });
    }
    return _data;
  };

  const transformFranchiseData = () => {
    let _data: TDropdownItem[] = [];
    if (
      franchiseData &&
      Array.isArray(franchiseData) &&
      franchiseData.length > 0
    ) {
      _data = franchiseData.map(d => {
        return {label: d.franchiseName, value: d._id};
      });
    }
    return _data;
  };

  const getSubEntityDropdownOptionsLabel = () => {
    let label = '';
    if (entityType == 'Branch') {
      label = 'Branch Name';
    } else if (entityType == 'Franchise') {
      label = 'Franchise Name';
    }
    return label;
  };

  const getSubEntityDropdownOptions = () => {
    let options: TDropdownItem[] = [];
    if (entityType == 'Branch') {
      options = transformBranchData();
    } else if (entityType == 'Franchise') {
      options = transformFranchiseData();
    }
    return options;
  };

  const handleEntityType = useCallback(
    (item: TDropdownItem) => {
      setEntityType(item.label);
    },
    [entityType],
  );

  const handleSubEntity = useCallback(
    (item: TDropdownItem) => {
      setSubEntityType(item.value);
    },
    [subEntityType],
  );

  const handlePrefixTextInputChange = (text: string) => {
    setPrefix(text);
  };

  const handleSuffixTextInputChange = (text: string) => {
    setSuffix(text);
  };

  const handleSave = () => {
    const payload: ICreateSerialNoRequest = {
      companyId: getCompanyId(),
      companyEntity: entityType,
      branchId: subEntityType,
      moduleId: subEntityType,
      moduleName: moduleName,
      prefix: prefix,
      initialValue: suffix,
      // createdBy: otpData?.data.id as string,
    };
    console.log('SerialNO-Payload--', JSON.stringify(payload));
    dispatch(createSerialNoRequest(payload));
  };

  useEffect(() => {
    dispatch(getBranchsRequest(getCompanyId()));
    dispatch(getFranchiseRequest(getCompanyId()));
  }, []);

  useEffect(() => {
    if (!createSerialNumberRequesting && createSerialNumberSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Serial No',
        text2: 'Serial Number created successfully.'
      });
      dispatch(resetCreateSerialNoRequest());
    } else if (!createSerialNumberRequesting && createSerialNumberFailure) {
      Toast.show({
        type: 'error',
        text1: 'Serial No',
        text2: 'Error in creating Serial Number. Please try again!'
      });
      dispatch(resetCreateSerialNoRequest());
    }
  }, [createSerialNumberRequesting, createSerialNumberSuccess, createSerialNumberFailure]);

  return (
    <View>
      <View style={styles.textContainer2}>
        <Label text="Choose Entity" style={styles.label} />
        <DropdownComponent data={chooseEntity} onSelect={handleEntityType} />
        {entityType == 'Branch' || entityType == 'Franchise' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label
                text={getSubEntityDropdownOptionsLabel()}
                style={styles.label}
              />
              <DropdownComponent
                data={getSubEntityDropdownOptions()}
                onSelect={handleSubEntity}
              />
            </View>
          </>
        ) : null}
      </View>
      <View style={styles.mainWrapper}>
        <View style={styles.textContainer}>
          <Label text="Prefix" style={styles.label} />
          <Input
            onChangeText={handlePrefixTextInputChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="#RD"
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Suffix (intial value)" style={styles.label} />
          <Input
            onChangeText={handleSuffixTextInputChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="Ex. 101"
          />
        </View>
      </View>
      <Spacer height={8} />
      <Button
        text="SAVE"
        onPress={handleSave}
        disabled={false}
        style={styles.previewButtonStyle}
        textStyle={styles.textStyle}
      />
      <Spacer height={8} />
      <Spinner show={createSerialNumberRequesting} />
    </View>
  );
};

export default SerialNoSettingFormView;
