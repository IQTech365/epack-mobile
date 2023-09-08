import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import TemplatePlaceholder from '../../../../../images/logo_placeholder.png';

export interface ITemplate {
  uri: string;
}

interface ITemplateCard {
  data: ITemplate;
  onPress: () => void;
  index: number;
}

const TemplateCard: React.FC<ITemplateCard> = ({data, onPress, index}) => {
  const imageUrl = data.uri ? {uri: data.uri} : TemplatePlaceholder;
  const containerStyle = (index % 2) === 0 ? styles.container : styles.container2;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      key={`${index}`}>
      <Image source={imageUrl} style={styles.template} />
    </TouchableOpacity>
  );
};

export default TemplateCard;
