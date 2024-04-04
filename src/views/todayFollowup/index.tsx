import React, {FC, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View,FlatList, TouchableOpacity,} from 'react-native';
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
  COLOR_GRAY,
  COLOR_GRAY3,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_GRAY6,
} from '../../utils/colors';
import {ITodayFollowUp} from '../../interface/common/common';
import { ScrollView} from 'react-native-gesture-handler';

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

  console.log(followups);

  const _getTodayFollowup = (): ITodayFollowUp[] => {
    let list: ITodayFollowUp[] = [];
    const {data} = followups || {};
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Header label="Today's Followup" canGoBack={true} />
      <Spacer height={10} />
      <FlatList
        data={_getTodayFollowup()}
        renderItem={({item}) => (
          <View style={{alignItems: 'center'}}>
            <Shadow distance={2.5}>
              <View style={styles.cardWrapper}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardHeading}>Lalit</Text>
                  <View style={styles.iconWrapper}>
                    <TouchableOpacity>
                    <WhatsupIcon width={22} height={22} />
                    </TouchableOpacity>
                    <Spacer width={20} />
                    <TouchableOpacity>
                    <CallIcon width={22} height={22} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.commentContainer}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Date:- </Text>
                    {new Date(item.followUpDate).toLocaleString()}
                  </Text>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Last Comment:- </Text>
                    {item.comment}
                  </Text>
                </View>
              </View>
            </Shadow>
            <Spacer height={10} />
          </View>
        )}
        keyExtractor={item => item._id}
      />
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
});
