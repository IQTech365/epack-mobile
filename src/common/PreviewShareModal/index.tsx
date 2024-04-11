import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import CloseIcon from '../../images/icons/close_icon.svg';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY5,
  COLOR_WHITE,
} from '../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {downloadOptions} from '../../views/order/orderDetails/components/BiltyView/downloadOptions';

interface IProps {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  biltyCopyType: string;
  onBiltyCopyTypeChange: (copyType: string) => void;
  isShare: boolean;
}

const PreviewShareModal = ({
  visible,
  onClose,
  onOk,
  biltyCopyType,
  onBiltyCopyTypeChange,
  isShare,
}: IProps) => {
  const downloadButtonStyle =
    biltyCopyType == '' ? styles.downloadDisabledButton : styles.downloadButton;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Pressable onPress={onClose}>
                <CloseIcon />
              </Pressable>
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.modalText}>Select Bilty Copy Type</Text>
            </View>
            <View style={styles.checkboxContainer}>
              {downloadOptions.map((option, index) => {
                return (
                  <BouncyCheckbox
                    key={`${index}`}
                    size={20}
                    fillColor={COLOR_BLUE}
                    unfillColor="#FFFFFF"
                    text={option}
                    iconStyle={{borderColor: 'red', borderRadius: 0}}
                    innerIconStyle={{borderWidth: 1, borderRadius: 0}}
                    onPress={(isChecked: boolean) => {
                      onBiltyCopyTypeChange(option);
                    }}
                    textStyle={{
                      fontFamily: 'WorkSans-Regular',
                      textDecorationLine: 'none',
                      fontSize: 14,
                      color: COLOR_BLACK,
                    }}
                    style={{paddingRight: 8, marginBottom: 20}}
                    textContainerStyle={{marginLeft: 10, marginRight: 4}}
                    isChecked={option == biltyCopyType}
                    disableBuiltInState={true}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              onPress={onOk}
              style={downloadButtonStyle}
              activeOpacity={0.6}
              disabled={biltyCopyType == ''}>
              <Text style={styles.downloadText}>
                {isShare ? 'SHARE' : 'PREVIEW'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PreviewShareModal;

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  modalView: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: COLOR_BLACK,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkboxContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  downloadDisabledButton: {
    alignSelf: 'center',
    paddingHorizontal: 45,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLOR_GRAY5,
  },
  downloadText: {
    color: COLOR_WHITE,
    fontSize: 14,
    fontFamily: 'WorkSans-Regular',
  },
  downloadButton: {
    alignSelf: 'center',
    paddingHorizontal: 45,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLOR_BLUE,
  },
});
