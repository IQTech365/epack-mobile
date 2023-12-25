import React from 'react';
import {View} from 'react-native';
import styles from '../style';
import Label from '../../../../../../common/Label';
import Spacer from '../../../../../../common/Spacer';
import UploadAadharPhoto, {AADHAR} from './UploadAadharPhoto';

interface Props {
  title: string;
}

const UploadAadharPhotoView: React.FC<Props> = ({title}) => {
  return (
    <>
      <View style={styles.mainPhotoViewContainer}>
        <Label text={title} style={styles.label} />
      </View>
      <Spacer height={4} />
      <View style={styles.photoCaptureContainer2}>
        <UploadAadharPhoto imageSide={AADHAR.FRONT} />
        <UploadAadharPhoto imageSide={AADHAR.BACK} />
      </View>
    </>
  );
};

export default UploadAadharPhotoView;
