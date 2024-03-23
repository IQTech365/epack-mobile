import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Header from '../../common/Header';

interface IProps {}

const TodayShiftings: FC<IProps> = ({}) => {
  return (
    <View>
      <Header label="Today's Shiftings" canGoBack={true} />
    </View>
  );
};

export default TodayShiftings;

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({});
