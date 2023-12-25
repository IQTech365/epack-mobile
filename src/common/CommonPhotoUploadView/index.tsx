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

export interface IProps {
  onUploadSuccess: (imagePath: string) => void;
  previousImageUri: string;
}

const CommonPhotoUploadView: React.FC<IProps> = ({onUploadSuccess, previousImageUri}) => {
    console.log('previousImageUri----', previousImageUri);
    
  const {
    imageUploading,
    imageUploadSuccess,
    imageUploadFailure,
    uploadedImage,
  } = useAppSelector(state => state.Common);
  const dispatch = useAppDispatch();
  const [tempImageUri, setTempImageUri] = useState<string>(previousImageUri);
  const [imageFile, setImageFile] = useState<any>(null);

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
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleChangeImage = () => {
    setImageFile(null);
    setTempImageUri('');
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
            <Text>Gallery</Text>
            <GalleryIcon width={50} height={50} />
          </>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
          <>
            <Text>Camera</Text>
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
        <Button
          text="Upload"
          onPress={handleUploadImage}
          style={styles.uploadButton}
          textStyle={styles.uploadText}
        />
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
  }, []);

  useEffect(() => {
    if (!imageUploading && imageUploadSuccess) {
      console.log('uploadedImage-----', JSON.stringify(uploadedImage));
      const imagePath = _getUploadedImagePath();
      onUploadSuccess && onUploadSuccess(imagePath);
      setImageFile(null);
      dispatch(resetImageUploadRequest());
    } else if (!imageUploading && imageUploadFailure) {
      setImageFile(null);
      dispatch(resetImageUploadRequest());
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  useEffect(() => {
    return setTempImageUri('');
  }, []);

  return <>{_PhotoView()}</>;
};

export default CommonPhotoUploadView;
