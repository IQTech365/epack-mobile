import React, {ReactElement, ReactNode, useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {AvoidSoftInput, AvoidSoftInputView} from 'react-native-avoid-softinput';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { commonStyles } from './style';

const AvoidSoftInputViewHOC: React.FC<{children: ReactElement}> = ({children}) => {
  const onFocusEffect = useCallback(() => {
    // AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={commonStyles.screenContainer}>
      <AvoidSoftInputView style={styles.avoidSoftInputView}>
        <ScrollView
          bounces={false}
          contentContainerStyle={commonStyles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={true}
          style={commonStyles.scroll}>
          {children}
        </ScrollView>
      </AvoidSoftInputView>
    </SafeAreaView>
  );
};

export default AvoidSoftInputViewHOC;

const styles = StyleSheet.create({
    avoidSoftInputView: {
      alignSelf: 'stretch',
      flex: 1,
    },
  });
