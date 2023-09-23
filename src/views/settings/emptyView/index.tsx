import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import RectangleIcon from '../../../images/icons/rectangle.svg';
import PluseIcon from '../../../images/icons/plus.svg';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';

interface IEmptyViewProps {
  message: string;
  onPress: () => void;
  children: ReactNode;
}

const EmptyView: React.FC<IEmptyViewProps> = ({ message, onPress, children }) => {
  return (

    <View style={styles.wrapper}>
      <View
        style={styles.headerContainerStyle}>
        <Text style={{ fontSize: 15, fontWeight: 500 }}>{message}</Text>
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <RectangleIcon width={25} height={25} />
          <View style={{ zIndex: 2, position: 'absolute' }}>
            <PluseIcon width={10} height={10} />
          </View>

        </TouchableOpacity>
      </View>
      <View style={styles.borderLine} />
      <AvoidSoftInputViewHOC>{children}</AvoidSoftInputViewHOC>
    </View>
  );
};

export default EmptyView;
