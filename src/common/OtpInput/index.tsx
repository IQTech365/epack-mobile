import React, { forwardRef } from "react";
import {View, TextInput} from 'react-native';
import { COLOR_WHITE } from "../../utils/colors";
import styles from './styles';

interface IOtpProps {
    value: string;
    onChangeText: (text: string) => void;
    autoFocus?: boolean;
}

const OTPInput:React.FC<IOtpProps> = forwardRef(({value, onChangeText, autoFocus = false}, ref) => {
    return (
        <View style={styles.container}>
            <TextInput 
                //@ts-ignore
                ref={ref} 
                value={value} 
                onChangeText={onChangeText}
                style={styles.input}
                cursorColor={COLOR_WHITE}
                maxLength={1}
                autoFocus={autoFocus}
            />
        </View>
       )
});

export default OTPInput;
