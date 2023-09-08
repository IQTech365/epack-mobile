import React, {useRef} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import style from './style';

interface ISignatureViewProps {
  //
}

const SignatureViewPage: React.FC<ISignatureViewProps> = ({}) => {
  const signatureRef = useRef();

  const _onSaveEvent = (result:any) => {
    console.log(result);
  };

  const _onDragEvent = () => {
    console.log("dragged");
  };

  const saveSign = () => {
    //@ts-ignore
    signatureRef.current?.saveImage();
  };

  const resetSign = () => {
    //@ts-ignore
    signatureRef.current?.resetImage();
  };

  return (
    <>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={{alignItems: 'center', justifyContent: 'center'}}>
          Signature Capture Extended{' '}
        </Text>
        <SignatureCapture
          style={[{flex: 1}, style.signature]}
          ref={signatureRef}
          onSaveEvent={_onSaveEvent}
          onDragEvent={_onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          backgroundColor="#ff00ff"
          strokeColor="#ffffff"
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode={'portrait'}
        />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableHighlight
            style={style.buttonStyle}
            onPress={() => {
              saveSign();
            }}>
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={style.buttonStyle}
            onPress={() => {
              resetSign();
            }}>
            <Text>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

export default SignatureViewPage;
