import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import {TDropdownItem} from '../../../type/TDropdownItem';
import Label from '../../../common/Label';
import DropdownComponent from '../../../common/DropdownComponent';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CollapsibleView from '../../../common/CollapsibleView';
import Button from '../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import entityOptions from '../../../data/entityOptions.json';
import actionOptions from '../../../data/actionOptions.json';
import {
  IAddUserRoleRequest,
  IRoleTypeData,
} from '../../../interface/setting/role/IUserRole';
import {
  addUserRoleRequest,
  checkUsernameAvailabilityRequest,
  getRoleTypesRequest,
  resetCheckUsernameAvailabilityRequest,
  resetGetRoleTypesRequest,
} from '../../../redux/slices/UserRoleManagementSlice';
import Spinner from '../../../common/Spinner';
import InputWithButton from '../../../common/InputWithButton';
import {ICheckUsernameAvailablilityRequest} from '../../../interface/setting/role/ICheckUsername';
import Toast from 'react-native-toast-message';
import { getBranchsRequest, getFranchiseRequest } from '../../../redux/slices/MyProfile';

const RoleManagementView: React.FC<{}> = ({}) => {
  const [entityType, setEntityType] = useState<string>('Head Office');
  const [subEntityType, setSubEntityType] = useState<string>('0');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roleType, setRoleType] = useState<string>('');
  const [permissions, setPermissions] = useState<string[]>([]);
  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);
  const {
    getRoleTypesRequesting,
    getRoleTypeSuccess,
    getRoleTypeFailure,
    roleTypes,
    checkUsernameAvailabilityRequesting,
    checkUsernameAvailabilitySuccess,
    checkUsernameAvailabilityFailure,
    checkUsernameAvailabilityInfo,
  } = useAppSelector(state => state.UserRole);
  const {Franchises, Branchs} = useAppSelector(
    state => state.Myprofile,
  );
  const {otpData} = useAppSelector(state => state.OTP);
  // Errors
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const {data: roleTypesData} = roleTypes || {};
  const {data: brancheData = []} = Branchs || {};
  const {data: franchiseData = []} = Franchises || {};

  const dispatch = useAppDispatch();

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
    }
    return id;
  };

  const transformBranchData = () => {
    let _data:TDropdownItem[] = [];
    if(brancheData && Array.isArray(brancheData) && brancheData.length > 0) {
      _data = brancheData.map(d => {
        return {label: d.branchName, value: d._id};
      })
    }
    return _data;
  }

  const transformFranchiseData = () => {
    let _data:TDropdownItem[] = [];
    if(franchiseData && Array.isArray(franchiseData) && franchiseData.length > 0) {
      _data = franchiseData.map(d => {
        return {label: d.franchiseName, value: d._id};
      })
    }
    return _data;
  }

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

  const handleEmployeeNameInputTextChange = useCallback(
    (text: string) => {
      setEmployeeName(text);
    },
    [employeeName],
  );

  const handleMobileNumInputTextChange = useCallback(
    (text: string) => {
      setMobile(text);
    },
    [mobile],
  );

  const handleEmailInputTextChange = useCallback(
    (text: string) => {
      setEmail(text);
    },
    [email],
  );

  const handleUsernameInputTextChange = useCallback(
    (text: string) => {
      setUsername(text);
    },
    [username],
  );

  const handlePasswordInputTextChange = useCallback(
    (text: string) => {
      setPassword(text);
    },
    [password],
  );

  const handleRoleType = useCallback(
    (text: string) => {
      setRoleType(text);
    },
    [roleType],
  );

  const handlePermissions = useCallback(
    (isChecked: boolean, value: string) => {
      let temp = [...permissions];
      const itemIndex = temp.findIndex(itm => itm == value);
      if (itemIndex == -1 && isChecked) {
        temp.push(value);
      } else if (itemIndex != -1 && !isChecked) {
        temp = temp.filter(itm => itm != value);
      }
      setPermissions(temp);
    },
    [permissions],
  );

  const handleSubmit = () => {
    const payload: IAddUserRoleRequest = {
      companyId: getCompanyId(),
      roleTypeId: roleType,
      entityType: entityType,
      entityId: subEntityType,
      name: employeeName,
      email: email,
      mobile: mobile,
      username: username,
      password: password,
      permissions: [],
      createdBy: otpData?.data.id as string,
    };
    dispatch(addUserRoleRequest(payload));
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

  const showUsernameAvailabilityStatusView = () => {
    if(!checkUsernameAvailabilityRequesting && checkUsernameAvailabilitySuccess) {
      const {data} = checkUsernameAvailabilityInfo || {};
      const {message} = data || {};
      let textStyle = styles.usernameAvailableInfoText;
      if(message && message.includes('taken')) {
        textStyle = styles.usernameNotAvailableInfoText;
      }
      return (
        <View style={styles.usernameAvailablityStatusContainer}>
          <Text style={textStyle}>{checkUsernameAvailabilityInfo?.data?.message}</Text>
        </View>
      );
    }
    return null;
  }

  const hanldeUsernameAvailabilityCheck = () => {
    dispatch(resetCheckUsernameAvailabilityRequest());
    if (username) {
      const payload: ICheckUsernameAvailablilityRequest = {
        username: username,
      };
      dispatch(checkUsernameAvailabilityRequest(payload));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please type keywords to find username.'
      });
    }
  };

  useEffect(() => {
    dispatch(getRoleTypesRequest());
    dispatch(getBranchsRequest(getCompanyId()));
    dispatch(getFranchiseRequest(getCompanyId()));
  }, []);

  useEffect(() => {
    if (!getRoleTypesRequesting && (getRoleTypeSuccess || getRoleTypeFailure)) {
      dispatch(resetGetRoleTypesRequest());
    }
  }, [getRoleTypesRequesting, getRoleTypeSuccess, getRoleTypeFailure]);

  useEffect(() => {
    if (!checkUsernameAvailabilityRequesting && checkUsernameAvailabilityFailure) {
      Toast.show({
        type: 'error',
        text1: 'Username',
        text2: 'Error in checking username availability. Please try again!'
      });
      dispatch(resetCheckUsernameAvailabilityRequest());
    }
  }, [checkUsernameAvailabilityRequesting, checkUsernameAvailabilityFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="Role Management" canGoBack={true} />
        <Spacer height={4} />
        <CollapsibleView title="GENERAL INFO" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <Label text="Choose Entity Type" style={styles.label} />
              <DropdownComponent
                data={entityOptions}
                onSelect={handleEntityType}
              />
            </View>
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
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Employee Name" style={styles.label} />
              <Input
                onChangeText={handleEmployeeNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile Number" style={styles.label} />
              <Input
                onChangeText={handleMobileNumInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Email" style={styles.label} />
              <Input
                onChangeText={handleEmailInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Create Username" style={styles.label} />
              <InputWithButton
                onChangeText={handleUsernameInputTextChange}
                inProgress={checkUsernameAvailabilityRequesting}
                onCheckPress={hanldeUsernameAvailabilityCheck}
              />
              {showUsernameAvailabilityStatusView()}
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Create Password" style={styles.label} />
              <Input
                onChangeText={handlePasswordInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Role Type" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {roleTypesData?.map((role: IRoleTypeData, index: number) => {
                return (
                  <BouncyCheckbox
                    key={`${index}`}
                    text={role.roleType}
                    fillColor={COLOR_BLUE}
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15, marginBottom: 10}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      handleRoleType(role._id);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Allow Permissions" style={styles.label} />
        </View>
        <Spacer height={4} />
        <CollapsibleView title="ENQUIRY MANAGEMENT" collapsed={true}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Enquiry" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
                    fillColor={COLOR_BLUE}
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15, marginBottom: 10}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      handlePermissions(isChecked, item.action);
                    }}
                  />
                );
              })}
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Follow-Ups" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
                    fillColor={COLOR_BLUE}
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15, marginBottom: 10}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      handlePermissions(isChecked, item.action);
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Survey" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Quotation" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
                    fillColor={COLOR_BLUE}
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15, marginBottom: 10}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      handlePermissions(isChecked, item.action);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="ORDER MANAGEMENT" collapsed={true}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Order" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Money Receipt" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Car Condition" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Bilty" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Invoice" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Order Status" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
          </View>
        </CollapsibleView>
        <CollapsibleView title="CUSTOMER MANAGEMENT" collapsed={true}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Contact Details" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Order Details" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Car Condition" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Bilty" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Invoice" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Order Status" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
                      fillColor={COLOR_BLUE}
                      iconStyle={{
                        borderColor: 'red',
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      innerIconStyle={{
                        borderWidth: 1,
                        borderRadius: 0,
                        width: 16,
                        height: 16,
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                      }}
                      style={{marginRight: 15, marginBottom: 10}}
                      textContainerStyle={{paddingLeft: 0}}
                      onPress={(isChecked: boolean) => {
                        handlePermissions(isChecked, item.action);
                      }}
                    />
                  );
                })}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text="SUBMIT"
          onPress={handleSubmit}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={getRoleTypesRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default RoleManagementView;
