import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './style';
import Lottie from 'lottie-react-native';
const loaderWhiteIcon = require('../../images/loader-white.json');

interface IInputWithButtonProps {
  inProgress: boolean;
  onCheckPress: () => void;
  onChangeText: (text: string) => void;
}

const InputWithButton: React.FC<IInputWithButtonProps> = ({
  inProgress,
  onCheckPress,
  onChangeText,
}) => {
  const buttonContainerStyle = inProgress
    ? styles.buttonDisabledContainer
    : styles.buttonContainer;
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={onChangeText} />
      </View>
      <TouchableOpacity
        style={buttonContainerStyle}
        activeOpacity={0.6}
        disabled={inProgress}
        onPress={onCheckPress}>
        {inProgress ? (
          <Lottie
            source={loaderWhiteIcon}
            autoPlay
            loop
            style={{width: 35, height: 35}}
          />
        ) : (
          <Text style={styles.buttonText}>Check</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputWithButton;
