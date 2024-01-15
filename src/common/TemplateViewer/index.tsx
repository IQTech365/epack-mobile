import React from 'react';
import {useWindowDimensions, View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLOR_BLACK} from '../../utils/colors';

interface Props {
  html: any;
}

const TemplateViewer: React.FC<Props> = ({html}) => {
  const {width, height} = useWindowDimensions();

  if (!html) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Preview available!</Text>
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{html: html}}
      style={{width: width, height: height}}
    />
  );
};

export default TemplateViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLOR_BLACK,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
});
