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
      // style={{width: width, height: height}}
      scalesPageToFit={true}
      style={{height: height, width, resizeMode: 'cover', flex: 1}}
      injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
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
