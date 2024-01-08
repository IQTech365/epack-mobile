import React, { FC, useState } from "react";
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';
import { ITemplate } from "../../../../../interface/setting/template/template";

interface IProps {
    item:ITemplate;
    index: number;
}

const TemplateCard:FC<IProps> = ({item, index}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const container = index == activeIndex ? styles.activeContainer : styles.container;

    return <TouchableOpacity style={container} key={`${index}`}>
        <Text style={styles.text}>{item.templateName}</Text>
    </TouchableOpacity>
}

export default TemplateCard;