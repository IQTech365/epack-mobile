import React, {useEffect, useState} from 'react';
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
import Button from '../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  editCompanyRequest,
  reseteditCompanyRequest,
} from '../../../redux/slices/CompanySlice';
import Spinner from '../../../common/Spinner';
import {ToastType, showToast} from '../../../utils/utility';
import { imageUploadRequest, resetImageUploadRequest } from '../../../redux/slices/CommonSlice';
import { ICompanyEditRequest } from '../../../interface/companyRegistration/ICompanyEditRequest';
import Header from '../../../common/Header';
import { getCurrentCompanyId } from '../../../utils/storage';

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

interface IProps {
}

const CompanyLogoPageView: React.FC<IProps> = (props:any) => {
  const {navigation} = props;
  const [imageFile, setImageFile] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string>('');

  const {
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

  const dispatch = useAppDispatch();
  
  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        console.log('Camera-result----', JSON.stringify(result));
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setImageUri(imageObj.uri as string);
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
          setImageUri(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleCompanyLogoUriUpdate = () => {
    const imagePath = _getUploadedImagePath();
    getCurrentCompanyId().then(id => {
      const payload: ICompanyEditRequest = {
        companyId: id as string,
        payload: {
          companyLogo: imagePath,
        }
      };
      dispatch(editCompanyRequest(payload));
    }).catch(err => {
      console.log('api-error-', err);
    });
  };

  const handleUploadClick = () => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageFile?.uri,
      type: imageFile?.type,
      name: imageFile?.fileName,
    });
    dispatch(imageUploadRequest(formData));
  };

  useEffect(() => {
    if (!imageUploading && imageUploadSuccess) {
      setImageFile(null);
      showToast("Image Upload successful.", ToastType.SUCCESS);
      handleCompanyLogoUriUpdate();
    } else if (!imageUploading && imageUploadFailure) {
      setImageFile(null);
      dispatch(resetImageUploadRequest());
      showToast("Image Upload Failed. Try again!", ToastType.ERROR);
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  useEffect(() => {
    if (!editCompanyRequesting && editCompanySuccess) {
      showToast('Company Info updated successfuly.', ToastType.SUCCESS);
      dispatch(resetImageUploadRequest());
      dispatch(reseteditCompanyRequest());
      navigation.replace("CompanySignature");
    } else if (!editCompanyRequesting && editCompanyFailure) {
      showToast('Company Info update failed. Try again!', ToastType.ERROR);
      dispatch(resetImageUploadRequest());
      dispatch(reseteditCompanyRequest());
    }
  }, [editCompanyRequesting, editCompanySuccess, editCompanyFailure]);

  return (
    <View style={styles.container}>
      <Header canGoBack={false} label="Provide Company Logo" />
      <View style={styles.contentContainer}>
        <Spacer />
        <View>
          <Text style={styles.titleText}>Upload Company Logo</Text>
        </View>
        <Spacer />
        <View style={styles.logoContainer}>
          {imageUri ? (
            <Image
              source={imageUri ? {uri: imageUri} : LogoPlaceholder}
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
        <View style={styles.nextButtonContainer}>
          <Button
            text={'Upload'}
            onPress={handleUploadClick}
            style={styles.skipButtonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
      <Spinner show={imageUploading || editCompanyRequesting} />
    </View>
  );
};

export default CompanyLogoPageView;
