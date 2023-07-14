import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import languageOptions from '../../data/language.json';
import { useTranslation } from "react-i18next";
import Header from '../../common/Header';
import Spacer from '../../common/Spacer';

type TLanguage = {
  code: string;
  label: string;
};

const LanguageSelectPageView = () => {
  const { i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const handleLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  const renderItem = (item: TLanguage, index: number) => {
    const selectedLanguage = item.code === selectedLanguageCode;
    return (
      <TouchableOpacity
        key={`${index}`}
        activeOpacity={0.6}
        disabled={selectedLanguage}
        onPress={() => handleLanguage(item.code)}
        style={styles.item}
        >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <Header label='Select Language' canGoBack={true} />
        <Spacer height={8} />
      <FlatList
        data={languageOptions}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default LanguageSelectPageView;
