import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
}

const UploadAadharPhotoView: React.FC<Props> = ({title}) => {
  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          //   setImageFile(imageObj);
          //   setCompanyLogo(imageObj.uri as string);
          //   setCompanyLogo2(imageObj.uri as string);
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
          //   setImageFile(imageObj);
          //   setCompanyLogo(imageObj.uri as string);
          //   setCompanyLogo2(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  return (
    <>
      <View style={styles.mainPhotoViewContainer}>
        <Label text={title} style={styles.label} />
      </View>
      <Spacer height={4} />
      <View style={styles.photoCaptureContainer2}>
        <View style={styles.photoItemWrapper}>
        <Label text="Front Side" style={styles.labelText} />
          <View style={styles.photoItemContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLaunchGallery}>
              <>
                <Text>Gallery</Text>
                <GalleryIcon width={35} height={35} />
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLaunchCamera}>
              <>
                <Text>Camera</Text>
                <CameraIcon width={35} height={35} />
              </>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.photoItemWrapper}>
        <Label text="Back Side" style={styles.labelText} />
          <View style={styles.photoItemContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLaunchGallery}>
              <>
                <Text>Gallery</Text>
                <GalleryIcon width={35} height={35} />
              </>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLaunchCamera}>
              <>
                <Text>Camera</Text>
                <CameraIcon width={35} height={35} />
              </>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default UploadAadharPhotoView;
