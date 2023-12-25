import React, { useEffect, useState } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import Label from '../../../../../../common/Label';
import CameraIcon from '../../../../../../images/icons/camera.svg';
import GalleryIcon from '../../../../../../images/icons/gallery.svg';
import CloseIcon from '../../../../../../images/icons/x-circle.svg';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import Spacer from '../../../../../../common/Spacer';
import {useAddDriverFormContextHook} from '../../../../../../provider/AddDriverFormContextProvider';
import Button from '../../../../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { imageUploadRequest, resetImageUploadRequest } from '../../../../../../redux/slices/CommonSlice';
import Spinner from '../../../../../../common/Spinner';

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

export enum PHOTO {
  DRIVER,
  LICENSE,
}

interface Props {
  title: string;
  photo: PHOTO;
}

const UploadPhotoView: React.FC<Props> = ({title, photo}) => {
  const {
    state,
    setDriverPhoto,
    setDriverPhotoFile,
    setLicensePhoto,
    setLicensePhotoFile,
  } = useAddDriverFormContextHook();

  const {
    imageUploading,
    imageUploadSuccess,
    imageUploadFailure,
    uploadedImage,
  } = useAppSelector(state => state.Common);
  const dispatch = useAppDispatch();
  const [isDriverPhoto, setIsDriverPhoto] = useState<boolean>(false);
  const [isLicensePhoto, setIsLicensePhoto] = useState<boolean>(false);

  const _getUploadedImagePath = () => {
    let path:string = '';
    const {data} = uploadedImage || {};
    if(data && data.hasOwnProperty('Location')) {
      path = data?.Location;
    }
    return path;
  }

  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        console.log('Camera-result----', JSON.stringify(result));
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          if (photo == PHOTO.DRIVER) {
            setDriverPhotoFile(imageObj);
            setDriverPhoto(imageObj.uri as string);
          } else if (photo == PHOTO.LICENSE) {
            setLicensePhotoFile(imageObj);
            setLicensePhoto(imageObj.uri as string);
          }
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
          if (photo == PHOTO.DRIVER) {
            setDriverPhotoFile(imageObj);
            setDriverPhoto(imageObj.uri as string);
          } else if (photo == PHOTO.LICENSE) {
            setLicensePhotoFile(imageObj);
            setLicensePhoto(imageObj.uri as string);
          }
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleChangeImage = () => {
    if (photo == PHOTO.DRIVER) {
      setDriverPhotoFile(null);
      setDriverPhoto('');
    } else if (photo == PHOTO.LICENSE) {
      setLicensePhotoFile(null);
      setLicensePhoto('');
    }
  };

  const handleUploadImage = () => {
    const formData = new FormData();
    if(photo == PHOTO.DRIVER) {
      setIsDriverPhoto(true);
      setIsLicensePhoto(false);
      formData.append('image', {
        uri: state.driver_photo_file?.uri,
        type: state.driver_photo_file?.type,
        name: state.driver_photo_file?.fileName,
      })
    } else if(photo == PHOTO.LICENSE) {
      setIsDriverPhoto(false);
      setIsLicensePhoto(true);
      formData.append('image', {
        uri: state.license_photo_file?.uri,
          type: state.license_photo_file?.type,
          name: state.license_photo_file?.fileName,
      })
    }
    dispatch(imageUploadRequest(formData));
  }

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
          // variant="contain"
          onPress={handleUploadImage}
          style={styles.uploadButton}
          textStyle={styles.uploadText}
        />
      </View>
    );
  };

  const _PhotoView = () => {
    if (photo == PHOTO.DRIVER) {
      if (!state.driver_photo) {
        return _showPhotoChooserView();
      } else {
        return _showPhotoView(state.driver_photo);
      }
    } else if (photo == PHOTO.LICENSE) {
      if (!state.license_photo) {
        return _showPhotoChooserView();
      } else {
        return _showPhotoView(state.license_photo);
      }
    }
  };

  useEffect(() => {
    if(!imageUploading && imageUploadSuccess) {
      console.log('uploadedImage-----', JSON.stringify(uploadedImage));
      if(photo == PHOTO.DRIVER && isDriverPhoto) {
        const driverImagePath = _getUploadedImagePath();
        setDriverPhoto(driverImagePath);
      } else if(photo == PHOTO.LICENSE && isLicensePhoto) {
        const licenseImagePath = _getUploadedImagePath();
        setLicensePhoto(licenseImagePath);
      }
      setIsDriverPhoto(false);
      setIsLicensePhoto(false);
      dispatch(resetImageUploadRequest());
    } else if(!imageUploading && imageUploadFailure) {
      setIsDriverPhoto(false);
      setIsLicensePhoto(false);
      dispatch(resetImageUploadRequest());
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  return (
    <>
      <View style={styles.mainPhotoViewContainer}>
        <Label text={title} style={styles.label} />
      </View>
      <Spacer height={4} />
      {_PhotoView()}
      <Spinner show={imageUploading} />
    </>
  );
};

export default UploadPhotoView;
