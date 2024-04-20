import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TextStyle,
} from 'react-native';
import CloseIcon from '../../images/icons/close_icon.svg';
import {COLOR_GRAY} from '../../utils/colors';
import YoutubePlayer from 'react-native-youtube-iframe';
import Spacer from '../Spacer';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const IntroVideoModal = ({visible, onClose}: IProps) => {
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
            <Spacer height={10} />
            <YoutubePlayer
              height={200}
              width={300}
              play={true}
              videoId={'ojR9lp-7Eqg'}
              onChangeState={() => {}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IntroVideoModal;

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
    // elevation: 2,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: COLOR_GRAY,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
