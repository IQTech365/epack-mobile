import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from './style';
import TemplatePlaceholder from '../../../../../images/logo_placeholder.png';

export interface ITemplate {
  uri: string;
  plan_name: string;
}

interface ITemplateCard {
  data: ITemplate;
  onPress: (index: number, parentIndex: number, planName: string) => void;
  parentIndex: number;
  currentParentIndex: number;
  index: number;
  selectedTemplateIndex: number;
}

const TemplateCard: React.FC<ITemplateCard> = ({data, onPress, index, parentIndex, currentParentIndex, selectedTemplateIndex}) => {

  const imageUrl = data.uri ? {uri: data.uri} : TemplatePlaceholder;
  const imageContainer = (selectedTemplateIndex === index && currentParentIndex === parentIndex) ? styles.activeContainer : styles.container;

  return (
    <TouchableOpacity
      style={imageContainer}
      onPress={() => onPress(index, parentIndex, data.plan_name)}
      key={`${index}`}>
      <Image source={imageUrl} style={styles.template} />
    </TouchableOpacity>
  );
};

export default TemplateCard;
