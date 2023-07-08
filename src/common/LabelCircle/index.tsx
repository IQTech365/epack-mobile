import React from 'react';
import {View, Text} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './styles';

interface LabelCircleProps {
  text: string;
}

const LabelCircle: React.FC<LabelCircleProps> = ({text}) => {
  return (
    <Shadow>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Shadow>
  );
};

export default LabelCircle;
