import React from 'react';
import {View} from 'react-native';
import styles from './style';
import Lottie from 'lottie-react-native';
const spinner = require('../../images/loader.json');
const loaderWhiteIcon = require('../../images/loader-white.json');
const loaderBlueIcon = require('../../images/loader-white.json');
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

  if(!show) return null;
  return (
    <View style={[styles.container, backdropStyle]}>
      <Lottie source={getLoaderIcon()} autoPlay loop style={{width: 50, height: 50}} />
    </View>
  );
};

export default Spinner;