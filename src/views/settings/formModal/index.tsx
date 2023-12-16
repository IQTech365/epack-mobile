import React, {ReactElement, useCallback, useMemo, forwardRef} from 'react';
import {View} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import styles from './style';
import CloseIcon from '../../../images/icons/close_icon.svg';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Shadow} from 'react-native-shadow-2';
interface IFormModalProps {
  children: ReactElement;
  onClose: () => void;
}

const FormModal = forwardRef<BottomSheet, IFormModalProps>(
  ({children, onClose}, ref) => {
    const snapPoints = useMemo(() => ['65%'], []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={1}
          appearsOnIndex={0}
          style={{backgroundColor: 'red'}}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        containerStyle={styles.contentContainer}
        onChange={handleSheetChanges}>
        <View style={styles.container}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={onClose} activeOpacity={0.4}>
              <CloseIcon width={32} height={32} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </BottomSheet>
    );
  },
);

export default FormModal;
