import React from 'react';
import {useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';

interface Props {
    html: any,
}

const TemplateViewer: React.FC<Props> = ({html}) => {
  const {width, height} = useWindowDimensions();

    return (
      <WebView
        originWhitelist={['*']}
        source={{html: html}}
        style={{width:width, height: height}}
      />
    );
};

export default TemplateViewer;
