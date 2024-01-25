import React, {useState} from 'react';
import {View, Text, FlatList, useWindowDimensions} from 'react-native';
import Header from '../../common/Header';
import styles from './style';
import termsConditions from '../../data/terms-conditions.json';
import TermsAndConditionListItem, { ITermsConditions } from './components/TermsAndCondtionListItem';
import Spacer from '../../common/Spacer';
import ModalHOC from '../../common/ModalHOC';
import {WebView} from 'react-native-webview';

const TermsAndConditionsView = () => {
  const {width, height} = useWindowDimensions();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPageUri, setCurrentPageUri] = useState<string>(
    'https://www.epackbook.in/about-us',
  );
  const [pageTitle, setPageTitle] = useState<string>('About Us');

  const _handlePageUriChange = (item:ITermsConditions) => {
    setCurrentPageUri(item.uri);
    setPageTitle(item.title);
    setShowModal(true);
  };

  const _handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Header canGoBack={true} label="Terms & Conditions" />
      <Spacer height={10} />
      <FlatList
        data={termsConditions}
        renderItem={({item, index}) => (
          <TermsAndConditionListItem
            item={item}
            index={index}
            onPress={_handlePageUriChange}
          />
        )}
      />
      <ModalHOC
        visible={showModal}
        modalStyle={styles.modalStyle}
        headerStyle={styles.headerStyle}
        onClose={_handleModalClose}
        title={pageTitle.toUpperCase()}>
        <WebView
          originWhitelist={['*']}
          source={{uri: currentPageUri}}
          style={{width: width, height: height}}
        />
      </ModalHOC>
    </View>
  );
};

export default TermsAndConditionsView;
