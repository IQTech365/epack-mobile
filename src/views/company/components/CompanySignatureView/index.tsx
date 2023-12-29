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
import CameraIcon from '../../../../images/icons/camera.svg';
import GalleryIcon from '../../../../images/icons/gallery.svg';
import Spacer from '../../../../common/Spacer';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {useCompanyRegistrationContextHook} from '../../../../provider/CompanyRegistrationContextProvider';
import Button from '../../../../common/Button';
import Alert, {STATUS_CODE} from '../../../../common/Alert';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  editCompanyRequest,
  reseteditCompanyRequest,
} from '../../../../redux/slices/CompanySlice';
import {
  setAuthToken,
  setIsRegistrationComplete,
  setLoginStatus,
} from '../../../../utils/storage';
import Spinner from '../../../../common/Spinner';
import {useAuthContext} from '../../../../provider/AuthProvider';
import useCompanyId from '../../../../hooks/useCompanyId';
import {ToastType, showToast} from '../../../../utils/utility';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLUE, COLOR_WHITE} from '../../../../utils/colors';
import {signatureOptions} from '../../utils';
import CloseIcon from '../../../../images/icons/x-circle.svg';
import {ICompanyEditRequest} from '../../../../interface/companyRegistration/ICompanyEditRequest';
import {
  imageUploadRequest,
  resetImageUploadRequest,
} from '../../../../redux/slices/CommonSlice';
import useAuthId from '../../../../hooks/useAuthId';

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
  const {state, setCompanySignature} = useCompanyRegistrationContextHook();
  const [signatureUri, setSignatureUri] = useState<any>(
    state.company_signature_url,
  );
  const [imageFile, setImageFile] = useState<any>(null);
  const [showSignatureRequiredAlert, setShowSignatureRequiredAlert] =
    useState<boolean>(false);
  const signatureRef = useRef();
  const dispatch = useAppDispatch();
  const {verifiedData} = useAppSelector(state => state.OTP);
  const [signatureType, setSignatureType] = useState<string>(
    signatureOptions[0],
  );
  const [isDigitalSignatureProvided, setIsDigitalSignatureProvided] =
    useState<boolean>(false);

  const companyId = useCompanyId();
  const authId = useAuthId();
  const authContext = useAuthContext();
  const {setLoggedIn} = authContext;

  const {
    companies,
    editCompanyRequesting,
    editCompanySuccess,
    editCompanyFailure,
  } = useAppSelector(state => state.Company);

  const {
    imageUploading,
    imageUploadSuccess,
    imageUploadFailure,
    uploadedImage,
  } = useAppSelector(state => state.Common);

  const _getUploadedImagePath = () => {
    let path: string = '';
    const {data} = uploadedImage || {};
    if (data && data.hasOwnProperty('Location')) {
      path = data?.Location;
    }
    return path;
  };

  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      console.log('Camera-result----', JSON.stringify(result));
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setSignatureUri(imageObj.uri as string);
          setCompanySignature(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in launching camera--', error);
    }
  };

  const handleLaunchGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      console.log('Gallery-result----', JSON.stringify(result));
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setSignatureUri(imageObj.uri as string);
          setCompanySignature(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const completeRegistrationAndLoggedIn = async () => {
    await setIsRegistrationComplete();
    await setLoginStatus();
    await setAuthToken(verifiedData?.data?.token as string);
    setLoggedIn(true);
  };

  const handleAlertPress = () => {
    setShowSignatureRequiredAlert(false);
  };

  const handleCompanySignatureUriUpdate = () => {
    const imagePath = _getUploadedImagePath();
    const payload: ICompanyEditRequest = {
      _id: companyId,
      authId: authId,
      companyName: state.company_name,
      contactPerson: state.contact_person,
      email: state.email,
      companyMobile: state.mobile,
      companyAddress: state.address,
      state: state.state,
      city: state.city,
      pincode: state.pincode,
      companyWebite: 'abc@xyz.com',
      companyLogo: state.company_logo_url,
      punchLine: '',
      companyProfile: '',
      district: '',
      postOffice: '',
      companySignature: imagePath,
    };
    dispatch(editCompanyRequest(payload));
  };

  const handleUploadClick = useCallback(() => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageFile?.uri,
      type: imageFile?.type,
      name: imageFile?.fileName,
    });
    dispatch(imageUploadRequest(formData));
  }, [state]);

  useEffect(() => {
    if (!imageUploading && imageUploadSuccess) {
      setImageFile(null);
      showToast('Image Upload successful.', ToastType.SUCCESS);
      handleCompanySignatureUriUpdate();
    } else if (!imageUploading && imageUploadFailure) {
      setImageFile(null);
      dispatch(resetImageUploadRequest());
      showToast('Image Upload Failed. Try again!', ToastType.ERROR);
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  useEffect(() => {
    if (!editCompanyRequesting && editCompanySuccess) {
      showToast('Company Info updated successful.', ToastType.SUCCESS);
      dispatch(resetImageUploadRequest());
      dispatch(reseteditCompanyRequest());
      completeRegistrationAndLoggedIn();
      // onClose();
    } else if (!editCompanyRequesting && editCompanyFailure) {
      showToast('Company Info update failed. Try again!', ToastType.ERROR);
      dispatch(resetImageUploadRequest());
      dispatch(reseteditCompanyRequest());
    }
  }, [editCompanyRequesting, editCompanySuccess, editCompanyFailure]);

  const handleChangeImage = () => {
    setSignatureUri('');
  };

  const handleGoBack = () => {
    setCurrentStep(currentStep - 1);
  }

  const _showImageView = () => {
    return (
      <>
        <View style={style.imageContainer}>
          <View style={style.closeIconContainer}>
            <TouchableOpacity onPress={handleChangeImage}>
              <CloseIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
          <Image source={{uri: signatureUri}} style={style.image} />
        </View>
        <View style={style.buttonContainer}>
          <Spacer height={8} />
          <Button
            text="Upload"
            onPress={handleUploadClick}
            style={style.buttonStyle2}
            textStyle={style.buttonText}
          />
        </View>
      </>
    );
  };

  const _showImageUploadChooserView = () => {
    if (signatureUri) {
      return _showImageView();
    }
    return (
      <>
        <View style={style.rowContainer}>
          <TouchableOpacity style={style.button} onPress={handleLaunchCamera}>
            <>
              <Text style={style.text}>Camera</Text>
              <Spacer width={2} />
              <CameraIcon width={30} height={30} />
            </>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={handleLaunchGallery}>
            <>
              <Text style={style.text}>Gallery</Text>
              <Spacer width={2} />
              <GalleryIcon width={30} height={30} />
            </>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const _showDigitalSignatureCaptureView = () => {
    return (
      <>
        <View style={style.signatureWrapper}>
          <SignatureCapture
            style={style.signature}
            ref={signatureRef}
            onSaveEvent={(result: any) => {
              console.log(result);
              if (!isDigitalSignatureProvided) {
                setShowSignatureRequiredAlert(true);
              } else {
                const formData = new FormData();
                formData.append('image', {
                  uri: `file://${result?.pathName}`,
                  type: 'image/png',
                  name: 'signature.png',
                });
                dispatch(imageUploadRequest(formData));
              }
            }}
            onDragEvent={() => {
              console.log('dragged');
              setIsDigitalSignatureProvided(true);
            }}
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
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={style.uploadButtonStyle}
            onPress={() => {
              //@ts-ignore
              signatureRef && signatureRef.current?.saveImage();
            }}>
            <Text style={style.text2}>Upload</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={style.resetButtonStyle}
            onPress={() => {
              //@ts-ignore
              signatureRef && signatureRef.current?.resetImage();
              setIsDigitalSignatureProvided(false);
            }}>
            <Text style={style.text2}>Reset</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={style.container}>
        <Text style={style.titleText}>
          Please select signature type you want to uplod.
        </Text>
        <Spacer height={10} />
        <View style={style.checkboxContainer}>
          {signatureOptions.map((itm, index) => {
            return (
              <BouncyCheckbox
                key={itm}
                size={25}
                unfillColor={COLOR_WHITE}
                text={itm}
                fillColor={COLOR_BLUE}
                iconStyle={style.iconStyle}
                innerIconStyle={style.innerIconStyle}
                textStyle={style.textStyle2}
                style={{marginRight: 15, marginBottom: 10}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setSignatureUri('');
                  setSignatureType(itm);
                }}
                isChecked={signatureType == itm}
                disableBuiltInState={true}
              />
            );
          })}
        </View>
        <Spacer height={10} />
        {signatureType == signatureOptions[0]
          ? _showDigitalSignatureCaptureView()
          : _showImageUploadChooserView()}
        <Spacer />
        <View style={style.buttonContainer}>
          <Spacer height={8} />
          <Button
            text="Go Back"
            variant="contain"
            onPress={handleGoBack}
            style={style.goBackButtonStyle}
            // textStyle={style.buttonText}
          />
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
      <Spinner show={imageUploading || editCompanyRequesting} />
    </>
  );
};

export default SignatureViewPage;
