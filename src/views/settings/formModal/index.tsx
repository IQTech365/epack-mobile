import React, {ReactElement, useCallback, useMemo, useRef, forwardRef} from 'react';
import {View, Text, Dimensions} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import styles from './style';
const {height} = Dimensions.get('window');

interface IFormModalProps {
  children: ReactElement;
}

const FormModal = forwardRef<BottomSheetModal, IFormModalProps>(({children}, ref) => {
    const snapPoints = useMemo(() => [1000], []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
  
    return (
      <View style={styles.container}>
        <BottomSheetModal
          ref={ref}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={BottomSheetBackdrop}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            {children}
          </View>
        </BottomSheetModal>
      </View>
    );

});

// const FormModal: React.FC<IFormModalProps> = ({children, onClose}) => {
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={1}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}>
//         <View style={styles.contentContainer}>
//           {children}
//         </View>
//       </BottomSheet>
//     </View>
//   );
// };

export default FormModal;
