import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView
} from 'react-native';
import CloseIcon from '../../images/icons/close_icon.svg';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY2,
  COLOR_GRAY4,
  COLOR_GRAY5,
  COLOR_WHITE,
} from '../../utils/colors';
import {IMaterial} from '../../interface/enquiry/IPackingMaterialsResponse';
import Spacer from '../Spacer';
import _ from 'underscore';
import { IPackingItem, getMaterialTypeEnum, materials } from '../../views/enquiry/enquiryDetails/components/PackingMaterialsView/utils';
import ManagePackingMaterialView from '../../views/enquiry/enquiryDetails/components/PackingMaterialsView/ManagePackingMaterialView';

interface IProps {
  visible: boolean;
  onClose: () => void;
  onAdd?: (items:IPackingItem[]) => void;
}

const MaterialListAddModal = ({
  visible,
  onClose,
  onAdd,
}: IProps) => {
  const [materialTypes, setMaterialTypes] = useState<string[]>(materials);
  const [packingItems, setPackingItems] = useState<IPackingItem[]>([]);

  const _handleClose = useCallback(() => {
    setPackingItems([]);
    onClose && onClose();
  }, [])

  const _handleUpdate = () => {
    onAdd && onAdd(packingItems);
  }

  const _handlePackingMaterialChange = (item: IPackingItem, index: number) => {
    const copy = [...packingItems];
    const itemIndex = copy.findIndex(e => e.name === item.name);
    if(itemIndex === -1) {
      copy.push(item);
    } else if(itemIndex > -1) {
      copy.splice(itemIndex, 1, item);
    }
    console.log('packingItems----', JSON.stringify(copy));
    setPackingItems(copy);
  }

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          _handleClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerContainer}>
              <Text style={[styles.modalText]}>ADD</Text>
              <Pressable onPress={_handleClose}>
                <CloseIcon />
              </Pressable>
            </View>
            <FlatList
              style={{height: 400}}
              data={materialTypes}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ManagePackingMaterialView
                  title={item}
                  unitRequired={item !== materialTypes[0]}
                  materialType={getMaterialTypeEnum(item)}
                  index={index}
                  onChange={_handlePackingMaterialChange}
                />
              )}
            />
            <Spacer height={20} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={_handleUpdate}>
              <Text style={styles.textStyle}>ADD</Text>
            </Pressable>
            <Spacer height={20} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MaterialListAddModal;

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
    width: width,
    backgroundColor: 'white',
    borderRadius: 20,
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
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 35,
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
    textAlign: 'center',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: COLOR_WHITE,
  },
  labelText: {
    textAlign: 'center',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 16,
    color: COLOR_GRAY4,
  },
  valueText: {
    textAlign: 'center',
    fontFamily: 'WorkSans-Medium',
    fontSize: 16,
    color: COLOR_GRAY4,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_BLUE,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR_GRAY5,
  },
  labelContainer: {
    width: '30%',
    paddingVertical: 10,
    borderRightWidth: 0.5,
    borderRightColor: COLOR_GRAY5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  valueContainer: {
    width: '70%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 8,
    justifyContent: 'flex-start',
  },
  countActionContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE
  },
  inputContainer: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLOR_GRAY2,
    paddingLeft: 4,
    height: 40,
  },
  input: {
    color: COLOR_BLACK,
    fontSize: 14,
    textAlign: 'center'
  },
});
