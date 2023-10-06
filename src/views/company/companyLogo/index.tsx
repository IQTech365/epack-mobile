import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import LogoPlaceholder from '../../../images/logo_placeholder.png';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import CameraIcon from '../../../images/icons/camera.svg';
import GalleryIcon from '../../../images/icons/gallery.svg';
import Spacer from '../../../common/Spacer';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import Button from '../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { resetUploadCompanyLogoRequest, uploadCompanyLogoRequest } from '../../../redux/slices/CompanySlice';
import Spinner from '../../../common/Spinner';
import Toast from 'react-native-toast-message';

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

interface ICompanyLogoPageViewProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const CompanyLogoPageView: React.FC<ICompanyLogoPageViewProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const {state, setCompanyLogo: setCompanyLogo2} =
    useCompanyRegistrationContextHook();
  const [companyLogo, setCompanyLogo] = useState<string>(state.companyLogo);
  const [imageFile, setImageFile] = useState<any>(null);
  
  const {
    uploadLogoRequesting,
    uploadLogoSuccess,
    uploadLogoFailure,
    addCompanyInfo,
  } = useAppSelector(state => state.Company);

  const getCompanyId = () => {
    let id;
    const {data} = addCompanyInfo || {};
    if(data && Object.keys(data).length > 0) {
      id = data._id;
    }
    return id;
  }
  
  const dispatch = useAppDispatch();
  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setCompanyLogo(imageObj.uri as string);
          setCompanyLogo2(imageObj.uri as string);
        }
      }
      console.log('Camera-result----', JSON.stringify(result));
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
          setCompanyLogo(imageObj.uri as string);
          setCompanyLogo2(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [state]);

  const handleUploadClick = useCallback(() => {
    const formData = new FormData();
        formData.append('companyLogo', {
          uri: imageFile?.uri,
          type: imageFile?.type,
          name: imageFile?.fileName,
        });
        formData.append('id', getCompanyId());
        // formData.append('id', '6511695bad8a273529a2a59a');
        dispatch(uploadCompanyLogoRequest(formData));
  }, [state]);

  useEffect(() => {
    if(!uploadLogoRequesting && uploadLogoSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Company Logo Upload',
        text2: 'Company Logo has been added successfully'
      });
      dispatch(resetUploadCompanyLogoRequest());
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 3000);
    } else if(!uploadLogoRequesting && uploadLogoFailure) {
      Toast.show({
        type: 'error',
        text1: 'Company Logo Upload',
        text2: 'Error in Uploading Company Logo. Please try again!'
      });
      dispatch(resetUploadCompanyLogoRequest());
    }
  }, [uploadLogoRequesting, uploadLogoSuccess, uploadLogoFailure]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Spacer />
        <View>
          <Text style={styles.titleText}>Upload Company Logo</Text>
        </View>
        <Spacer />
        <View style={styles.logoContainer}>
          {companyLogo ? (
            <Image
              source={companyLogo ? {uri: companyLogo} : LogoPlaceholder}
              style={styles.logo}
            />
          ) : (
            <Text>Company Logo Preview</Text>
          )}
        </View>
        <Spacer />
        <View style={styles.galleryContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLaunchGallery}>
            <>
            <Text>Pick from Gallery</Text>
            <GalleryIcon width={50} height={50} />
            </>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
            <>
            <Text>Take from Camera</Text>
            <CameraIcon width={50} height={50} />
            </>
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.buttonContainer}>
          <View style={styles.prevButtonContainer}>
            {currentStep > 1 ? (
              <Button
                text="Upload"
                onPress={handleUploadClick}
                style={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
              />
            ) : null}
          </View>
          <View style={styles.nextButtonContainer}>
            <Button
              text={currentStep == 5 ? 'Save' : 'Next'}
              onPress={handleNextClick}
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        </View>
        <Spinner show={uploadLogoRequesting} />
    </View>
  );
};

export default CompanyLogoPageView;
