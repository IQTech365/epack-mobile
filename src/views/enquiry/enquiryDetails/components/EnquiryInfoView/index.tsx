import React, { useEffect, useState } from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Linking} from 'react-native';
import styles from './style';
import HeaderGridBackgroundImage from '../../../../../images/header-grid.png';
import PhoneIcon from '../../../../../images/icons/phone.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import Spacer from '../../../../../common/Spacer';
import {IGetEnquiriesData} from '../../../../../interface/enquiry/IGetEnquiriesResponse';
import {formatDate} from '../../../../../utils/formatter';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {COLOR_GRAY2, COLOR_WHITE} from '../../../../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { IUpdateEnquiryStatusRequest } from '../../../../../interface/enquiry/IUpdateEnquiryStatusRequest';
import { getEnquiriesRequest, resetUpdateEnquiryStatusRequest, updateEnquiryStatusRequest } from '../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
import enquiryStatusOptions from '../../../../../data/enquiryStatusOptions.json';
import useCompanyId from '../../../../../hooks/useCompanyId';
import { NavigationProp } from '@react-navigation/native';
import { IGetOrdersRequest } from '../../../../../interface/order/IGetOrdersRequest';
import { getOrdersRequest } from '../../../../../redux/slices/OrderSlice';

interface IEnquiryInfoViewProps {
  item: IGetEnquiriesData | undefined;
  enquiryId: string | undefined;
  navigation: NavigationProp<any, any>
}

const EnquiryInfoView: React.FC<IEnquiryInfoViewProps> = ({item, enquiryId, navigation}) => {
  const dispatch = useAppDispatch();
  const {
    updateEnquiryStatusRequesting,
    updateEnquiryStatusSuccess,
    updateEnquiryStatusFailure,
  } = useAppSelector(state => state.Enquiry);
  const companyId = useCompanyId();

  const [enquiryStatus, setEnquiryStatus] = useState<string>(item?.status as string);
  const getEnquiryDate = () => {
    if (item && item.createdAt) {
      return formatDate(new Date(item.createdAt));
    }
    return 'NA';
  };

  const handleEnquiryStatusChange = (value: string) => {
    setEnquiryStatus(value);
    const payload: IUpdateEnquiryStatusRequest = {
      status: value == 'Approved' ? 'NEW ORDER' : value.toUpperCase(),
    }
    dispatch(updateEnquiryStatusRequest({id: enquiryId as string, requestBody: payload}));
  }

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${item?.mobile}`);
  }

  const handleWhatsappCall = () => {
    Linking.openURL(`whatsapp://send?phone=+91${item?.mobile}`);
  }

  const _getName = (item:any) => {
    let name:string = '';
    if(item?.partyName){
      name = item?.partyName;
    } else if (item?.billingDetails?.authorityPersonName) {
      name = item?.billingDetails?.authorityPersonName;
    }
    return name;
  }

  const _getMobile = (item:any) => {
    let mobile:string = '';
    if(item?.mobile) {
      mobile = item?.mobile;
    } else if(item?.billingDetails?.authorityPersonMobile) {
      mobile = item?.billingDetails?.authorityPersonMobile;
    }
    return mobile;
  }

  const refreshOrders = () => {
    const payload: Partial<IGetOrdersRequest> = {
      companyId: companyId,
    };
    dispatch(getOrdersRequest(payload));
  }

  useEffect(() => {
    if(!updateEnquiryStatusRequesting && updateEnquiryStatusSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Enquiry Status',
        text2: `Enquiry status has been updated to ${enquiryStatus.toUpperCase()}`,
      });
      dispatch(resetUpdateEnquiryStatusRequest());
      dispatch(getEnquiriesRequest(companyId));
      if(enquiryStatus == 'Approved') {
        refreshOrders();
        navigation.goBack();
      }
    } else if(!updateEnquiryStatusRequesting && updateEnquiryStatusFailure) {
      Toast.show({
        type: 'error',
        text1: 'Enquiry Status',
        text2: 'Error in updating enquriy status. Please try again!',
      });
      setEnquiryStatus(item?.status as string);
      dispatch(resetUpdateEnquiryStatusRequest());
    }
  }, [updateEnquiryStatusRequesting, updateEnquiryStatusSuccess, updateEnquiryStatusFailure]);
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        imageStyle={styles.container}
        source={HeaderGridBackgroundImage}>
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.infoContainer}>
              <View style={[styles.itemContainer]}>
                <Text style={styles.nameText}>
                  {_getName(item)}
                </Text>
              </View>
              <View style={[styles.itemContainer]}>
                <Text style={styles.normalText}>
                  {_getMobile(item)}
                </Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>From</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>
                    {item?.pickupAddress?.city?.split('-')[0]}
                  </Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Date</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{getEnquiryDate()}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>To</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>
                    {item?.dropAddress?.city?.split('-')[0]}
                  </Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Status</Text>
                </View>
                <View style={styles.hyphenContainer}>
                  <Text style={styles.hyphenText}>-</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Menu>
                    <MenuTrigger customStyles={{
                      triggerText: {color: COLOR_WHITE}
                    }} text={enquiryStatus.toUpperCase()} />
                    <MenuOptions
                      customStyles={{
                        optionsContainer: {borderRadius: 5},
                        optionsWrapper: {
                          borderColor: COLOR_GRAY2,
                          borderWidth: 0.5,
                          borderRadius: 5,
                        },
                        optionWrapper: {
                          marginHorizontal: 5,
                          borderBottomWidth: 0.5,
                          justifyContent: 'center',
                        },
                        optionText: {
                          paddingVertical: 8,
                        }
                      }}>
                        {enquiryStatusOptions.map((option, index) => {
                          const isLastIndex = index == enquiryStatusOptions.length -1;
                          const lastItemStyle = isLastIndex ? {
                            optionWrapper: {borderBottomWidth: 0, marginHorizontal: 5,},
                            optionText: {
                              paddingVertical: 8,
                            }
                          } : undefined;
                          return <MenuOption customStyles={lastItemStyle} key={`${index}`} onSelect={() => {
                            handleEnquiryStatusChange(option);
                          }} text={option} />
                        })}
                    </MenuOptions>
                  </Menu>
                  {/* <Text style={styles.valueText}>{item?.status}</Text> */}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.iconItemContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleWhatsappCall}>
              <WhatsappIcon width={24} height={24} />
            </TouchableOpacity>
            <Spacer height={20} />
            <TouchableOpacity activeOpacity={0.6} onPress={handlePhoneCall}>
              <PhoneIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EnquiryInfoView;
