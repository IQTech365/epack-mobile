import React, { useReducer, useState } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import LogoPlaceholder from '../../../images/logo_placeholder.png';
import {launchCamera, launchImageLibrary, CameraType, MediaType, PhotoQuality} from 'react-native-image-picker';
import CameraIcon from '../../../images/icons/camera.svg';
import GalleryIcon from '../../../images/icons/gallery.svg';
import { COMPANY_REGISTRATION_ACTION, companyRegistrationReducer, initialState } from '../registrationReducer';
import Spacer from '../../../common/Spacer';
import { useCompanyRegistrationContextHook } from '../../../provider/CompanyRegistrationContextProvider';

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
    const {state, setCompanyLogo: setCompanyLogo2} = useCompanyRegistrationContextHook();
    const [companyLogo, setCompanyLogo] = useState<string>(state.companyLogo);
    // const [state, dispatch] = useReducer(
    //   companyRegistrationReducer,
    //   initialState,
    // );
    // console.log('CompanyLogoPageView-state--', JSON.stringify(state, null, ' '));
    const handleLaunchCamera = async () => {
        try {
          const result = await launchCamera(options);
          if(result && result.hasOwnProperty('assets')) {
            const {assets} = result || {};
            if(assets && Array.isArray(assets) && assets.length > 0) {
                const imageObj = assets[0];
                setCompanyLogo(imageObj.uri as string);
                setCompanyLogo2(imageObj.uri as string);
                // dispatch({
                //   type: COMPANY_REGISTRATION_ACTION.COMPANY_LOGO,
                //   payload: imageObj.uri as string,
                // });
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
      <Spacer />
      <View><Text style={styles.titleText}>Select Company Logo</Text></View>
      <Spacer />
      <View style={styles.logoContainer}>
        {companyLogo ? <Image source={companyLogo ? {uri: companyLogo} : LogoPlaceholder} style={styles.logo} /> : <Text>Company Logo Preview</Text>}
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
  );
};

export default CompanyLogoPageView;
