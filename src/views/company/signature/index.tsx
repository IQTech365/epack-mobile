import React, {useReducer, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import style from './style';
import CameraIcon from '../../../images/icons/camera.svg';
import GalleryIcon from '../../../images/icons/gallery.svg';
import Spacer from '../../../common/Spacer';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import { COMPANY_REGISTRATION_ACTION, companyRegistrationReducer, initialState } from '../registrationReducer';
import { useCompanyRegistrationContextHook } from '../../../provider/CompanyRegistrationContextProvider';

interface IOptions {
  mediaType: MediaType;
  maxWidth: number;
  maxHeight: number;
  quality: PhotoQuality;
  cameraType: CameraType;
}

const options: IOptions = {
  mediaType: 'photo',
  maxWidth: 200,
  maxHeight: 200,
  quality: 1,
  cameraType: 'back',
};

interface ISignatureViewProps {
  //
}

const SignatureViewPage: React.FC<ISignatureViewProps> = ({}) => {
  const {state, setOwnerSignature} = useCompanyRegistrationContextHook();
  const [signatureUri, setSignatureUri] = useState<any>(state.ownerSignature);
  const [isBase64Image, setIsBase64Image] = useState<boolean>(false);
  const signatureRef = useRef();
  // const [state, dispatch] = useReducer(
  //   companyRegistrationReducer,
  //   initialState,
  // );
  const _onSaveEvent = (result: any) => {
    console.log(result);
    setSignatureUri(result?.encoded);
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.OWNER_SIGNATURE,
    //   payload: result?.encoded as string,
    // });
    setOwnerSignature(result?.encoded as string);
  };

  const _onDragEvent = () => {
    console.log('dragged');
  };

  const saveSign = () => {
    setIsBase64Image(true);
    //@ts-ignore
    signatureRef.current?.saveImage();
  };

  const resetSign = () => {
    setIsBase64Image(false);
    setSignatureUri('');
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.OWNER_SIGNATURE,
    //   payload: '' as string,
    // });
    setOwnerSignature('' as string);
    //@ts-ignore
    signatureRef.current?.resetImage();
  };

  const handleLaunchCamera = async () => {
    setIsBase64Image(false);
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setSignatureUri(imageObj.uri as string);
          // dispatch({
          //   type: COMPANY_REGISTRATION_ACTION.OWNER_SIGNATURE,
          //   payload: imageObj.uri as string,
          // });
          setOwnerSignature(imageObj.uri as string);
        }
      }
      console.log('Camera-result----', JSON.stringify(result));
    } catch (error) {
      console.log('Error in launching camera--', error);
    }
  };

  const handleLaunchGallery = async () => {
    setIsBase64Image(false);
    try {
      const result = await launchImageLibrary(options);
      console.log('Gallery-result----', JSON.stringify(result));
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const signature = isBase64Image
    ? {uri: `data:image/png;base64,${signatureUri}`}
    : {uri: signatureUri};

  return (
    <>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={style.titleText}>
          Sign below or take your signature photo from Camera or Gallery.
        </Text>
        <Spacer />
        <View style={style.signatureWrapper}>
          <SignatureCapture
            style={style.signature}
            ref={signatureRef}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor="#ffffff"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={'portrait'}
          />
        </View>
        <Spacer />
        <View style={style.rowContainer}>
          <TouchableOpacity style={style.button} onPress={handleLaunchCamera}>
            <Text style={style.text}>Camera</Text>
            <Spacer width={10} />
            <CameraIcon width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={handleLaunchGallery}>
            <Text style={style.text}>Gallery</Text>
            <Spacer width={10} />
            <GalleryIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
        <Spacer />
        <View style={{flexDirection: 'row'}}>
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
        <Spacer />
        <View style={style.signatureImageContainer}>
          {signature.uri ? <Image source={signature} style={style.sign} /> : <Text>Signature Preview</Text>}
        </View>
      </View>
    </>
  );
};

export default SignatureViewPage;
