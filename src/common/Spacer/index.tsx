import React from "react";
import {View} from 'react-native';
import styles from "./styles";

interface SpacerProps {
    width?: number,
    height?: number,
}

const Spacer: React.FC<SpacerProps> = ({width, height}) => {
    let customStyle = null;
    if(width ) {
        customStyle = {width};
    } else if (height) {
        customStyle = {height};
    } else if(width && height) {
        customStyle = {width, height};
    }
    return <View style={[styles.container, customStyle]} />
}

export default Spacer;