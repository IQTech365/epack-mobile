import React, {ReactElement, useCallback, useMemo, forwardRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import styles from './style';
import CloseIcon from '../../../images/icons/close_icon.svg';

interface IFormModalProps {
  children: ReactElement;
  onClose: () => void;
}

const FormModal = forwardRef<BottomSheet, IFormModalProps>(
  ({children, onClose}, ref) => {
    const snapPoints = useMemo(() => ['50%', '100%'], []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={0}
          appearsOnIndex={1}
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
        containerStyle={{flex: 1}}
        onChange={handleSheetChanges}>
        <View style={{flex: 1}}>
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
