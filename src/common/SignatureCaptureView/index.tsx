import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './style';
import SignatureCapture from 'react-native-signature-capture';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {COLOR_BLACK, COLOR_GREEN} from '../../utils/colors';
import {
  imageUploadRequest,
  resetImageUploadRequest,
} from '../../redux/slices/CommonSlice';
import {ToastType, showToast} from '../../utils/utility';
import Spinner from '../Spinner';
import CloseIcon from '../../images/icons/x-circle.svg';

interface IProps {
  onSave: (signature: string) => void;
  onChangeSignature: () => void;
  previousSignatureUri: string;
  updateSignature: boolean;
}

const SignatureCaptureView: React.FC<IProps> = ({
  onSave,
  onChangeSignature,
  previousSignatureUri,
  updateSignature,
}) => {
  const signatureRef = useRef(null);
  const {
    imageUploading,
    imageUploadSuccess,
    imageUploadFailure,
    uploadedImage,
  } = useAppSelector(state => state.Common);
  const dispatch = useAppDispatch();

  const _getUploadedImagePath = () => {
    let path: string = '';
    const {data} = uploadedImage || {};
    if (data && data.hasOwnProperty('Location')) {
      path = data?.Location;
    }
    return path;
  };

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

  useEffect(() => {
    if (!imageUploading && imageUploadSuccess) {
      const imagePath = _getUploadedImagePath();
      onSave && onSave(imagePath);
      dispatch(resetImageUploadRequest());
      showToast('Image Upload successful.', ToastType.SUCCESS);
    } else if (!imageUploading && imageUploadFailure) {
      dispatch(resetImageUploadRequest());
      showToast('Image Upload failed. Try again!', ToastType.ERROR);
    }
  }, [imageUploading, imageUploadSuccess, imageUploadFailure]);

  const _showPreviousSignatureView = () => {
    return (
      <View style={styles.signatureWrapper}>
        <View style={styles.changeImageIconContainer}>
          <TouchableOpacity onPress={onChangeSignature} activeOpacity={0.4}>
            <CloseIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        {previousSignatureUri ? (
          <Image
            source={{uri: previousSignatureUri}}
            style={styles.prevSignature}
          />
        ) : (
          <View style={styles.signatureWrapper}>
            <Text>No Signature available</Text>
          </View>
        )}
      </View>
    );
  };

  const _showSignatureCaptureView = () => {
    return (
      <>
        <View style={styles.signatureWrapper}>
          <SignatureCapture
            style={styles.signature}
            ref={signatureRef}
            onSaveEvent={(result: any) => {
              //   console.log('onSaveEvent--', result);
              onSave(result?.pathName as string);
              const formData = new FormData();
              formData.append('image', {
                uri: `file://${result?.pathName}`,
                type: 'image/png',
                name: 'signature.png',
              });
              dispatch(imageUploadRequest(formData));
            }}
            onDragEvent={() => {
              console.log('dragged');
            }}
            saveImageFileInExtStorage={true}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor="#ffffff"
            strokeColor="#000000"
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={'portrait'}
          />
        </View>
        <View style={styles.rowContainer2}>
          <TouchableOpacity
            style={styles.buttonStyle2}
            activeOpacity={0.4}
            onPress={() => {
              //@ts-ignore
              signatureRef && signatureRef.current?.saveImage();
            }}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle2}
            activeOpacity={0.4}
            onPress={() => {
              //@ts-ignore
              signatureRef && signatureRef.current?.resetImage();
            }}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <Toast config={toastConfig} />
        <Spinner show={imageUploading} />
      </>
    );
  };

  return (
    <>
      {updateSignature
        ? _showSignatureCaptureView()
        : _showPreviousSignatureView()}
    </>
  );
};

export default SignatureCaptureView;
