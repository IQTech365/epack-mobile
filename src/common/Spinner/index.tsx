import React from 'react';
import {View, Modal} from 'react-native';
import styles from './style';
import Lottie from 'lottie-react-native';
const loaderWhiteIcon = require('../../images/loader-white.json');
const loaderBlueIcon = require('../../images/loader-blue.json');
interface ISpinnerProps {
    show: boolean;
    backdrop?: 'transparent' | 'opaque';
    variant?: 'blue' | 'white';
}

const Spinner: React.FC<ISpinnerProps> = ({backdrop = 'transparent', show = false, variant= 'blue'}) => {
  const backdropStyle = backdrop === 'transparent' ? styles.transparent : styles.opaque;

  const getLoaderIcon = () => {
    let loader = loaderBlueIcon;
    if(variant === 'white'){
      loader = loaderWhiteIcon;
    }
    return loader;
  }

  // if(!show) return null;
  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={[styles.container, backdropStyle]}>
        <Lottie source={getLoaderIcon()} autoPlay loop style={{width: 50, height: 50}} />
      </View>
    </Modal>
    
  );
};

export default Spinner;