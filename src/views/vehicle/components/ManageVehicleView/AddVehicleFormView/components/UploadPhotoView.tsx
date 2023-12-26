import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import Label from '../../../../../../common/Label';
import CameraIcon from '../../../../../../images/icons/camera.svg';
import GalleryIcon from '../../../../../../images/icons/gallery.svg';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import Spacer from '../../../../../../common/Spacer';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks';
import {useAddLorryFormContextHook} from '../../../../../../provider/AddLorryFormContextProvider';
import {
  imageUploadRequest,
  resetImageUploadRequest,
} from '../../../../../../redux/slices/CommonSlice';
import Button from '../../../../../../common/Button';
import CloseIcon from '../../../../../../images/icons/x-circle.svg';
import Spinner from '../../../../../../common/Spinner';
import { ToastType, showToast } from '../../../../../../utils/utility';

export enum PHOTO {
  RC,
  POLLUTION_CERT,
  PERMIT_DOC,
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

interface Props {
  title: string;
  photo: PHOTO;
}

const UploadPhotoView: React.FC<Props> = ({title, photo}) => {
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
  const {
    state,
    setVehicleRCPhoto,
    setPollutionCertificatePhoto,
    setPermitPhoto,
  } = useAddLorryFormContextHook();

  const dispatch = useAppDispatch();
  const [isRCPhoto, setIsRCPhoto] = useState<boolean>(false);
  const [isPollCertPhoto, setIsPollCertPhoto] = useState<boolean>(false);
  const [isPermitPhoto, setIsPermitPhoto] = useState<boolean>(false);
  const [rcImageFile, setRcImageFile] = useState<any>(null);
  const [pollCertImageFile, setPollCertImageFile] = useState<any>(null);
  const [permitImageFile, setPermitImageFile] = useState<any>(null);

  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      console.log('Camera-result----', JSON.stringify(result));
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          if (photo == PHOTO.RC) {
            setRcImageFile(imageObj);
            setVehicleRCPhoto(imageObj.uri as string);
          } else if (photo == PHOTO.POLLUTION_CERT) {
            setPollCertImageFile(imageObj);
            setPollutionCertificatePhoto(imageObj.uri as string);
          } else if (photo == PHOTO.PERMIT_DOC) {
            setPermitImageFile(imageObj);
            setPermitPhoto(imageObj.uri as string);
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
          if (photo == PHOTO.RC) {
            setRcImageFile(imageObj);
            setVehicleRCPhoto(imageObj.uri as string);
          } else if (photo == PHOTO.POLLUTION_CERT) {
            setPollCertImageFile(imageObj);
            setPollutionCertificatePhoto(imageObj.uri as string);
          } else if (photo == PHOTO.PERMIT_DOC) {
            setPermitImageFile(imageObj);
            setPermitPhoto(imageObj.uri as string);
          }
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleChangeImage = () => {
    if (photo == PHOTO.RC) {
      setRcImageFile(null);
      setVehicleRCPhoto('');
    } else if (photo == PHOTO.POLLUTION_CERT) {
      setPollCertImageFile(null);
      setPollutionCertificatePhoto('');
    } else if (photo == PHOTO.PERMIT_DOC) {
      setPermitImageFile(null);
      setPermitPhoto('');
    }
  };

  const handleUploadImage = () => {
    const formData = new FormData();
    if (photo == PHOTO.RC) {
      setIsRCPhoto(true);
      setIsPollCertPhoto(false);
      setIsPermitPhoto(false);
      formData.append('image', {
        uri: rcImageFile?.uri,
        type: rcImageFile?.type,
        name: rcImageFile?.fileName,
      });
    } else if (photo == PHOTO.POLLUTION_CERT) {
      setIsRCPhoto(false);
      setIsPollCertPhoto(true);
      setIsPermitPhoto(false);
      formData.append('image', {
        uri: pollCertImageFile?.uri,
        type: pollCertImageFile?.type,
        name: pollCertImageFile?.fileName,
      });
    } else if (photo == PHOTO.PERMIT_DOC) {
      setIsRCPhoto(false);
      setIsPollCertPhoto(false);
      setIsPermitPhoto(true);
      formData.append('image', {
        uri: permitImageFile?.uri,
        type: permitImageFile?.type,
        name: permitImageFile?.fileName,
      });
    }
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
    if (photo == PHOTO.RC) {
      if (!state.vehicle_rc_photo) {
        return _showPhotoChooserView();
      } else {
        return _showPhotoView(state.vehicle_rc_photo);
      }
    } else if (photo == PHOTO.POLLUTION_CERT) {
      if (!state.pollution_certificate_photo) {
        return _showPhotoChooserView();
      } else {
        return _showPhotoView(state.pollution_certificate_photo);
      }
    } else if (photo == PHOTO.PERMIT_DOC) {
      if (!state.permit_photo) {
        return _showPhotoChooserView();
      } else {
        return _showPhotoView(state.permit_photo);
      }
    }
  };

  useEffect(() => {
    if (!imageUploading && imageUploadSuccess) {
      console.log('uploadedImage-----', JSON.stringify(uploadedImage));
      if (photo == PHOTO.RC && isRCPhoto) {
        const rcImagePath = _getUploadedImagePath();
        setVehicleRCPhoto(rcImagePath);
      } else if (photo == PHOTO.POLLUTION_CERT && isPollCertPhoto) {
        const pollCertImagePath = _getUploadedImagePath();
        setPollutionCertificatePhoto(pollCertImagePath);
      } else if (photo == PHOTO.PERMIT_DOC && isPermitPhoto) {
        const permitImagePath = _getUploadedImagePath();
        setPermitPhoto(permitImagePath);
      }
      setIsRCPhoto(false);
      setIsPollCertPhoto(false);
      setIsPermitPhoto(false);
      showToast("Image upload successfull.", ToastType.SUCCESS);
      dispatch(resetImageUploadRequest());
    } else if (!imageUploading && imageUploadFailure) {
      setIsRCPhoto(false);
      setIsPollCertPhoto(false);
      setIsPermitPhoto(false);
      dispatch(resetImageUploadRequest());
      showToast("Image upload failed. Try again!", ToastType.ERROR);
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
