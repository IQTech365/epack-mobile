import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import CameraIcon from '../../images/icons/camera.svg';
import GalleryIcon from '../../images/icons/gallery.svg';
import CloseIcon from '../../images/icons/x-circle.svg';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Button from '../Button';
import {
  imageUploadRequest,
  resetImageUploadRequest,
} from '../../redux/slices/CommonSlice';
import Spinner from '../Spinner';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {COLOR_BLACK, COLOR_GREEN} from '../../utils/colors';
import { ToastType, showToast } from '../../utils/utility';

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

export enum DOCUMENT {
  COMPANY_LOGO,
  COMPANY_SIGNATURE,
}

export interface IProps {
  onUploadSuccess: (imagePath: string) => void;
  previousImageUri: string;
  onChageImage: () => void;
}

const CommonPhotoUploadView: React.FC<IProps> = ({
  onUploadSuccess,
  previousImageUri,
  onChageImage
}) => {
  const {
    imageUploading,
    imageUploadSuccess,
    imageUploadFailure,
    uploadedImage,
  } = useAppSelector(state => state.Common);
  const dispatch = useAppDispatch();
  const [tempImageUri, setTempImageUri] = useState<string>(previousImageUri);
  const [imageFile, setImageFile] = useState<any>(null);
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: COLOR_GREEN}}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: '300',
          color: COLOR_BLACK,
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 15}}
        contentContainerProps={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 16,
          fontWeight: '300',
          color: COLOR_BLACK,
        }}
      />
    ),
  };

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
          setTempImageUri(imageObj.uri as string);
          setShowUploadButton(true);
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
          setTempImageUri(imageObj.uri as string);
          setShowUploadButton(true);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleChangeImage = () => {
    setImageFile(null);
    setTempImageUri('');
    onChageImage && onChageImage();
  };

  const handleUploadImage = () => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageFile?.uri,
      type: imageFile?.type,
      name: imageFile?.fileName,
    });
    dispatch(imageUploadRequest(formData));
  };

  const _showPhotoChooserView = () => {
    return (
      <View style={styles.photoCaptureContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLaunchGallery}>
          <>
            <Text style={styles.text}>Gallery</Text>
            <GalleryIcon width={50} height={50} />
          </>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
          <>
            <Text style={styles.text}>Camera</Text>
            <CameraIcon width={50} height={50} />
          </>
        </TouchableOpacity>
      </View>
    );
  };

  const _showPhotoView = (uri: string) => {
    return (
      <View style={styles.photoContainer}>
        <View style={styles.changeImageIconContainer}>
          <TouchableOpacity onPress={handleChangeImage} activeOpacity={0.4}>
            <CloseIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        <Image source={{uri: uri}} style={styles.avatarImage} />
        {showUploadButton ? (
          <Button
            text="Upload"
            onPress={handleUploadImage}
            style={styles.uploadButton}
            textStyle={styles.uploadText}
          />
        ) : null}
      </View>
    );
  };

  const _PhotoView = () => {
    if (!tempImageUri) {
      return _showPhotoChooserView();
    } else {
      return _showPhotoView(_getUploadedImagePath() || tempImageUri);
    }
  };

  useEffect(() => {
    setTempImageUri(previousImageUri);
  }, [previousImageUri]);

  useEffect(() => {
    if (!imageUploading && imageUploadSuccess) {
      const imagePath = _getUploadedImagePath();
      onUploadSuccess && onUploadSuccess(imagePath);
      setImageFile(null);
      setShowUploadButton(false);
      dispatch(resetImageUploadRequest());
      showToast("Image Upload successful.", ToastType.SUCCESS);
    } else if (!imageUploading && imageUploadFailure) {
      setImageFile(null);
      setShowUploadButton(false);
      dispatch(resetImageUploadRequest());
      showToast("Image Upload Failed. Try again!", ToastType.ERROR);
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  return (
    <>
      {_PhotoView()}
      <Spinner show={imageUploading} />
      <Toast config={toastConfig} visibilityTime={2000} />
    </>
  );
};

export default CommonPhotoUploadView;
