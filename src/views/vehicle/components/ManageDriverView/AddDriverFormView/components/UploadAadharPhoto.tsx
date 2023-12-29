import React, { useEffect, useState } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
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
import {useAddDriverFormContextHook} from '../../../../../../provider/AddDriverFormContextProvider';
import Label from '../../../../../../common/Label';
import Button from '../../../../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { imageUploadRequest, resetImageUploadRequest } from '../../../../../../redux/slices/CommonSlice';
import { ToastType, showToast } from '../../../../../../utils/utility';

export enum AADHAR {
  FRONT,
  BACK,
}

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
  imageSide: AADHAR;
}

const UploadAadharPhoto: React.FC<IProps> = ({imageSide}) => {
  const {
    state,
    setAadharFrontPhoto,
    setAadharFrontPhotoFile,
    setAaadharBackPhoto,
    setAaadharBackPhotoFile,
  } = useAddDriverFormContextHook();

  const dispatch = useAppDispatch();

  const {
    imageUploading,
    imageUploadSuccess,
    imageUploadFailure,
    uploadedImage,
  } = useAppSelector(state => state.Common);
  const [isAadharFront, setIsAadharFront] = useState<boolean>(false);
  const [isAadharBack, setIsAadharBack] = useState<boolean>(false);

  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      console.log('Camera-result----', JSON.stringify(result));
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          if (imageSide == AADHAR.FRONT) {
            setAadharFrontPhotoFile(imageObj);
            setAadharFrontPhoto(imageObj.uri as string);
          } else if (imageSide == AADHAR.BACK) {
            setAaadharBackPhotoFile(imageObj);
            setAaadharBackPhoto(imageObj.uri as string);
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
          if (imageSide == AADHAR.FRONT) {
            setAadharFrontPhotoFile(imageObj);
            setAadharFrontPhoto(imageObj.uri as string);
          } else if (imageSide == AADHAR.BACK) {
            setAaadharBackPhotoFile(imageObj);
            setAaadharBackPhoto(imageObj.uri as string);
          }
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleChangeImage = () => {
    if (imageSide == AADHAR.FRONT) {
      setAadharFrontPhoto('');
      setAadharFrontPhotoFile(null);
    } else if (imageSide == AADHAR.BACK) {
      setAaadharBackPhoto('');
      setAaadharBackPhotoFile(null);
    }
  };

  const _showAadharImageChooserView = (label: string) => {
    return (
      <View style={styles.photoItemWrapper}>
        <Label text={label} style={styles.labelText} />
        <View style={styles.photoItemContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLaunchGallery}>
            <>
              <Text>Gallery</Text>
              <GalleryIcon width={35} height={35} />
            </>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
            <>
              <Text>Camera</Text>
              <CameraIcon width={35} height={35} />
            </>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleUploadImage = () => {
    const formData = new FormData();
    if(imageSide == AADHAR.FRONT) {
      setIsAadharFront(true);
      setIsAadharBack(false);
      formData.append('image', {
        uri: state.aadhar_front_photo_file?.uri,
        type: state.aadhar_front_photo_file?.type,
        name: state.aadhar_front_photo_file?.fileName,
      })
    } else if(imageSide == AADHAR.BACK) {
      setIsAadharFront(false);
      setIsAadharBack(true);
      formData.append('image', {
        uri: state.aadhar_back_photo_file?.uri,
          type: state.aadhar_back_photo_file?.type,
          name: state.aadhar_back_photo_file?.fileName,
      })
    }
    dispatch(imageUploadRequest(formData));
  }

  const _showPhotoView = (uri: string) => {
    return (
      <View style={styles.imageItemWrapper}>
        <View style={styles.imageItemWrapper2}>
          <View style={styles.photoContainer2}>
            <View style={styles.changeImageIconContainer}>
              <TouchableOpacity onPress={handleChangeImage} activeOpacity={0.4}>
                <CloseIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
            <Image source={{uri: uri}} style={styles.avatarImage} />
          </View>
        </View>
        <Button
          text="Upload"
          onPress={handleUploadImage}
          style={styles.uploadButton}
          textStyle={styles.uploadText}
        />
      </View>
    );
  };

  const _getUploadedImagePath = () => {
    let path:string = '';
    const {data} = uploadedImage || {};
    if(data && data.hasOwnProperty('Location')) {
      path = data?.Location;
    }
    return path;
  }

  const _PhotoView = () => {
    if (imageSide == AADHAR.FRONT) {
      if (!state.aadhar_front_photo) {
        return _showAadharImageChooserView('Front Side');
      } else {
        return _showPhotoView(state.aadhar_front_photo);
      }
    } else if (imageSide == AADHAR.BACK) {
      if (!state.aadhar_back_photo) {
        return _showAadharImageChooserView('Back Side');
      } else {
        return _showPhotoView(state.aadhar_back_photo);
      }
    }
  };

  useEffect(() => {
    if(!imageUploading && imageUploadSuccess) {
      console.log('uploadedImage-----', JSON.stringify(uploadedImage));
      if(imageSide == AADHAR.FRONT && isAadharFront) {
        const aadharFrontImagePath = _getUploadedImagePath();
        setAadharFrontPhoto(aadharFrontImagePath);
      } else if(imageSide == AADHAR.BACK && isAadharBack) {
        const aadharBackImagePath = _getUploadedImagePath();
        setAaadharBackPhoto(aadharBackImagePath);
      }
      setIsAadharFront(false);
      setIsAadharBack(false);
      showToast("Image upload successful.", ToastType.SUCCESS);
      dispatch(resetImageUploadRequest());
    } else if(!imageUploading && imageUploadFailure) {
      setIsAadharFront(false);
      setIsAadharBack(false);
      dispatch(resetImageUploadRequest());
      showToast("Image upload failed. Try again!", ToastType.ERROR);
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  return <>{_PhotoView()}</>;
};

export default UploadAadharPhoto;
