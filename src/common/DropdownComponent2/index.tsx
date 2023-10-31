import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Modal,
    Dimensions,
} from 'react-native';
import styles from './style';
import CloseIcon from '../../images/icons/close_icon.svg';
import DownArrowIcon from '../../images/icons/down-arrow.svg';

interface IEpackDropdownProps {
    placeholder: string;
    data: string[];
    hanldeData: (data: string) => void;
}

const EpackDropdown: React.FC<IEpackDropdownProps> = ({
    placeholder,
    data,
    hanldeData,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState(data[0]);
    const [options, setOptions] = useState(data);
    const inputRef = useRef<TextInput | null>(null);
    const { width: windowWidth } = Dimensions.get('window');
    const [modalWidth, setModalWidth] = useState(windowWidth);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (inputRef.current) {
            inputRef.current.measure((x, y, width, height, pageX, pageY) => {
                setModalWidth(width);
                setModalPosition({ top: pageY + height, left: pageX });
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
        if (inputValue.trim() !== '' && !data.includes(inputValue)) {
            hanldeData(inputValue);
            setSelectedValue(inputValue);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setOptions(data);
    }, [data]);

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
                <Text>{isOpen ? null : <DownArrowIcon width={15} height={20} />}</Text>
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
                    <View>
                        {data.map(option => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => selectOption(option)}
                                style={styles.optionItem}>
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EpackDropdown;