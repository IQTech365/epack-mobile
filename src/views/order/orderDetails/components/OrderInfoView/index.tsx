import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import styles from './style';
import HeaderGridBackgroundImage from '../../../../../images/header-grid.png';
import PhoneIcon from '../../../../../images/icons/phone.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import Spacer from '../../../../../common/Spacer';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {COLOR_GRAY2, COLOR_WHITE} from '../../../../../utils/colors';
import orderStatusOptions from '../../../../../data/orderStatusOptions.json';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  resetUpdateEnquiryStatusRequest,
  updateEnquiryStatusRequest,
} from '../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
import {IGetOrdersData} from '../../../../../interface/order/IGetOrdersResponse';
import {formatDate} from '../../../../../utils/formatter';
import { IUpdateEnquiryStatusRequest } from '../../../../../interface/enquiry/IUpdateEnquiryStatusRequest';
interface IOrderInfoViewProps {
  orderId: string;
  item: IGetOrdersData | null;
}

const OrderInfoView: React.FC<IOrderInfoViewProps> = ({orderId, item}) => {
  const dispatch = useAppDispatch();
  const [orderStatus, setOrderStatus] = useState<string>('New');
  const {
    updateEnquiryStatusRequesting,
    updateEnquiryStatusSuccess,
    updateEnquiryStatusFailure,
  } = useAppSelector(state => state.Enquiry);

  const handleOrderStatusChange = (value: string) => {
    setOrderStatus(value);
    const payload: IUpdateEnquiryStatusRequest = {
      status: value.toUpperCase(),
    };
    dispatch(updateEnquiryStatusRequest({id: orderId as string, requestBody: payload}));
  };

  const handlePhoneCall = () => {
    // Linking.openURL(`tel:${item?.mobile}`);
  };

  const handleWhatsappCall = () => {
    // Linking.openURL(`whatsapp://send?phone=+91${item?.mobile}`);
  };

  useEffect(() => {
    if (!updateEnquiryStatusRequesting && updateEnquiryStatusSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Order Status',
        text2: `Order status has been updated to ${orderStatus}`,
      });
      dispatch(resetUpdateEnquiryStatusRequest());
    } else if (!updateEnquiryStatusRequesting && updateEnquiryStatusFailure) {
      Toast.show({
        type: 'error',
        text1: 'Enquiry Status',
        text2: 'Error in updating order status. Please try again!',
      });
      setOrderStatus('' as string);
      dispatch(resetUpdateEnquiryStatusRequest());
    }
  }, [
    updateEnquiryStatusRequesting,
    updateEnquiryStatusSuccess,
    updateEnquiryStatusFailure,
  ]);

  const getOrderDate = () => {
    if (item && item.createdAt) {
      return formatDate(new Date(item.createdAt));
    }
    return 'NA';
  };

  const getContactPersonName = () => {
    let name = '';
    if(item?.billingBy == 'by Individual') {
      name = item.partyName;
    } else {
      // @ts-ignore
      name = item?.billingDetails.authorityPersonName;
    }
    return name;
  }

  const getContactPersonNumber = () => {
    let number = '';
    if(item?.billingBy == 'by Individual') {
      number = item.mobile;
    } else {
      // @ts-ignore
      number = item?.billingDetails.authorityPersonMobile;
    }
    return number;
  }

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
                  {getContactPersonName()}
                </Text>
              </View>
              <View style={[styles.itemContainer]}>
                <Text style={styles.normalText}>
                  {getContactPersonNumber()}
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
                  <Text style={styles.valueText}>{getOrderDate()}</Text>
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
                    <MenuTrigger
                      customStyles={{
                        triggerText: {color: COLOR_WHITE},
                      }}
                      text={orderStatus}
                    />
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
                        },
                      }}>
                      {orderStatusOptions.map((option, index) => {
                        const isLastIndex =
                          index == orderStatusOptions.length - 1;
                        const lastItemStyle = isLastIndex
                          ? {
                              optionWrapper: {
                                borderBottomWidth: 0,
                                marginHorizontal: 5,
                              },
                              optionText: {
                                paddingVertical: 8,
                              },
                            }
                          : undefined;
                        return (
                          <MenuOption
                            customStyles={lastItemStyle}
                            onSelect={() => {
                              handleOrderStatusChange(option);
                            }}
                            text={option}
                          />
                        );
                      })}
                    </MenuOptions>
                  </Menu>
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

export default OrderInfoView;
