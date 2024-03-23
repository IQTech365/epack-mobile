import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Header from '../../common/Header';

interface IProps {}

const TodaySurvey: FC<IProps> = ({}) => {
  return (
    <View>
      <Header label="Today's Survey" canGoBack={true} />
    </View>
  );
};

export default TodaySurvey;

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({});
