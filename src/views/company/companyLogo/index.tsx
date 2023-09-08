import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import LogoPlaceholder from '../../../images/logo_placeholder.png';
import {launchCamera, launchImageLibrary, CameraType, MediaType, PhotoQuality} from 'react-native-image-picker';

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
  }

interface ICompanyLogoPageView {
  //
}

const CompanyLogoPageView: React.FC<ICompanyLogoPageView> = ({}) => {
    const [companyLogo, setCompanyLogo] = useState<string>('');

    const handleLaunchCamera = async () => {
        try {
          const result = await launchCamera(options);
          if(result && result.hasOwnProperty('assets')) {
            const {assets} = result || {};
            if(assets && Array.isArray(assets) && assets.length > 0) {
                const imageObj = assets[0];
                setCompanyLogo(imageObj.fileName as string);
            }
          }
          console.log('Camera-result----', JSON.stringify(result));
          
        } catch (error) {
          console.log('Error in launching camera--', error);
        }
      }
    
      const handleLaunchGallery = async () => {
        try {
            const result = await launchImageLibrary(options);
            console.log('Gallery-result----', JSON.stringify(result));
            
          } catch (error) {
            console.log('Error in opening gallery--', error);
          }
      }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={companyLogo ? companyLogo : LogoPlaceholder} style={styles.logo} />
      </View>
      <View style={styles.galleryContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLaunchGallery}>
          <Text style={styles.text}>Gallery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cameraContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompanyLogoPageView;
