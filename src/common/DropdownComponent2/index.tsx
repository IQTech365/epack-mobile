import React, {useEffect, useRef, useState, forwardRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import styles from './style';
import CloseIcon from '../../images/icons/close_icon.svg';
import DownArrowIcon from '../../images/icons/down-arrow.svg';

interface IEpackDropdownProps {
  placeholder: string;
  data: string[];
  hanldeData: (data: string) => void;
  inputDefaultValue?: string;
}

const EpackDropdown: React.FC<IEpackDropdownProps> = forwardRef(
  ({placeholder, data, hanldeData, inputDefaultValue}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState(data && data[0]);
    const [options, setOptions] = useState(data);
    const inputRef = useRef<TextInput | null>(null);
    const {width: windowWidth} = Dimensions.get('window');
    const [modalWidth, setModalWidth] = useState(windowWidth);
    const [modalPosition, setModalPosition] = useState({top: 0, left: 0});

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      if (inputRef.current) {
        inputRef.current.measure((x, y, width, height, pageX, pageY) => {
          setModalWidth(width);
          setModalPosition({top: pageY + height, left: pageX});
        });
      }
    };

    const selectOption = (option: string) => {
      hanldeData(option);
      setSelectedValue(option);
      setInputValue(option);
      setIsOpen(false);
    };

    const addCustomOption = () => {
      if (
        inputValue &&
        inputValue.trim() !== '' &&
        !data.includes(inputValue)
      ) {
        hanldeData(inputValue);
        setSelectedValue(inputValue);
        setIsOpen(false);
      }
    };

    React.useImperativeHandle(ref, () => ({
        setValue
    }));

    const setValue = (value: string) => {
        setInputValue(value);
    }

    useEffect(() => {
      setOptions(data);
    }, [data]);

    useEffect(() => {
      if (inputDefaultValue) {
        setInputValue(inputDefaultValue);
      }
    }, [inputDefaultValue]);

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={inputValue}
          ref={inputRef}
          // onFocus={toggleDropdown}
          onChangeText={text => setInputValue(text)}
          onBlur={addCustomOption}
        />
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownIcon}>
          <Text>
            {isOpen ? null : <DownArrowIcon width={15} height={20} />}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}>
          <View
            style={[
              styles.optionsContainer,
              styles.card,
              {
                width: modalWidth,
                top: modalPosition.top,
                left: modalPosition.left,
              },
            ]}>
            <View style={styles.closeButtonStyle}>
              <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.4}>
                <CloseIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
            <ScrollView  style={{ maxHeight: 200 }}>
            <View>
              {data &&
                data.map(option => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => selectOption(option)}
                    style={styles.optionItem}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  },
);

export default EpackDropdown;
