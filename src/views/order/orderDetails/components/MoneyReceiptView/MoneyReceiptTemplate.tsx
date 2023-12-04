import React from 'react';
import {View, ScrollView, useWindowDimensions} from 'react-native';
import {useAppSelector} from '../../../../../redux/hooks';
import RenderHtml from 'react-native-render-html';
import {WebView} from 'react-native-webview';

const MoneyReceiptTemplate: React.FC<{}> = () => {
  const {width, height} = useWindowDimensions();
  const {moneyReceiptTemplateHtml} = useAppSelector(state => state.Order);
  console.log('moneyReceiptTemplateHtml--', moneyReceiptTemplateHtml);

//   return (
//     <ScrollView contentInsetAdjustmentBehavior="automatic">
//       <RenderHtml
//         contentWidth={width}
//         source={{html: moneyReceiptTemplateHtml}}
//       />
//     </ScrollView>
//   );

    return (
      <WebView
        originWhitelist={['*']}
        source={{html: moneyReceiptTemplateHtml}}
        style={{width:width, height: height}}
      />
    );
};

export default MoneyReceiptTemplate;
