import React from 'react';
import {Text, TextStyle, View} from 'react-native';
import styles from './style';

interface ILabelProps {
  text: string;
  style?: TextStyle;
  required?: boolean;
}

const Label: React.FC<ILabelProps> = ({text, style, required}) => {
  const showRequiredSymbol = required ? <Text style={styles.required}>{` *`}</Text> : null;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{text}{showRequiredSymbol}</Text>
    </View>
  );
};

export default Label;
