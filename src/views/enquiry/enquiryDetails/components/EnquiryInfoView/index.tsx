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
import { IUpdateEnquiryStatus } from '../../../../../interface/enquiry/IUpdateEnquiryStatusRequest';
import { resetUpdateEnquiryStatusRequest, updateEnquiryStatusRequest } from '../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
interface IEnquiryInfoViewProps {
  item: IGetEnquiriesData | undefined;
  enquiryId: string | undefined;
}

const EnquiryInfoView: React.FC<IEnquiryInfoViewProps> = ({item, enquiryId}) => {
  const dispatch = useAppDispatch();
  const {
    updateEnquiryStatusRequesting,
    updateEnquiryStatusSuccess,
    updateEnquiryStatusFailure,
  } = useAppSelector(state => state.Enquiry);

  const [enquiryStatus, setEnquiryStatus] = useState<string>(item?.status as string);
  const getEnquiryDate = () => {
    if (item && item.createdAt) {
      return formatDate(new Date(item.createdAt));
    }
    return 'NA';
  };

  const handleEnquiryStatusChange = (value: string) => {
    setEnquiryStatus(value);
    const payload: IUpdateEnquiryStatus = {
      enquiryId: enquiryId as string,
      status: value,
    }
    dispatch(updateEnquiryStatusRequest(payload));
  }

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${item?.mobile}`);
  }

  const handleWhatsappCall = () => {
    Linking.openURL(`whatsapp://send?phone=+91${item?.mobile}`);
  }

  useEffect(() => {
    if(!updateEnquiryStatusRequesting && updateEnquiryStatusSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Enquiry Status',
        text2: `Enquiry status has been updated to ${enquiryStatus}`,
      });
      dispatch(resetUpdateEnquiryStatusRequest());
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
                  {item?.partyName || item?.billingDetails?.authorityPersonName}
                </Text>
              </View>
              <View style={[styles.itemContainer]}>
                <Text style={styles.normalText}>
                  {item?.mobile || item?.billingDetails?.authorityPersonMobile}
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
                    {item?.pickupAddress.state}
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
                    {item?.dropAddress.state}
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
                    }} text={enquiryStatus} />
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
                      <MenuOption onSelect={() => {
                        handleEnquiryStatusChange('Approved');
                      }} text="Approved" />
                      <MenuOption onSelect={() => {
                        handleEnquiryStatusChange('Pending');
                      }} text="Pending" />
                      <MenuOption onSelect={() => {
                        handleEnquiryStatusChange('Under Process');
                      }} text="Under Process" />
                      <MenuOption
                        customStyles={{
                          optionWrapper: {borderBottomWidth: 0, marginHorizontal: 5,},
                          optionText: {
                            paddingVertical: 8,
                          }
                        }}
                        onSelect={() => {
                          handleEnquiryStatusChange('Canceled');
                        }}
                        text="Canceled"
                        />
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
