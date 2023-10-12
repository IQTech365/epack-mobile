import React, { useState } from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Linking} from 'react-native';
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
import { COLOR_GRAY2, COLOR_WHITE } from '../../../../../utils/colors';

interface IOrderInfoViewProps {}

const OrderInfoView: React.FC<IOrderInfoViewProps> = ({}) => {
  const [orderStatus, setOrderStatus] = useState<string>('New');

  const handleOrderStatusChange = (value: string) => {
    // setEnquiryStatus(value);
    // const payload: IUpdateEnquiryStatus = {
    //   enquiryId: enquiryId as string,
    //   status: value,
    // }
    // dispatch(updateEnquiryStatusRequest(payload));
  }

  const handlePhoneCall = () => {
    // Linking.openURL(`tel:${item?.mobile}`);
  }

  const handleWhatsappCall = () => {
    // Linking.openURL(`whatsapp://send?phone=+91${item?.mobile}`);
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
                <Text style={styles.nameText}>Ms. Vanshika Vats</Text>
              </View>
              <View style={[styles.itemContainer]}>
                <Text style={styles.normalText}>9876546789</Text>
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
                  <Text style={styles.valueText}>Delhi</Text>
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
                  <Text style={styles.valueText}>20 Nov. 2022</Text>
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
                  <Text style={styles.valueText}>Gurgaon</Text>
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
                    }} text={orderStatus} />
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
                        handleOrderStatusChange('Approved');
                      }} text="Approved" />
                      <MenuOption onSelect={() => {
                        handleOrderStatusChange('Pending');
                      }} text="Pending" />
                      <MenuOption onSelect={() => {
                        handleOrderStatusChange('Under Process');
                      }} text="Under Process" />
                      <MenuOption
                        customStyles={{
                          optionWrapper: {borderBottomWidth: 0, marginHorizontal: 5,},
                          optionText: {
                            paddingVertical: 8,
                          }
                        }}
                        onSelect={() => {
                          handleOrderStatusChange('Canceled');
                        }}
                        text="Canceled"
                        />
                    </MenuOptions>
                  </Menu>
                  {/* <Text style={styles.valueText}>New</Text> */}
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
