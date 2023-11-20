import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent from '../../../../../common/DropdownComponent';
import billingByOptions from '../../../../../data/enterUnitType.json';
import lorryType from '../../../../../data/lorryType.json';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import Label from '../../../../../common/Label';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import { COLOR_BLACK } from '../../../../../utils/colors';

const PackingMaterialsView = () => {
    const [labourCount, setLabourount] = useState<number>(0);
    const [packingTape, setPackingTape] = useState<number>(0);
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    /** Effects */
    useEffect(() => { }, []);

    const handleLorryType = (item: TDropdownItem) => { };

    const handleDecrementCount = (event:string) => {
        switch (event) {
            case 'Labour':
                labourCount > 0 ? setLabourount(labourCount - 1) : null;
                break;
            case 'Packing Tapes':
                packingTape > 0 ? setPackingTape(packingTape - 1) : null;
                break;
            default:
        }
    };

    const handleIncrementCount = (event:string) => {
        switch (event) {
            case 'Labour':
                setLabourount(labourCount + 1);
                break;
            case 'Packing Tapes':
                setPackingTape(packingTape + 1);
            default:
        }
    };

    const incrementCount = (index:number) => {
        const updatedItems = [...items];
        updatedItems[index].count += 1;
        setItems(updatedItems);
    };

    const decrementCount = (index:number) => {
        const updatedItems = [...items];
        if (updatedItems[index].count > 0) {
            updatedItems[index].count -= 1;
            setItems(updatedItems);
        }
    };

    const handleAddInput = (text: string) => {
        setInputText(text);
    };

    const addItem = () => {
        if (inputText) {
            setItems([...items, { name: inputText, count: 0 }]);
            setInputText('');
        }
    };

    return (
        <AvoidSoftInputViewHOC>
            <>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>Material List Form</Text>
            </View>
            <View style={styles.textContainer2}>
                <Label text="Lorry Type" style={styles.label} />
                <DropdownComponent data={lorryType} onSelect={handleLorryType} />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Labour" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('Labour')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>{labourCount}</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('Labour')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Packing Tapes" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('Packing Tapes')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>{packingTape}</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('Packing Tapes')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Bubble Wrapes" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('BubbleWrapes')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('BubbleWrapes')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Corrugate Sheet" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('CorrugateSheet')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('CorrugateSheet')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Waterproof Lamination" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('WaterproofLamination')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('WaterproofLamination')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Thermocol" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('Thermocol')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('Thermocol')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Carton Boxes" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('CartonBoxes')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('CartonBoxes')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Air Bubble" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('AirBubble')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('AirBubble')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="New Paper" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('NewPaper')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('NewPaper')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Foam sheet" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('Foamsheet')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('Foamsheet')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Plastic Carate" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('PlasticCarate')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('PlasticCarate')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Wooden Frame" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleDecrementCount('WoodenFrame')}>
                                <Text style={styles.opratorTextStyle}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.labelText}>0</Text>
                            <TouchableOpacity
                                style={styles.touchableContainer}
                                onPress={() => handleIncrementCount('WoodenFrame')}>
                                <Text style={styles.opratorTextStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropDownStyle}>
                            <DropdownComponent
                                data={billingByOptions}
                                onSelect={handleLorryType}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                    <Label text="Others" style={styles.label} />
                    <View style={styles.wrapConatiner}>
                        <Input
                            onChangeText={handleAddInput}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />

                        <View style={styles.dropDownStyle}>
                            <Button
                                text="ADD"
                                onPress={addItem}
                                disabled={false}
                                style={styles.previewAddButtonStyle}
                                textStyle={styles.textStyle}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Spacer height={12} />
            {items.map((item, index) => (
                <View>
                    <Spacer height={4} />
                    <View style={styles.mainWrapper}>
                        <View style={styles.textContainer}>
                            <Label text={item.name} style={styles.label} />
                            <View style={styles.wrapConatiner}>
                                <View style={styles.counterContainer}>
                                    <TouchableOpacity
                                        style={styles.touchableContainer}
                                        onPress={() => decrementCount(index)}>
                                        <Text style={styles.opratorTextStyle}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.labelText}>{item.count}</Text>
                                    <TouchableOpacity
                                        style={styles.touchableContainer}
                                        onPress={() => incrementCount(index)}>
                                        <Text style={styles.opratorTextStyle}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.dropDownStyle}>
                                    <DropdownComponent
                                        data={billingByOptions}
                                        onSelect={handleLorryType}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Spacer height={4} />
                </View>
            ))}
            <Spacer height={8} />
            <Button
                text="SUBMIT"
                onPress={() => { }}
                disabled={true}
                style={styles.previewButtonStyle}
                textStyle={styles.textStyle}
            />
            <Spacer height={12} />
            </>
        </AvoidSoftInputViewHOC>
    );
};

export default PackingMaterialsView;
