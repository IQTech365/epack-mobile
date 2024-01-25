import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';

export type ITermsConditions = {
  title: string;
  uri: string;
};

interface IProps {
  item: ITermsConditions;
  index: number;
  onPress: (item:ITermsConditions) => void;
}

const TermsAndConditionListItem: FC<IProps> = ({item, index, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      key={`${index}`}
      activeOpacity={0.4}
      onPress={() => {
        onPress(item);
      }}
    >
      <Text style={styles.titleText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default TermsAndConditionListItem;
