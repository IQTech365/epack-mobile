import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import PhoneBlueIcon from '../../../../../images/icons/phone-blue.svg';
import WhatsappIcon from '../../../../../images/icons/whatsapp.svg';
import MoreIcon from '../../../../../images/icons/dots-vertical.svg';
import Spacer from '../../../../../common/Spacer';
import enquiryStatusOptions from '../../../../../data/enquiryStatusOptions.json';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { COLOR_BLACK, COLOR_GRAY2 } from '../../../../../utils/colors';
import { IUpdateEnquiryStatusRequest } from '../../../../../interface/enquiry/IUpdateEnquiryStatusRequest';
import { getEnquiriesRequest, resetUpdateEnquiryStatusRequest, updateEnquiryStatusRequest } from '../../../../../redux/slices/EnquirySlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../redux/hooks';
import { ToastType, showToast } from '../../../../../utils/utility';
import { IGetOrdersRequest } from '../../../../../interface/order/IGetOrdersRequest';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { getOrdersRequest } from '../../../../../redux/slices/OrderSlice';
import { EventRegister } from 'react-native-event-listeners';
import { NavigationProp } from '@react-navigation/native';
import { IGetQuotationRequest } from '../../../../../interface/quotation/IGetQuotationRequest';
import { getQuotationsRequest } from '../../../../../redux/slices/QuotationSlice';

export interface IEnquiryItem {
  clientName: string;
  pickupAddress: string;
  deliveryAddress: string;
  shiftingType: string;
  shiftingLuggage: string;
  phoneNumber: string;
  enquiryId: string;
  enquiryDate?: string;
  status: string;
}

interface IEnquiryListItemProps {
  item: IEnquiryItem;
  index: number;
  enquiryId: string | undefined;
  onPress: () => void;
  onWhatsappPress?: () => void;
  onPhonePress?: () => void;
  onMorePress?: () => void;
  navigation: NavigationProp<any, any>

}

const EnquiryListItem: React.FC<IEnquiryListItemProps> = ({
  item,
  index,
  onPress,
  enquiryId,
  navigation
}) => {

  const dispatch = useDispatch();
  const {
    updateEnquiryStatusRequesting,
    updateEnquiryStatusSuccess,
    updateEnquiryStatusFailure,
  } = useAppSelector(state => state.Enquiry);

  const [enquiryStatus, setEnquiryStatus] = useState<string>(item?.status as string);

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${item.phoneNumber}`);
  }

  const handleWhatsappCall = () => {
    Linking.openURL(`whatsapp://send?phone=+91${item.phoneNumber}`);
  }

  const refreshOrders = () => {
    getCurrentCompanyId().then(id => {
      const payload: Partial<IGetOrdersRequest> = {
        companyId: id as string,
      };
      
      dispatch(getOrdersRequest(payload));
    }).catch(err => console.log(err));
  }

  const _getEnquiriesRequest = () => {
    getCurrentCompanyId().then(id => {
      dispatch(getEnquiriesRequest(id as string));
    }).catch(err => console.log(err));
  }

  const _getQuotationsRequest = () => {
    const enquiryQuotationFilters = ['COMPLETED', 'APPROVED'];
    getCurrentCompanyId().then(id => {
      const payload: IGetQuotationRequest = {
        companyId: id as string,
        notstatus: enquiryQuotationFilters,
      };
      dispatch(getQuotationsRequest(payload));
    }).catch(err => console.log(err));
  }


  const handleEnquiryStatusChange21 = (value: string) => {
    setEnquiryStatus(value);
    const payload: IUpdateEnquiryStatusRequest = {
      status: value.toUpperCase(),
    }
    dispatch(updateEnquiryStatusRequest({id: item.enquiryId as string, requestBody: payload}));
  }
  

  useEffect(() => {        
    if(!updateEnquiryStatusRequesting && updateEnquiryStatusSuccess) {      
      showToast('Enquiry Status Changed.', ToastType.SUCCESS);
      dispatch(resetUpdateEnquiryStatusRequest());
      _getEnquiriesRequest();
      if(enquiryStatus == 'Approved') {
        refreshOrders();
        EventRegister.emit('onUpdateEvent', true);
      } else {
        _getQuotationsRequest();
      }
    } else if(!updateEnquiryStatusRequesting && updateEnquiryStatusFailure) {      
      showToast('Enquiry Status Not Changed. Try again!', ToastType.ERROR);
      setEnquiryStatus(item?.status as string);
      dispatch(resetUpdateEnquiryStatusRequest());
    }
  }, [updateEnquiryStatusRequesting, updateEnquiryStatusSuccess, updateEnquiryStatusFailure]);

  return (
    <>
      <View style={styles.badgeWrapper}>
        <View style={styles.bageContainer}>
          <Text style={styles.badgeText}>{index + 1}</Text>
        </View>
        <Text style={styles.enquiryDateText}>{item.enquiryDate}</Text>
      </View>
      <Shadow style={styles.cardWrapper} distance={2}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={onPress}>
          <View style={styles.dateAndQuotationNumberContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{item.clientName}</Text>
            </View>
            <View style={styles.contactOptionsContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={handleWhatsappCall} >
                <WhatsappIcon width={24} height={24} />
              </TouchableOpacity>
              <Spacer width={12} height={0} />
              <TouchableOpacity activeOpacity={0.6} onPress={handlePhoneCall}>
                <PhoneBlueIcon width={24} height={24} />
              </TouchableOpacity>
              <Spacer width={12} height={0} />
              <TouchableOpacity 
              activeOpacity={0.4}>
                <Menu>
                  <MenuTrigger>
                  <MoreIcon width={24} height={24} />
                    </MenuTrigger>
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
                        color: COLOR_BLACK,
                        fontFamily: 'WorkSans-Regular'
                      }
                    }}>
                    {enquiryStatusOptions.map((option, index) => {
                          const isLastIndex = index == enquiryStatusOptions.length -1;
                          const lastItemStyle = isLastIndex ? {
                            optionWrapper: {borderBottomWidth: 0, marginHorizontal: 5,},
                            optionText: {
                              paddingVertical: 8,
                              color: COLOR_BLACK,
                              fontFamily: 'WorkSans-Regular'
                            }
                          } : undefined;
                          return <MenuOption customStyles={lastItemStyle} key={`${index}`}
                          onSelect={() => {
                            handleEnquiryStatusChange21(option);
                          }} text={option} />
                        })}
                    </MenuOptions>
                </Menu>
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Shifting Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.shiftingType}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Pickup Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.pickupAddress}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Delivery Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.deliveryAddress}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer]}>
            <View style={[styles.rowItemContainer, {borderBottomLeftRadius: 5,}]}>
              <Text style={styles.labelText}>Shifting Luggage</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderBottomRightRadius: 5,}]}>
              <Text style={styles.valueText}>{item.shiftingLuggage}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    </>
  );
};

export default EnquiryListItem;
