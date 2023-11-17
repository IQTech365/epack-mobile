import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {Validator} from '../../../utils/validation';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  resetUploadSignatureRequest,
  uploadSignatureRequest,
} from '../../../redux/slices/CompanySlice';
import {
  setAuthToken,
  setIsRegistrationComplete,
  setLoginStatus,
} from '../../../utils/storage';
import Spinner from '../../../common/Spinner';
import Toast from 'react-native-toast-message';
import { useAuthContext } from '../../../provider/AuthProvider';

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
  const [imageFile, setImageFile] = useState<any>(null);
  const [isBase64Image, setIsBase64Image] = useState<boolean>(false);
  const [showSignatureRequiredAlert, setShowSignatureRequiredAlert] =
    useState<boolean>(false);
  const signatureRef = useRef();
  const dispatch = useAppDispatch();
  const {verifiedData} = useAppSelector(state => state.OTP);
  const {
    uploadSignatureRequesting,
    uploadSignatureSuccess,
    uploadSignatureFailure,
    uploadSignatureError,
  } = useAppSelector(state => state.Company);

  const {addCompanyInfo, companies} = useAppSelector(state => state.Company);

  const authContext = useAuthContext();
  const {setLoggedIn} = authContext;

  const getCompanyId = () => {
    let id;
    const {data} = addCompanyInfo || {};
    const {data: companiesData} = companies || {};
    if (data && Object.keys(data).length > 0) {
      id = data._id;
    } else if (
      companiesData &&
      Array.isArray(companiesData) &&
      companiesData.length > 0
    ) {
      const firstCompany = companiesData[0];
      id = firstCompany._id;
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
      id = companiesData._id;
    }
    return id;
  };

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
          setImageFile(imageObj);
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
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setSignatureUri(imageObj.uri as string);
          setOwnerSignature(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handlePreviousClick = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [state]);

  const completeRegistrationAndLoggedIn = async () => {
    await setIsRegistrationComplete();
    await setLoginStatus();
    await setAuthToken(verifiedData?.data?.token as string);
    setLoggedIn(true);
  }

  const handleUploadClick = useCallback(() => {
    if (Validator.isEmpty(state.ownerSignature)) {
      setShowSignatureRequiredAlert(true);
    } else {
      const formData = new FormData();
      formData.append('companySignature', {
        uri: imageFile?.uri,
        type: imageFile?.type,
        name: imageFile?.fileName,
      });
      formData.append('id', getCompanyId());
      // formData.append('id', '6511695bad8a273529a2a59a');
      dispatch(uploadSignatureRequest(formData));
    }
  }, [state]);

  const handleAlertPress = () => {
    setShowSignatureRequiredAlert(false);
  };

  const signature = isBase64Image
    ? {uri: `data:image/png;base64,${signatureUri}`}
    : {uri: signatureUri};

  useEffect(() => {
    if (!uploadSignatureRequesting && uploadSignatureSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Signature Upload',
        text2: 'Signature has been added successfully',
      });
      dispatch(resetUploadSignatureRequest());
      completeRegistrationAndLoggedIn();
    } else if (!uploadSignatureRequesting && uploadSignatureFailure) {
      console.log('Error in uploading signature. Try again!');
      Toast.show({
        type: 'error',
        text1: 'Signature Upload',
        text2: 'Error in Uploading Signature. Please try again!',
      });
      dispatch(resetUploadSignatureRequest());
    }
  }, [
    uploadSignatureRequesting,
    uploadSignatureSuccess,
    uploadSignatureFailure,
  ]);

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
              text="Upload"
              onPress={handleUploadClick}
              style={style.buttonStyle2}
              textStyle={style.buttonTextStyle}
            />
          </View>
        </View>
      </View>
      {showSignatureRequiredAlert ? (
        <Alert
          variant={STATUS_CODE.ERROR}
          message="Please provide your signature"
          onPress={handleAlertPress}
          visible={showSignatureRequiredAlert}
        />
      ) : null}
      <Spinner show={uploadSignatureRequesting} />
    </>
  );
};

export default SignatureViewPage;
