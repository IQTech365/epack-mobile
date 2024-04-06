import React, {FC, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../common/Header';
import {getCurrentCompanyId} from '../../utils/storage';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getTodayShiftingListRequest} from '../../redux/slices/CommonSlice';
import {ITodayShifting} from '../../interface/common/common';
import Spacer from '../../common/Spacer';
import {Shadow} from 'react-native-shadow-2';
import WhatsupIcon from '../../images/icons/whatsapp.svg';
import CallIcon from '../../images/icons/phone_call2.svg';
import {
  COLOR_GRAY,
  COLOR_GRAY3,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_GRAY6,
} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IBillingInfo} from '../../interface/enquiry/IAddEnquiryRequest';

interface IProps {}

const TodayShiftings: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();

  const {shifting} = useAppSelector(state => state.Common);

  const getTodaysShifting = () => {
    getCurrentCompanyId()
      .then(id => {
        dispatch(getTodayShiftingListRequest(id as string));
      })
      .catch(err => console.log('Error reading local storage'));
  };

  const _getTodayShifting = (): ITodayShifting[] => {
    let list: ITodayShifting[] = [];
    const {data} = shifting || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const handleCall = (item: ITodayShifting) => {
    const {phone} = getClientNameAndMobile(item);
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleWhatsappCall = (item: ITodayShifting) => {
    const {phone} = getClientNameAndMobile(item);
    if (phone) {
      Linking.openURL(`whatsapp://send?phone=+91${phone}`);
    }
  };

  const getClientNameAndMobile = (item: ITodayShifting) => {
    let name: string = '';
    let phone: string = '';

    const {partyName, mobile, billingBy, billingDetails} = item || {};
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
    return {name, phone};
  };

  useEffect(() => {
    getTodaysShifting();
  }, []);

  return (
    <View style={{alignItems: 'center'}}>
      <Header label="Today's Shifting" canGoBack={true} />
      <Spacer height={10} />
      {_getTodayShifting().length > 0 ? (
        <FlatList
          data={_getTodayShifting()}
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
                    <View style={styles.contentWrapper}>
                      <View style={styles.labelContainer}>
                        <Text style={{fontWeight: 'bold'}}>Date:- </Text>
                      </View>
                      <View style={styles.contentContainer}>
                        <Text>
                          {new Date(item.shiftingDate).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[styles.contentWrapper, {borderBottomWidth: 0}]}>
                      <View style={styles.labelContainer}>
                        <Text>
                          <Text style={{fontWeight: 'bold'}}>
                            Company ID:-{' '}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.contentContainer}>
                        <Text>{item.sn}</Text>
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
          No more Shifting Today
        </Text>
      )}
    </View>
  );
};

export default TodayShiftings;

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
    backgroundColor: COLOR_GRAY6,
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
  },
  commentContainer: {
    padding: 10,
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
