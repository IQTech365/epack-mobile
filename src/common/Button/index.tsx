import React from "react";
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
import styles from "./styles";

interface ButtonProps {
    text: string;
    onPress: () => void,
    variant?: 'fill' | 'contain',
    disabled?: boolean,
    style?: ViewStyle,
    textStyle?: TextStyle,
}

const Button: React.FC<ButtonProps> = ({text, onPress, variant = 'fill', disabled, style, textStyle}) => {
    const buttonStyle = variant === 'contain' ? styles.borderContainer : styles.fillContainer;
    const disableStyle = disabled ? styles.disabled : null;
    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, style, disableStyle]} disabled={disabled}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;