import React, {useCallback, useState} from 'react';
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
  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
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
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      // validateRegistrationForm();
      setCurrentStep(currentStep + 1);
    }
  }, []);

  const handlePreviousClick = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Spacer />
        <View>
          <Text style={styles.titleText}>Select Company Logo</Text>
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
            <GalleryIcon width={50} height={50} />
          </TouchableOpacity>
        </View>
        <View style={styles.cameraContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
            <CameraIcon width={50} height={50} />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.buttonContainer}>
          <View style={styles.prevButtonContainer}>
            {currentStep > 1 ? (
              <Button
                text="Previous"
                onPress={handlePreviousClick}
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
    </View>
  );
};

export default CompanyLogoPageView;
