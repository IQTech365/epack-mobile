import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Linking, FlatList, RefreshControl} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import Spacer from '../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getImportantLinksRequest} from '../../redux/slices/CommonSlice';
import { IImportantLink } from '../../interface/common/common';
import _ from 'underscore';

const ImportantLinksView = (props:any) => {
  const {importantLinks, getImportantLinksRequesting} = useAppSelector(state => state.Common);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getImportantLinksRequest());
  }, []);

  const handleRefresh = () => {
    dispatch(getImportantLinksRequest());
  }

  const _getLinkData = () => {
    let links:IImportantLink[] = [];
    if(_?.isObject(importantLinks)) {
      if(_?.isArray(importantLinks?.data)) {
        links = importantLinks?.data.filter((l:IImportantLink) => l.link !== '');
      }
    }
    return links;
  }

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Important Links" />
      <Spacer height={20} />
      <Text style={styles.contactUsText}>Please find some important Links</Text>
      <Spacer height={20} />
      <FlatList
        data={_getLinkData()}
        refreshControl={
          <RefreshControl
            refreshing={getImportantLinksRequesting}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.contactContainer}
              activeOpacity={0.4}
              onPress={() => {
                Linking.openURL(item.link,);
              }}>
              <Text style={styles.callText}>{item.title}</Text>
              <Text style={styles.emailText}>
                {item.link}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ImportantLinksView;
