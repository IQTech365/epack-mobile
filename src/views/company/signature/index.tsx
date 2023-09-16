import React, {useCallback, useRef, useState} from 'react';
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
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import Button from '../../../common/Button';
import Alert, {STATUS_CODE} from '../../../common/Alert';
import { Validator } from '../../../utils/validation';

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
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const SignatureViewPage: React.FC<ISignatureViewProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const {state, setOwnerSignature} = useCompanyRegistrationContextHook();
  const [signatureUri, setSignatureUri] = useState<any>(state.ownerSignature);
  const [isBase64Image, setIsBase64Image] = useState<boolean>(false);
  const [showSignatureRequiredAlert, setShowSignatureRequiredAlert] = useState<boolean>(false);
  const signatureRef = useRef();

  const _onSaveEvent = (result: any) => {
    console.log(result);
    setSignatureUri(result?.encoded);
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

  const handlePreviousClick = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [state]);

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      if(Validator.isEmpty(state.ownerSignature)) {
        setShowSignatureRequiredAlert(true);
      } else {
        setShowSignatureRequiredAlert(false);
        setCurrentStep(currentStep + 1);
      }
    }
  }, [state]);

  const handleAlertPress = () => {
    setShowSignatureRequiredAlert(false);
  }

  const signature = isBase64Image
    ? {uri: `data:image/png;base64,${signatureUri}`}
    : {uri: signatureUri};

  return (
    <>
      <View style={style.container}>
        <View style={style.contentContainer}>
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
              <TouchableOpacity
                style={style.button}
                onPress={handleLaunchCamera}>
                <Text style={style.text}>Camera</Text>
                <Spacer width={10} />
                <CameraIcon width={30} height={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.button}
                onPress={handleLaunchGallery}>
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
              {signature.uri ? (
                <Image source={signature} style={style.sign} />
              ) : (
                <Text>Signature Preview</Text>
              )}
            </View>
          </View>
        </View>
        <View style={style.buttonContainer}>
          <View style={style.prevButtonContainer}>
            {currentStep > 1 ? (
              <Button
                text="Previous"
                onPress={handlePreviousClick}
                style={style.buttonStyle2}
                textStyle={style.buttonTextStyle}
              />
            ) : null}
          </View>
          <View style={style.nextButtonContainer}>
            <Button
              text={currentStep == 5 ? 'Save' : 'Next'}
              onPress={handleNextClick}
              style={style.buttonStyle2}
              textStyle={style.buttonTextStyle}
            />
          </View>
        </View>
      </View>
      {showSignatureRequiredAlert ? <Alert
        variant={STATUS_CODE.ERROR}
        message="Please provide your signature"
        onPress={handleAlertPress}
        visible={showSignatureRequiredAlert}
      /> : null}
    </>
  );
};

export default SignatureViewPage;
