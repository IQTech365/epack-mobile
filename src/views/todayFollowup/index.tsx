import React, {FC, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Header from '../../common/Header';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getCurrentCompanyId} from '../../utils/storage';
import {getTodayFollowupsListRequest} from '../../redux/slices/CommonSlice';
import WhatsupIcon from '../../images/icons/whatsapp.svg';
import CallIcon from '../../images/icons/phone_call2.svg';
import Spacer from '../../common/Spacer';
import style from '../../common/CollapsibleView/style';
import {Shadow} from 'react-native-shadow-2';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_GRAY2,
  COLOR_GRAY3,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_GRAY6,
} from '../../utils/colors';
import {ITodayFollowUp} from '../../interface/common/common';
import {ScrollView} from 'react-native-gesture-handler';
import {IBillingInfo} from '../../interface/enquiry/IAddEnquiryRequest';

interface IProps {}

const TodayFollowup: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();

  const {followups} = useAppSelector(state => state.Common);

  const getTodaysFollowup = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getTodayFollowupsListRequest(id as string));
      })
      .catch(err => console.log('Error reading local storage'));
  };
  useEffect(() => {
    getTodaysFollowup();
  }, []);

  const _getTodayFollowup = (): ITodayFollowUp[] => {
    let list: ITodayFollowUp[] = [];
    const {data} = followups || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const handleCall = (item: ITodayFollowUp) => {
    const {phone} = getClientNameAndMobile(item);
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleWhatsappCall = (item: ITodayFollowUp) => {
    const {phone} = getClientNameAndMobile(item);
    if (phone) {
      Linking.openURL(`whatsapp://send?phone=+91${phone}`);
    }
  };

  const getClientNameAndMobile = (item: ITodayFollowUp) => {
    let name: string = '';
    let phone: string = '';

    const {enquiries} = item || {};
    if (enquiries && enquiries.length > 0) {
      const firstEnquiry = enquiries[0];
      const {partyName, mobile, billingBy, billingDetails} = firstEnquiry || {};
      if (billingBy === 'by Individual') {
        name = partyName;
        phone = mobile;
      } else if (billingBy === 'by Company') {
        const {
          employeeName,
          employeeMobile,
          authorityPersonName,
          authorityPersonMobile,
        } = billingDetails as IBillingInfo;
        name = employeeName || authorityPersonName;
        phone = employeeMobile || authorityPersonMobile;
      }
    }
    return {name, phone};
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Header label="Today's Followup" canGoBack={true} />
      <Spacer height={10} />
      {_getTodayFollowup().length > 0 ? (
        <FlatList
          data={_getTodayFollowup()}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              <Shadow distance={2.5}>
                <View style={styles.cardWrapper}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardHeading}>
                      {getClientNameAndMobile(item).name}
                    </Text>
                    <View style={styles.iconWrapper}>
                      <TouchableOpacity
                        onPress={() => handleWhatsappCall(item)}>
                        <WhatsupIcon width={22} height={22} />
                      </TouchableOpacity>
                      <Spacer width={20} />
                      <TouchableOpacity onPress={() => handleCall(item)}>
                        <CallIcon width={22} height={22} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.commentContainer}>
                    <View style={[styles.contentWrapper]}>
                      <View style={styles.labelContainer}>
                        <Text style={{fontWeight: 'bold', color: COLOR_BLACK}}>
                          Date:-
                        </Text>
                      </View>
                      <View style={styles.contentContainer}>
                        <Text>
                          {new Date(item.followUpDate).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[styles.contentWrapper, {borderBottomWidth: 0}]}>
                      <View style={styles.labelContainer}>
                        <Text style={{fontWeight: 'bold', color: COLOR_BLACK}}>
                          Last Comment:-
                        </Text>
                      </View>
                      <View style={styles.contentContainer}>
                        <Text>{item.comment}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Shadow>
              <Spacer height={10} />
            </View>
          )}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text
          style={{fontWeight: 'bold', fontSize: 22, fontFamily: 'workSens'}}>
          No more Followup Today
        </Text>
      )}
    </View>
  );
};

export default TodayFollowup;

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  cardWrapper: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 8,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_GRAY2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'WorkSans',
    color: COLOR_BLACK,
  },
  commentContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  contentWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GRAY5,
  },
  labelContainer: {
    width: '50%',
    alignItems: 'flex-start',
    backgroundColor: COLOR_GRAY6,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  contentContainer: {
    width: '50%',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 10,
  },
});
